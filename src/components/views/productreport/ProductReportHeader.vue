<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-12 col-sm-3 d-flex align-items-center ">
            <div class="fs-5 p-0 fw-semibold">ផលិតផល</div>
        </div>
        <di class="col-12 col-sm-3 d-flex align-items-center gap-2 gap-sm-3 justify-content-end p-0">
            <button class="btn btn-primary rounded-5 px-4 d-flex align-items-center" @click="cleanFilter()">
                <span>សម្អាតតម្រង</span>
            </button>
            <button class="btn btn-primary rounded-5 px-3 d-flex align-items-center" @click="exportToCSV">
                <i class="bi bi-download me-2"></i>CVS
            </button>
        </di>

        <div class="col-12 p-0 section-spacing">
            <div class="row gy-4">
                <div class="col-12 col-md-6 col-xl-3">
                    <select class="form-select bg-white fs-16 px-3 text-dark-emphasis search-bar border-0 rounded-5"
                        v-model="productReport.selectedVendor" @change="productReport.getProductReport()">
                        <option value="" disabled selected>ជ្រើសរើសម្ចាស់តូប</option>
                        <option value="">ទាំងអស់</option>
                        <option v-for="vendor in productReport.vendors" :key="vendor.user_id" :value="vendor.user_id">
                            {{ vendor.business_name }}
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-6 col-xl-3">
                    <select class="form-select bg-white fs-16 px-3 text-dark-emphasis search-bar border-0 rounded-5"
                        v-model="productReport.selectCategory" @change="productReport.getProductReport()">
                        <option value="" disabled selected>ជ្រើសរើសប្រភេទផលិផល</option>
                        <option value="">ទាំងអស់</option>
                        <option v-for="category in productReport.categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-6 col-xl-3">
                    <div class="input-group input-group-sm form-date rounded-5 overflow-hidden">
                        <span class="input-group-text bg-white border-0 fs-6 ps-3">ពីថ្ងៃ:</span>
                        <input type="date" ref="datepicker" class="form-control border-0 px-3"
                            v-model="productReport.start_date" placeholder="yyyy/mm/dd"
                            @input="productReport.getProductReport()">
                    </div>
                </div>
                <div class="col-12 col-md-6 col-xl-3">
                    <div class="input-group input-group-sm form-date rounded-5 overflow-hidden">
                        <span class="input-group-text bg-white border-0 fs-6 ps-3">ដល់ថ្ងៃ:</span>
                        <input type="date" ref="datepicker1" class="form-control border-0 px-3"
                            v-model="productReport.end_date" placeholder="yyyy/mm/dd"
                            @input="productReport.getProductReport()">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductReportStore } from '@/stores/views/product_report_store';
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';
import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";

const datepicker = ref(null);
const datepicker1 = ref(null);

const productReport = useProductReportStore();

onMounted(() => {
    productReport.onloadVendor();
    productReport.onloadSubcateigy();
    flatpickr(datepicker.value, {
        enableTime: false,
        dateFormat: "Y-m-d",
    });
    flatpickr(datepicker1.value, {
        enableTime: false,
        dateFormat: "Y-m-d",
    });
});

const cleanFilter = () => {
    productReport.selectedVendor = '';
    productReport.selectCategory = '';
    productReport.start_date = '';
    productReport.end_date = '';
    productReport.getProductReport();
}

const exportToCSV = async () => {
    try {
        const response = await axios.get(`/api/products?all=true&vendor_id=${productReport.selectedVendor}&category_id=${productReport.selectCategory}&start_date=${productReport.start_date}&end_date=${productReport.end_date}`);
        if (response.data.result) {
            const allData = response.data.data;
            const headers = ['ឈ្មោះផលិតផល', 'ប្រភេទផលិតផល', 'ម្ចាស់តូប', 'ផ្សារ', 'បរិមាណ', 'រង្វាស់', 'តម្លៃ​', 'បញ្ចុះតម្លៃ', 'ថ្ងៃបញ្ចុះតម្លៃ', 'ថ្ងៃបញ្ចប់បញ្ចុះតម្លៃ', 'ស្តុក', 'អំពីផលិតផល'];
            const data = allData.map(item => [
                `"${item.name || 'N/A'}"`,
                `"${item.subcategory?.name || 'N/A'}"`,
                `"${item.vendor?.business_name || 'N/A'}"`,
                `"${item.vendor?.market?.name || 'N/A'}"`,
                `"${item.stock_qty || 'N/A'}"`,
                `"${item.measure?.name || 'N/A'}"`,
                `"${item.price || 'N/A'}"`,
                `"${item.discount?.discount_percentage || 'N/A'}"`,
                `"${item.discount?.start_date || 'N/A'}"`,
                `"${item.discount?.end_date || 'N/A'}"`,
                `"${item.stock_qty <= 0 ? 'អស់ពិស្តុក' : item.stock_qty <= 5 ? 'ស្តុកមានតិច' : 'មានក្នុងស្តុក'}"`,
                `"${item.description || 'N/A'}"`,
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
            link.setAttribute('download', 'products.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Failed to fetch products.");
        }
    } catch (error) {
        console.error("Error exporting products:", error);
    }
};
</script>
