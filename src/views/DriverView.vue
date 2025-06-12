<template>
    <section class="mb-3">
        <div class="container-fluid">
            <DriverHeader />
            <DriverList />
        </div>
    </section>
    <ModalAdd />
    <ModalCrop />
    <ModalDelete />
</template>
<script setup>
import DriverList from '@/components/views/driver/DriverList.vue';
import DriverHeader from '@/components/views/driver/DriverHeader.vue';
import ModalAdd from '@/components/views/driver/ModalAdd.vue';
import ModalCrop from '@/components/views/driver/ModalEdit.vue';
import ModalDelete from '@/components/views/driver/ModalDelete.vue';
</script>