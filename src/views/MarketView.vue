<template>
    <div class="rounded-4 mb-3">
        <div class="container-fluid">
            <MarketHeader />
            <MarketList />
        </div>
    </div>
    <ModalAdd />
    <ModalDelete />
    <ModalCrop />
    <MarketErr/>
</template>

<script setup>
import MarketHeader from "@/components/views/market/MarketHeader.vue";
import MarketList from "@/components/views/market/MarketList.vue";
import ModalAdd from "@/components/views/market/ModalAdd.vue";
import ModalDelete from "@/components/views/market/ModalDelete.vue";
import ModalCrop from "@/components/views/market/ModalCrop.vue";
import MarketErr from "@/components/views/market/MarketErr.vue";
</script>