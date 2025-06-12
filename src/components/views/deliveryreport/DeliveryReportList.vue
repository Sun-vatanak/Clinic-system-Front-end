<template>
    <div class="row bg-white section-spacing rounded-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-dark-emphasis" scope="col">អត្តលេខ</th>
                        <th class="text-dark-emphasis" scope="col">ឈ្មោះអ្នកដឹកជញ្ចូន</th>
                        <th class="text-dark-emphasis" scope="col">	លេខសម្គាល់យានជំនិះ</th>
                        <th class="text-dark-emphasis" scope="col">ចំនួនសរុបដឹកជញ្ចូន</th>
                        <th class="text-dark-emphasis" scope="col">ចំនួនសរុបវាយតម្លៃ</th>
                        <th class="text-dark-emphasis" scope="col">ចំនួនវាយតម្លៃជាមធ្យម</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="deliveryreport.isLoading">
                        <td colspan="11" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="deliveryreport.delivery.length === 0 && !deliveryreport.isLoading">
                        <td colspan="11" class="text-center">គ្មានទិន្នន័យ</td>
                    </tr>
                    <tr class="align-middle" v-for="data in deliveryreport.delivery" :key="data.user_id"
                        v-if="!deliveryreport.isLoading">
                        <td>{{ data.user_id}}</td>
                        <td>{{ data.first_name+' '+data.last_name}}</td>
                        <td>{{ data.vin}}</td>
                        <td>{{ data.delivered_count }}</td>
                        <td>{{ data.rating_count }}</td>
                        <td>{{ data.average_rating }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import {useDeliveryReportStore} from "@/stores/views/deliveryReport_store";
import Loading from "../reusable/loading.vue";

const deliveryreport = useDeliveryReportStore();

onMounted(() => {
    deliveryreport.onLoadDeliveryReport();
});

</script>