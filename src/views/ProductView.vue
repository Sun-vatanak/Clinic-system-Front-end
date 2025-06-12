<template>
    <div class="rounded-4mb-3">
        <div class="container-fluid">
            <ProductHeader />
            <ProductList />
        </div>
    </div>
    <ModalAdd />
    <ModalCrop />
    <ModalDelete />
    <ModalView />
    <ProductErr />
</template>

<script setup>
import ProductHeader from '@/components/views/product/ProductHeader.vue';
import ProductList from '@/components/views/product/ProductList.vue';
import ModalAdd from '@/components/views/product/ModalAdd.vue';
import ModalCrop from '@/components/views/product/ModalCrop.vue';
import ModalDelete from '@/components/views/product/ModalDelete.vue';
import ModalView from '@/components/views/product/ModalView.vue';
import ProductErr from '@/components/views/product/ProductErr.vue';
</script>