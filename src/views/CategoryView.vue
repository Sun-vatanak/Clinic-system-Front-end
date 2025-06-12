<template>
  <section class="mb-3">
    <div class="container-fluid">
      <CategoryHeader />
      <CategoryList />
    </div>
  </section>
  <ModalAdd />
  <ModalDelete />
  <ModalCrop />
  <CategoryErr />
</template>

<script setup>
import CategoryHeader from "@/components/views/category/CategoryHeader.vue";
import CategoryList from "@/components/views/category/CategoryList.vue";
import ModalAdd from "@/components/views/category/ModalAdd.vue";
import ModalDelete from "@/components/views/category/ModalDelete.vue";
import ModalCrop from "@/components/views/category/ModalCrop.vue";
import CategoryErr from "@/components/views/category/CategoryErr.vue";
</script>
