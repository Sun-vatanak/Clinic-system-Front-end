<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-3 d-none d-sm-block">
            <div class="fs-5 p-0 fw-semibold">ទិន្នន័យផ្សារ</div>
        </div>
        <div class="col-12 col-sm-6 col-md-5 p-0">
            <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 gap-md-3">
                <div class="bg-white w-100 search-bar d-flex align-items-center ps-2 rounded-5">
                    <input @input="marketStore.onloadMarket()" type="text" class="form-control bg-transparent border-0"
                        placeholder="ស្វែងរក" v-model="marketStore.searchQuery">
                    <span class="input-group-text bg-transparent border-0">
                        <i class="bi bi-search text-dark-emphasis"></i>
                    </span>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <button type="button" @click="onclickAddMarket" class="btn btn-primary p-0 btn-add">
                        <i class="bi bi-plus-lg"></i>
                    </button>
                    <button class="btn btn-primary rounded-5 px-3 d-flex align-items-center" @click="exportToCSV">
                        <i class="bi bi-download me-2"></i>CVS
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMarketStore } from "@/stores/views/market_store.js";
import axios from "axios";

const marketStore = useMarketStore();

const onclickAddMarket = () => {
    marketStore.frm.name = "";
    marketStore.frm.location = "";
    marketStore.frm.latitude = "";
    marketStore.frm.longitude = "";
    marketStore.frm.description = "";
    marketStore.frm.created_at = "";
    marketStore.frm.photo = "";
    marketStore.crop.avatar = null;
    marketStore.selectedId = 0;
    if (marketStore.v_validate) {
        marketStore.v_validate.$reset();
    }
    marketStore.mdl_add.show();
};

const exportToCSV = async () => {
    try {
        const response = await axios.get("/api/markets?all=true");
        if (response.data.result) {
            const allData = response.data.data;
            const headers = ['ឈ្មោះផ្សារ', 'ទីតាំង', 'ការពិពណ៌នា'];

            const data = allData.map(item => [
                `"${item.name || 'N/A'}"`,
                `"${item.location || 'N/A'}"`,
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
            link.setAttribute('download', 'markets.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Failed to fetch Markets.");
        }
    } catch (error) {
        console.error("Error exporting Markets:", error);
    }
};
</script>
