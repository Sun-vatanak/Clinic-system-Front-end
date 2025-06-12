<template>
    <div class="row bg-white section-spacing rounded-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-dark-emphasis" scope="col">ល.រ</th>
                        <th class="text-dark-emphasis" scope="col">ឈ្មោះផលិតផល</th>
                        <th class="text-dark-emphasis" scope="col">ប្រភេទផលិតផល</th>
                        <th class="text-dark-emphasis" scope="col">ម្ចាស់តូប</th>
                        <th class="text-dark-emphasis" scope="col">ផ្សារ</th>
                        <th class="text-dark-emphasis" scope="col">បរិមាណ</th>
                        <th class="text-dark-emphasis" scope="col">បញ្ចុះតម្លៃ</th>
                        <th class="text-dark-emphasis" scope="col">តម្លៃ</th>
                        <th class="text-dark-emphasis" scope="col">ផលិតផលស្តុក</th>
                        <th class="text-dark-emphasis" scope="col">ថ្ងៃខែឆ្នាំ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="productReport.isLoading">
                        <td colspan="10" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="productReport.products.length === 0 && !productReport.isLoading">
                        <td colspan="10" class="text-center py-3">
                            គ្មាននិន្នន័យ
                        </td>
                    </tr>
                    <tr v-for="(product, i) in productReport.products" :key="product.id" class="align-middle" v-if="!productReport.isLoading">
                        <td>{{ (productReport.currentPage - 1) * productReport.itemsPerPage + i + 1 }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.subcategory.category.name }}</td>
                        <td>{{ product.vendor.business_name }}</td>
                        <td>{{ product.vendor.market.name }}</td>
                        <td>{{ product.stock_qty }} {{ product.measure.name }}</td>
                        <td>{{ product.discount == null ? 0 : product.discount.discount_percentage }}%</td>
                        <td>{{ formatCurrency(product.price) }}</td>
                        <td>
                            <div :class="product.stock_qty <= 0 ? 'text-danger' : product.stock_qty <= 5 ? 'text-warning' : 'text-primary'">
                                {{ product.stock_qty <= 0 ? 'អស់ពីស្តុក' : product.stock_qty <= 5 ? 'ស្តុកមានតិច' : 'មានក្នងស្តុក' }}
                            </div>
                        </td>
                        <td>{{ product.created_at }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="!productReport.isLoading">
            <Pagination />
        </div>
    </div>
</template>

<script setup>
import { useProductReportStore } from '@/stores/views/product_report_store';
import { onMounted } from 'vue';
import Pagination from '@/components/views/productreport/Pagination.vue';
import Loading from "../reusable/loading.vue";

const productReport = useProductReportStore();
onMounted(() => {
    productReport.getProductReport();
});

const formatCurrency = (value) => {
   return new Intl.NumberFormat('km-KH', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
   }).format(value) + '៛';
};

</script>
