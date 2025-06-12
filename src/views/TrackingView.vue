<template>
    <div class="rounded-4 mb-3">
        <div class="container-fluid">
            <TrackingHeader />
            <TrackingList />
        </div>
    </div>
</template>
<script setup>
import TrackingList from '@/components/views/trackings/TrackingList.vue';
import TrackingHeader from '@/components/views/trackings/TrackingHeader.vue';
</script>