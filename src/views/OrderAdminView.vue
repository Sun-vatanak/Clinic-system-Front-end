<template>
    <div class="rounded-4 mb-3">
        <div class="container-fluid">
            <OrderAdminHeader />
            <OrderList />
        </div>
    </div>
</template>

<script setup>
import OrderList from '@/components/views/orderadmins/OrderList.vue';
import OrderAdminHeader from '@/components/views/orderadmins/OrderAdminHeader.vue';
</script>