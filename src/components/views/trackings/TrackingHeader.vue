<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-3 d-none d-sm-block">
            <div class="fs-5 p-0 fw-semibold">ការដឹកជញ្ជូន</div>
        </div>
        <div class="col-12 col-sm-8 p-0 col-md-7">
            <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 gap-md-3">
                <div>
                    <select class="form-select sort-user px-3 fs-16 text-dark-emphasis search-bar border-0 rounded-5"
                        v-model="trackingStore.selectedStatusID" @change="trackingStore.onloadTracking()">
                        <option value="" disabled selected>ជ្រើសរើស</option>
                        <option value="">ទាំងអស់</option>
                        <option value="1">រង់ចាំការទៅយក</option>
                        <option value="2">អ្នកដឹកជញ្ជូនបានកំណត់</option>
                        <option value="3">រួចរាល់សំរាប់ដឹកជញ្ជូន</option>
                        <option value="4">កំពុងដឹកជញ្ជូន</option>
                        <option value="5">បានមកដល់</option>
                        <option value="6">បានប្រគល់</option>
                        <option value="7">បរាជ័យក្នុងការដឹកជញ្ជូន</option>
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
import { useTrackingStore } from "@/stores/views/Tracking_store";

const trackingStore = useTrackingStore();

import axios from 'axios';
const exportToCSV = async () => {
    try {
        const response = await axios.get(`/api/delivery-trackings?all=true&status_id=${trackingStore.selectedStatusID}`);
        if (response.data.result) {
            const allData = response.data.data;
            const headers = ['លេខកម្មង់', 'អតិថិជន', 'លេខទូរស័ព្ទ', 'ទីតាំង', 'ថ្លៃដឹកជញ្ជូន', 'ចំនួនសរុប', 'ស្ថានភាព', 'កាបរិច្ឆេទ'];
            const data = allData.map(item => [
                `"${item.tracking_id || 'N/A'}"`,
                `"${item.order?.customer?.first_name || 'N/A'}  ${item.order?.customer?.last_name || 'N/A'}"`,
                `"${item.order?.customer?.phone || 'N/A'}"`,
                `"${item.order?.customer?.address || 'N/A'}"`,
                `"${item.order?.delivery_fee || 'N/A'}"`,
                `"${item.order?.total_amount || 'N/A'}"`,
                `"${item.delivery_status_name || 'N/A'}"`,
                `"${item.order?.created_date || 'N/A'}"`,
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
            link.setAttribute('download', 'deliveryTracking.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Failed to fetch delivery tracking.");
        }
    } catch (error) {
        console.error("Error exporting delivery tracking:", error);
    }
};
</script>
