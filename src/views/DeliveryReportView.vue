<template>
    <div class="rounded-4 mb-3">
      <div class="container-fluid">
        <DeliveryReportHeader/>
        <DeliveryReportList />
      </div>
    </div>
</template>
<script setup>
    import DeliveryReportHeader from '@/components/views/deliveryreport/DeliveryReportHeader.vue';
    import DeliveryReportList from '@/components/views/deliveryreport/DeliveryReportList.vue';
</script>