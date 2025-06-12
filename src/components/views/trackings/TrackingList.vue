<template>
    <div class="row bg-white section-spacing rounded-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-dark-emphasis ps-3">ល.រ</th>
                        <th class="text-dark-emphasis">លេខកម្មង់</th>
                        <th class="text-dark-emphasis">អតិថិជន</th>
                        <th class="text-dark-emphasis">លេខទូរស័ព្ទ</th>
                        <th class="text-dark-emphasis">ទីតាំង</th>
                        <th class="text-dark-emphasis">ថ្លៃដឹកជញ្ជូន</th>
                        <th class="text-dark-emphasis">ចំនួនសរុប</th>
                        <th class="text-dark-emphasis">ស្ថានភាព</th>
                        <th class="text-dark-emphasis">កាបរិច្ឆេទ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="trackingStore.isLoading">
                        <td colspan="9" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="trackingStore.total_records == 0 && !trackingStore.isLoading">
                        <td colspan="9" class="text-center py-3">
                            រកមិនឃើញទិន្នន័យ
                        </td>
                    </tr>
                    <tr v-if="!trackingStore.isLoading" v-for="(tracking, i) in trackingStore.trackings" :key="tracking.id"
                        class="align-middle">
                        <td class="ps-4">{{ i + 1 }}</td>
                        <td class="ps-4">{{ tracking.order.order_number }}</td>
                        <td>{{ `${tracking.order.customer.first_name} ${tracking.order.customer.last_name}` }}</td>
                        <td>{{ tracking.order.customer.phone }}</td>
                        <td>{{ tracking.order.customer.address }}</td>
                        <td>{{ formatCurrency(tracking.order.delivery_fee) }}</td>
                        <td>{{ formatCurrency(tracking.order.total_amount) }}</td>
                        <td class="ps-2">
                            <span v-if="tracking.delivery_status_id == 1"
                                class="badge bg-warning-subtle fw-medium fs-13 text-warning px-3 rounded-5">រង់ចាំការទៅយក</span>
                            <span v-if="tracking.delivery_status_id == 2"
                                class="badge bg-primary-subtle fw-medium fs-13 text-primary px-3 rounded-5">អ្នកដឹកជញ្ជូនបានកំណត់</span>
                            <span v-if="tracking.delivery_status_id == 3"
                                class="badge bg-info-subtle fw-medium fs-13 text-info px-3 rounded-5">រួចរាល់សំរាប់ដឹកជញ្ជូន</span>
                            <span v-if="tracking.delivery_status_id == 4"
                                class="badge bg-primary-subtle fw-medium fs-13 text-primary px-3 rounded-5">កំពុងដឹកជញ្ជូន</span>
                            <span v-if="tracking.delivery_status_id == 5"
                                class="badge bg-danger-subtle fw-medium fs-13 text-danger px-3 rounded-5">បានមកដល់</span>
                            <span v-if="tracking.delivery_status_id == 6"
                                class="badge bg-secondary fw-medium fs-13 text-primary px-3 rounded-5">បានទទួល</span>
                            <span v-if="tracking.delivery_status_id == 7"
                                class="badge bg-primary-subtle fw-medium fs-13 text-primary px-3 rounded-5">បរាជ័យក្នុងការដឹកជញ្ជូន</span>
                        </td>
                        <td>{{ tracking.order.created_date }}</td>
                     
                    </tr>
                </tbody>
            </table>
            <div v-if="!trackingStore.isLoading" class="mb-3">
                <Pagination />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTrackingStore } from "@/stores/views/Tracking_store";
import Pagination from "@/components/views/trackings/Pagination.vue";
import Loading from "../reusable/loading.vue";

const trackingStore = useTrackingStore();

onMounted(() => {
    trackingStore.onloadTracking();
});

const formatCurrency = (value) => {
   return new Intl.NumberFormat('km-KH', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
   }).format(value) + '៛';
};

</script>