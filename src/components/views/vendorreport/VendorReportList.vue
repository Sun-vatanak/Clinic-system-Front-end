<template>
    <div class="row bg-white section-spacing rounded-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-dark-emphasis" scope="col">អត្តលេខ</th>
                        <th class="text-dark-emphasis" scope="col">ឈ្មោះម្ចាស់តូប</th>
                        <th class="text-dark-emphasis" scope="col">ឈ្មោះតូប</th>
                        <th class="text-dark-emphasis" scope="col">ផ្សារ</th>
                        <th class="text-dark-emphasis" scope="col">ចំនួនសរុបការលក់</th>
                        <th class="text-dark-emphasis" scope="col">ចំនួនសរុបវាយតម្លៃ</th>
                        <th class="text-dark-emphasis" scope="col">ចំនួនវាយតម្លៃជាមធ្យម</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="vendorreport.isLoading">
                        <td colspan="11" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="vendorreport.vendor.length === 0 && !vendorreport.isLoading">
                        <td colspan="11" class="text-center">គ្មានទិន្នន័យ</td>
                    </tr>
                    <tr class="align-middle" v-for="data in vendorreport.vendor" :key="data.user_id"
                        v-if="!vendorreport.isLoading">
                        <td>{{ data.user_id}}</td>
                        <td>{{ data.first_name+' '+data.last_name}}</td>
                        <td>{{ data.business_name}}</td>
                        <td>{{ data.market_name}}</td>
                        <td>{{ data.order_count }}</td>
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
import { useVendorReportStore } from "@/stores/views/vendorReport_store";
import Loading from "../reusable/loading.vue";

const vendorreport = useVendorReportStore();

onMounted(() => {
    vendorreport.onLoadVendoerReport();
});

</script>