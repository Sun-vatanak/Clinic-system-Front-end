<template>
    <div class="row bg-white section-spacing rounded-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-dark-emphasis" scope="col">អត្តលេខ</th>
                        <th class="text-dark-emphasis" scope="col">អតិថិជន</th>
                        <!-- <th class="text-dark-emphasis" scope="col">ប្រភេទផលិតផល</th> -->
                        <th class="text-dark-emphasis" scope="col">ផលិតផល</th>
                        <!-- <th class="text-dark-emphasis" scope="col">ផ្សារ</th>
                        <th class="text-dark-emphasis" scope="col">តូប</th> -->
                        <th class="text-dark-emphasis" scope="col">ចំនួន</th>
                        <th class="text-dark-emphasis" scope="col">តម្លៃ</th>
                        <th class="text-dark-emphasis" scope="col">តម្លៃសរុប</th>
                        <th class="text-dark-emphasis" scope="col">កាលបរិច្ឆេទ</th>
                        <th class="text-dark-emphasis text-center" scope="col">មុខងារ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="saleReportStore.isLoading">
                        <td colspan="11" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="saleReportStore.reposrt.length === 0 && !saleReportStore.isLoading">
                        <td colspan="11" class="text-center">គ្មានទិន្នន័យ</td>
                    </tr>
                    <tr class="align-middle" v-for="sale in saleReportStore.reposrt" :key="sale.id"
                        v-if="!saleReportStore.isLoading">
                        <td>{{ sale.order_number }}</td>
                        <td>{{ sale.customer.first_name + ' ' + sale.customer.last_name }}</td>
                        <td>{{ sale.products.name }}</td>
                        <td>{{ sale.products.quantity }}</td>
                        <td>{{ formatCurrency(sale.products.price) }}</td>
                        <td>{{ formatCurrency(sale.total_amount) }}</td>
                        <td>{{ sale.created_at }}</td>
                        <td>
                            <div class="d-flex align-items-center justify-content-center">
                                <button @click="exportToCSV(sale)" class="btn btn-export gap-2 rounded-5">
                                    <i class="bi bi-download"></i> ទាញយក CSV
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pb-3" v-if="!saleReportStore.isLoading">
            <Pagination />
        </div>
    </div>
    <div class="col-12 col-lg-4  ms-auto" v-if="!saleReportStore.isLoading">
        <div class="bg-white section-spacing rounded-4 mt-4 p-3 text-dark p-0">
            <div class="mb-2">
                <i class="bi bi-cart-fill me-2 fs-6"></i><span class=" fw-medium">ចំនួនការបញ្ចាទិញសរុប: <span
                        class="text-primary">{{ saleReportStore.total_order }}</span></span>
            </div>
            <div class="mb-2">
                <i class="bi bi-box2-fill me-2 fs-8"></i><span class=" fw-medium">ចំនួនផលិតផលសរុប: <span
                        class="text-primary">{{ saleReportStore.total_qty }}</span></span>
            </div>
            <div class="border_report my-3">

            </div>
            <div class="d-flex justify-content-between">
                <h3 class="m-0">តម្លៃសរុប</h3>
                <h3 class="m-0 text-primary">{{ formatCurrency(saleReportStore.total_amount) }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useSaleReportStore } from "@/stores/views/saleReport_store";
import Pagination from "@/components/views/sale_report/Pagination.vue";
import Loading from "../reusable/loading.vue";

const saleReportStore = useSaleReportStore();

onMounted(() => {
    saleReportStore.onLoadSaleReport();
});

const exportToCSV = (sale) => {
    const products = Array.isArray(sale.products) ? sale.products : [sale.products];

    const csvHeader = "\uFEFFលេខបញ្ជាទិញ, អតិថិជន, ផលិតផល, ប្រភេទផលិតផល, ចំនួន, តម្លៃ, បញ្ចុះតម្លៃ, តម្លៃសរុប, កាលបរិច្ឆេទ\n";

    const csvRows = products.map(product => {
        return [
            `"#${sale.order_number || 'N/A'}"`,
            `"${sale.customer?.first_name || 'N/A'} ${sale.customer?.last_name || 'N/A'}"`,
            `"${product?.name || 'N/A'}"`,
            `"${product?.subcategory || 'N/A'}"`,
            `"${product?.quantity || 'N/A'}"`,
            `"${product?.price || 'N/A'}"`,
            `"${product?.discount || 'N/A'}"`,
            `"${sale.total_amount || 'N/A'}"`,
            `"${sale.created_at || 'N/A'}"`
        ].join(",");
    }).join("\n");

    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `SaleReport-${sale.id || 'undefined'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};



const formatCurrency = (value) => {
    return new Intl.NumberFormat('km-KH', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value) + '៛';
};
</script>