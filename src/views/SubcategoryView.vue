<template>
    <section class="mb-3">
        <div class="container-fluid">
            <SubcategoryHeader />
            <SubcategoryList />
        </div>
    </section>
    <ModalAdd />
    <ModalCrop />
    <ModalDelete />
</template>

<script setup>
import SubcategoryHeader from '@/components/views/subcategory/SubcategoryHeader.vue';
import ModalAdd from '@/components/views/subcategory/ModalAdd.vue';
import ModalCrop from '@/components/views/subcategory/ModalCrop.vue';
import ModalDelete from '@/components/views/subcategory/ModalDelete.vue';
import SubcategoryList from '@/components/views/subcategory/SubcategoryList.vue';
</script>