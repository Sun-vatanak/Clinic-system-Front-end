<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-5">
            <div class="fs-5 p-0 fw-semibold">ទិន្នន័យការលក់</div>
        </div>
        <div class="col-12 mt-3 p-0">
            <div class="row gy-4">
                <div class="col-12 col-sm-4 col-md-4 col-xl-3 order-3 order-xl-0">
                    <div class="bg-white search-bar d-flex align-items-center ps-2 rounded-5">
                        <input type="search" class="form-control bg-transparent border-0" placeholder="ស្វែងរក"
                            v-model="saleReportStore.searchQuery" @input="saleReportStore.onLoadSaleReport()" />
                        <span class="input-group-text bg-transparent border-0">
                            <i class="bi bi-search text-dark-emphasis"></i>
                        </span>
                    </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xl-3 order-2 order-xl-1">
                    <div class="input-group input-group-sm form-date rounded-5 overflow-hidden">
                        <span class="input-group-text bg-white border-0 fs-6 ps-3">ពីថ្ងៃ:</span>
                        <input type="date" ref="datepicker" class="form-control border-0 px-3"
                            v-model="saleReportStore.start_date" placeholder="yyyy/mm/dd">
                    </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xl-3 order-1 order-xl-2">
                    <div class="input-group input-group-sm form-date rounded-5 overflow-hidden">
                        <span class="input-group-text bg-white border-0 fs-6 ps-3">ដល់ថ្ងៃ:</span>
                        <input type="date" ref="datepicker2" class="form-control border-0 px-3"
                            v-model="saleReportStore.end_date" placeholder="yyyy/mm/dd"
                            @input="saleReportStore.onLoadSaleReport">
                    </div>
                </div>
                <div class="col-12 col-md-12 col-xl-3 order-0 order-xl-3 d-flex align-item-center justify-content-end gap-3">
                    <button type="button" @click="cleanFilter()" class="btn btn-primary rounded-5">
                        សម្អាតតម្រង
                    </button>
                    <button type="button" class="btn btn-primary d-flex gap-2 align-items-center rounded-5"
                        :class="{ 'disabled': !saleReportStore.reposrt || saleReportStore.reposrt.length === 0 }"
                        @click="exportToCSV">
                        <i class="bi bi-download"></i>
                        CVS
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useSaleReportStore } from "@/stores/views/saleReport_store";
import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import axios from "axios";

const saleReportStore = useSaleReportStore();
const startDate = ref("");
const endDate = ref("");
const datepicker = ref(null);
const datepicker2 = ref(null);
// const isdata = ref(false);
const filteredSales = computed(() => {
    return saleReportStore.paginatedSalesReport.filter(sale => {
        const saleDate = new Date(sale.order_date);
        const fromDate = startDate.value ? new Date(startDate.value) : null;
        const toDate = endDate.value ? new Date(endDate.value) : null;

        return (!fromDate || saleDate >= fromDate) && (!toDate || saleDate <= toDate);
    });
});
onMounted(() => {
    flatpickr(datepicker.value, {
        enableTime: false,
        dateFormat: "Y-m-d",
    });
    flatpickr(datepicker2.value, {
        enableTime: false,
        dateFormat: "Y-m-d",
    });
})

const cleanFilter = () => {
    saleReportStore.start_date = "";
    saleReportStore.end_date = "";
    saleReportStore.searchQuery = "";
    saleReportStore.onLoadSaleReport();
}

const exportToCSV = async () => {
    try {
        const response = await axios.get(`/api/vendor/order/report?all=true&start_date=${saleReportStore.start_date}&end_date=${saleReportStore.end_date}`);
        if (response.data.result) {
            const allData = response.data.data;
            const headers = ['លេខបញ្ជាទិញ', 'អតិថិជន', 'ផលិតផល', 'ប្រភេទផលិតផល', 'ចំនួន', 'តម្លៃ', 'បញ្ចុះតម្លៃ', 'តម្លៃសរុប', 'កាលបរិច្ឆេទ'];
            const data = allData.map(item => [
                `"#${item.order_number || 'N/A'}"`,
                `"${item.customer?.first_name || 'N/A'} ${item.customer?.last_name || 'N/A'}"`,
                `"${item.products?.name || 'N/A'}"`,
                `"${item.products?.subcategory || 'N/A'}"`,
                `"${item.products?.discount || 'N/A'}"`,
                `"${item.products?.quantity || 'N/A'}"`,
                `"${item.price || 'N/A'}"`,
                `"${item.total_amount || 'N/A'}"`,
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
