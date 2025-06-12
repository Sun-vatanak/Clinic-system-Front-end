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
                        <th class="text-dark-emphasis text-end action">មុខងារ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="marketStore.isLoading">
                        <td colspan="5" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="marketStore.total_records == 0 && !marketStore.isLoading">
                        <td colspan="5" class="text-center py-3">
                            រកមិនឃើញទិន្នន័យ
                        </td>
                    </tr>
                    <tr v-if="!marketStore.isLoading" v-for="(market, i) in marketStore.markets" :key="market.id"
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
                        <td>
                            <div class="d-flex align-items-center justify-content-end pe-2 gap-3">
                                <a role="button" class="btn-action btn-update" @click="onclickEditMarket(market)" title="កែប្រែ">
                                    <i class="bi bi-pencil-square"></i>
                                </a>
                                <a role="button" class="btn-action btn-delete" @click="onclickDeleteMarket(market)" title="លុប">
                                    <i class="bi bi-trash"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="!marketStore.isLoading" class="mb-3">
                <Pagination />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useMarketStore } from "@/stores/views/market_store.js";
import Pagination from "@/components/views/market/Pagination.vue";
import Loading from "../reusable/loading.vue";

const marketStore = useMarketStore();

onMounted(() => {
    marketStore.onloadMarket();
});

const onclickEditMarket = (marketOBJ) => {
    marketStore.selectedId = marketOBJ.id;
    marketStore.frm.name = marketOBJ.name;
    marketStore.frm.location = marketOBJ.location;
    marketStore.frm.latitude = marketOBJ.latitude;
    marketStore.frm.longitude = marketOBJ.longitude;
    marketStore.frm.description = marketOBJ.description;
    marketStore.crop.avatar = marketOBJ.photo;
    marketStore.frm.photo = marketOBJ.photo
    marketStore.mdl_add.show();
    if (marketStore.v_validate) {
        marketStore.v_validate.$reset();
    }
};

const onclickDeleteMarket = (marketOBJ) => {
    marketStore.selectedId = marketOBJ.id;
    marketStore.frm.name = marketOBJ.name;
    marketStore.mdl_delete.show();
};
</script>