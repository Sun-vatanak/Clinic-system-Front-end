<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-3 d-none d-md-block">
            <div class="fs-5 p-0 fw-semibold">របាយការណ៌ផ្សារ</div>
        </div>
        <div class="col-12 p-0 col-md-8">
            <div class="d-flex align-items-center w-100 justify-content-between justify-content-sm-end gap-2 gap-md-3">
                <div>
                    <select class="form-select width-180 px-3 fs-16 text-dark-emphasis search-bar border-0 rounded-5"
                    v-model="marketReport.selectType" @change="marketReport.onloadMarketReport()">
                        <option value="" disabled selected>ជ្រើសរើស</option>
                        <option value="">ទាំងអស់</option>
                        <option value="1">ផ្សារលក់ដាច់បំផុត</option>
                        <option value="2">ផ្សារលក់ដាច់តិចបំផុត</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-primary rounded-5 px-3 d-flex align-items-center" @click="exportToCSV">
                        <i class="bi bi-download me-2"></i>CVS
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
import axios from 'axios';
import { useMarketReportStore } from '@/stores/views/market_report_store';
import { onMounted } from 'vue';

const marketReport = useMarketReportStore();
onMounted(() =>{
    marketReport.onloadMarketReport();
})

const exportToCSV = async () => {
    try {
        const response = await axios.get(`/api/market-reports?type=${marketReport.selectType}`);
        if (response.data.result) {
            const allData = response.data.data;
            const headers = ['ឈ្មោះផ្សារ', 'ទីតាំង', 'ការពិពណ៌នា', 'ចំនួនម្ចាស់ហាងសរុប', 'ចំនួការកម្មង់សរុប'];
            const data = allData.map(item => [
                `"${item.name || 'N/A'}"`,
                `"${item.location || 'N/A'}"`,
                `"${item.description || 'N/A'}"`,
                `"${item.orders_count || 'N/A'}"`,
                `"${item.vendors_count || 'N/A'}"`,
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
            link.setAttribute('download', 'orderadmins.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Failed to fetch orders.");
        }
    } catch (error) {
        console.error("Error exporting orders:", error);
    }
};
</script>