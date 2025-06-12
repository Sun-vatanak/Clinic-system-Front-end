<template>
  <div class="rounded-4 mb-3">
    <div class="container-fluid">
      <SaleReportHeader />
      <SaleReportList />
      <!-- <Chat /> -->
    </div>
  </div>
</template>

<script setup>
import SaleReportHeader from "@/components/views/sale_report/SaleReportHeader.vue";
import SaleReportList from "@/components/views/sale_report/SaleReportList.vue";
import Chat from "@/components/views/chats/Chat.vue";
</script>
