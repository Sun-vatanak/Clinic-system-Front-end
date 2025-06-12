<template>
    <div class="rounded-4 mb-3">
      <div class="container-fluid">
        <VendorReportHeader/>
        <VendorReportList />
      </div>
    </div>
  </template>
  <script setup>
  import VendorReportHeader from '@/components/views/vendorreport/VendorReportHeader.vue';
  import VendorReportList from '@/components/views/vendorreport/VendorReportList.vue';
</script>