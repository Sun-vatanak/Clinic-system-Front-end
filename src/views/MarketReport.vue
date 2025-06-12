<template>
    <div class="rounded-4 mb-3">
        <div class="container-fluid">
            <MarketReportHeader />
            <MarketReportList />
        </div>
    </div>
</template>

<script setup>
import MarketReportHeader from '@/components/views/marketreport/MarketReportHeader.vue';
import MarketReportList from '@/components/views/marketreport/MarketReportList.vue';
</script>