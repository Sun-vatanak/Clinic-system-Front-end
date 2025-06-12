<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-3 d-none d-sm-block">
            <div class="fs-5 p-0 fw-semibold">ការលក់</div>
        </div>
        <div class="col-12 col-sm-8 p-0 col-md-7">
            <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 gap-md-3">
                <div>
                    <select class="form-select sort-user px-3 fs-16 text-dark-emphasis search-bar border-0 rounded-5"
                        v-model="useOrderAdmin.selectedStatusID" @change="useOrderAdmin.onloadOrderAdmin()">
                        <option value="" disabled selected>ជ្រើសរើស</option>
                        <option value="">ទាំងអស់</option>
                        <option value="1">កំពុងរង់ចាំ</option>
                        <option value="2">បាទទទួល</option>
                        <option value="3">កំពុងរៀបចំ</option>
                        <option value="4">ត្រៀមរួច</option>
                        <option value="5">បានលុបចោល</option>
                        <option value="6">បានបង្វិលវិញ</option>
                        <option value="7">បានបញ្ចប់</option>
                        <option value="8">បានបដិសេធ</option>
                        <option value="9">បរាជ័យក្នុងការដឹកជញ្ជូន</option>
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
import { useOrderAdminStore } from "@/stores/views/orderadmin_store";
const useOrderAdmin = useOrderAdminStore();

const exportToCSV = async () => {
    try {
        const response = await axios.get(`/api/orders?all=true&status_id=${useOrderAdmin.selectedStatusID}`);
        if (response.data.result) {
            const allData = response.data.data;
            const headers = ['លេខកម្មង់', 'អតិថិជន', 'អ៊ីម៉ែល', 'ចំនួនសរុប', 'ស្ថានភាព', 'កាលបរិច្ឆេទ'];
            const data = allData.map(item => [
                `"#${item.order_number || 'N/A'}"`,
                `"${item.customer?.first_name || 'N/A'}  ${item.customer?.last_name || 'N/A'}"`,
                `"${item.customer?.email || 'N/A'}"`,
                `"${item.total_amount || 'N/A'}"`,
                `"${item.status || 'N/A'}"`,
                `"${item.created_at || 'N/A'}"`,
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