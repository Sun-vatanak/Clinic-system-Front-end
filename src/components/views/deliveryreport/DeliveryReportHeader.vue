<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-3 d-none d-md-block">
            <div class="fs-5 p-0 fw-semibold">របាយការណ៍អ្នកដឹកជញ្ចូន</div>
        </div>
        <div class="col-12 col-md-9 p-0">
            <div class="d-flex align-items-center flex-wrap flex-sm-nowrap gap-2 gap-xl-3">
                <div
                    class="order-1 order-sm-1 mb-2 w-sm-100 mb-sm-0 d-flex align-items-center justify-content-between gap-2 gap-xl-4 ms-auto">
                    <select class="form-select sort-user fs-16 text-dark-emphasis search-bar border-0 rounded-5"
                        v-model="deliveryreport.type" @change="deliveryreport.onLoadDeliveryReport()">
                        <option value="" disabled selected>ជ្រើសរើសអ្នកដឹកជញ្ចូន</option>
                        <option value="1">ទាំងអស់</option>
                        <option value="1">ដឹកបានច្រើន</option>
                        <option value="2">ដឹកតិច</option>
                        <option value="3">មានវាយតម្លៃខ្ពស់</option>
                    </select>

                    <div class="order-0 order-sm-2 mb-2 mb-sm-0 ms-auto">
                        <button type="button" class="btn btn-primary d-flex gap-2 align-items-center rounded-5"
                            :class="{ 'disabled': !deliveryreport.delivery || deliveryreport.delivery.length === 0 }"
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
import {useDeliveryReportStore} from "@/stores/views/deliveryReport_store";
import axios from "axios";
const deliveryreport = useDeliveryReportStore();
onMounted(() => {
    deliveryreport.onLoadDeliveryReport();
})
const exportToCSV = async () => {
    try {
        const params = new URLSearchParams();
        if (deliveryreport.market_id) params.append("market_id", deliveryreport.market_id);
        if (deliveryreport.type) params.append("type", deliveryreport.type);

        const response = await axios.get(`/api/delivery-reports?${params.toString()}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            }
        });

        if (response.data.result) {
            const allData = response.data.data;
            const headers = [
                'អត្តលេខ',
                'ឈ្មោះអ្នកដឹកជញ្ចូន',
                'លេខសម្គាល់យានជំនិះ',
                'ចំនួនសរុបដឹកជញ្ចូន',
                'ចំនួនសរុបវាយតម្លៃ',
                'ចំនួនវាយតម្លៃជាមធ្យម'
            ];

            const data = allData.map(item => [
            `"#${item.user_id || 'N/A'}"`,
            `"${(item.first_name || '') + ' ' + (item.last_name || '')}"`,
            `"${item.vin || 'N/A'}"`,
            `"${item.delivered_count || 'N/A'}"`,
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
            link.setAttribute('download', 'delivery-report.csv');
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
