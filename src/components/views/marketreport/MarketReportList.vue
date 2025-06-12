<template>
    <div class="row bg-white section-spacing rounded-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-dark-emphasis ps-3">ល.រ</th>
                        <th class="text-dark-emphasis">ឈ្មោះផ្សារ</th>
                        <th class="text-dark-emphasis">ទីតាំង</th>
                        <th class="text-dark-emphasis">ការពិពណ៌នា</th>
                        <th class="text-dark-emphasis">ចំនួការកម្មង់សរុប</th>
                        <th class="text-dark-emphasis">ចំនួនម្ចាស់ហាងសរុប</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="marketReport.isLoading">
                        <td colspan="6" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="marketReport.total_records == 0 && !marketReport.isLoading">
                        <td colspan="6" class="text-center py-3">
                            រកមិនឃើញទិន្នន័យ
                        </td>
                    </tr>
                    <tr v-if="!marketReport.isLoading" v-for="(market, i) in marketReport.markets" :key="market.id"
                        class="align-middle">
                        <td class="ps-3">{{ i + 1 }}</td>
                        <td>
                            <div class="d-flex align-items-center gap-3">
                                <div class="profile_market">
                                    <img :src="market.photo" alt="Market Photo">
                                </div>
                                <span>{{ market.name }}</span>
                            </div>
                        </td>
                        <td>{{ market.location }}</td>
                        <td>{{ market.description }}</td>
                        <td>{{ market.orders_count }}</td>
                        <td>{{ market.vendors_count }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="!marketReport.isLoading" class="mb-3">
                <Pagination />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMarketReportStore } from '@/stores/views/market_report_store';
import { onMounted } from 'vue';
import Pagination from '@/components/views/marketreport/Pagination.vue';
import Loading from "../reusable/loading.vue";

const marketReport = useMarketReportStore();

onMounted(() =>{
    marketReport.onloadMarketReport();
})
</script>