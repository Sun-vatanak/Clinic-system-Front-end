<template>
    <section class="mb-3">
        <div class="container-fluid">
            <VendorHeader />
            <VendorList />
        </div>
    </section>
    <ModalAdd />
    <ModalDelete />
    <ModalView />
    <VendorErr />
</template>
<script setup>
import VendorHeader from '@/components/views/vendor/VendorHeader.vue';
import VendorList from '@/components/views/vendor/VendorList.vue';
import ModalAdd from '@/components/views/vendor/ModalAdd.vue';
import ModalDelete from '@/components/views/vendor/ModalDelete.vue';
import ModalView from '@/components/views/vendor/ModalView.vue';
import VendorErr from '@/components/views/vendor/VendorErr.vue';
</script>