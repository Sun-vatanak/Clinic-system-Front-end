<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-3 d-none d-md-block">
            <div class="fs-5 p-0 fw-semibold">របាយការណ៍អ្នកលក់</div>
        </div>
        <div class="col-12 col-md-9 p-0">
            <div class="d-flex align-items-center flex-wrap flex-sm-nowrap gap-2 gap-xl-3">
                <div
                    class="order-1 order-sm-1 mb-2 w-sm-100 mb-sm-0 d-flex align-items-center justify-content-between gap-2 gap-xl-4 ms-auto">

                    <select class="form-select sort-user fs-16 text-dark-emphasis search-bar border-0 rounded-5"
                        v-model="vendorreport.market_id" @change="vendorreport.onLoadVendoerReport()">
                        <option value="" disabled selected>ជ្រើសរើសផ្សារ</option>
                        <option value="">ទាំងអស់</option>
                        <option v-for="m in vendorreport.market" :key="m.id" :value="m.id">
                            {{ m.name }}
                        </option>
                    </select>

                    <select class="form-select sort-user fs-16 text-dark-emphasis search-bar border-0 rounded-5"
                        v-model="vendorreport.type" @change="vendorreport.onLoadVendoerReport()">
                        <option value="" disabled selected>ជ្រើសរើសអ្នកលក់</option>
                        <option value="">ទាំងអស់</option>
                        <option value="1">លក់បានច្រើនទាំង១០នាក់</option>
                        <option value="2">លក់តិចទាំង១០នាក់</option>
                        <option value="3">មានវាយតម្លៃខ្ពស់</option>
                    </select>

                    <div class="order-0 order-sm-2 mb-2 mb-sm-0 ms-auto">
                        <button type="button" class="btn btn-primary d-flex gap-2 align-items-center rounded-5"
                            :class="{ 'disabled': !vendorreport.vendor || vendorreport.vendor.length === 0 }"
                            @click="exportToCSV">
                            <i class="bi bi-download"></i>
                            ទាញយក
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useVendorReportStore } from "@/stores/views/vendorReport_store";
import axios from "axios";
const vendorreport = useVendorReportStore();
onMounted(() => {
    vendorreport.onLoadMarket();
    vendorreport.onLoadVendoerReport();
})
const exportToCSV = async () => {
    try {
        const params = new URLSearchParams();
        if (vendorreport.market_id) params.append("market_id", vendorreport.market_id);
        if (vendorreport.type) params.append("type", vendorreport.type);

        const response = await axios.get(`/api/vendor-reports?${params.toString()}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            }
        });

        if (response.data.result) {
            const allData = response.data.data;

            const headers = [
                'អត្តលេខ',
                'ឈ្មោះម្ចាស់តូប',
                'ឈ្មោះតូប',
                'ផ្សារ',
                'ចំនួនសរុបការលក់',
                'ចំនួនសរុបវាយតម្លៃ',
                'ចំនួនវាយតម្លៃជាមធ្យម'
            ];

            const data = allData.map(item => [
                `"#${item.user_id || 'N/A'}"`,
                `"${(item.first_name || '') + ' ' + (item.last_name || '')}"`,
                `"${item.business_name || 'N/A'}"`,
                `"${item.market_name || 'N/A'}"`,
                `"${item.rating_count != null ? item.rating_count : "0"}"`,
                `"${item.rating_count ?? '0'}"`,
                `"${item.average_rating ?? '0'}"`
            ]);
            const BOM = "\uFEFF";
            const csvContent = BOM + [
                headers.join(','),
                ...data.map(row => row.join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'vendor-report.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Failed to fetch vendor report.");
        }
    } catch (error) {
        console.error("Error exporting vendor report:", error);
    }
};




</script>
