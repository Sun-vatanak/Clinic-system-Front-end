<template>
  <div class="row bg-white rounded-4 section-spacing pb-3">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="text-dark-emphasis ps-3" scope="col">ល.រ</th>
            <th class="text-dark-emphasis" scope="col">ប្រភេទផលិតផលរង</th>
            <th class="text-dark-emphasis" scope="col">ប្រភេទផលិតផល</th>
            <th class="text-dark-emphasis text-end action-category" scope="col">
              មុខងារ
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="subcategoryStore.isLoading">
            <td colspan="5" class="border-none">
              <Loading />
            </td>
          </tr>
          <tr v-if="subcategoryStore.total_records == 0 && !subcategoryStore.isLoading">
            <td colspan="4" class="text-center py-3">រកមិនឃើញទិន្នន័យ</td>
          </tr>
          <tr v-if="!subcategoryStore.isLoading" v-for="subcategory in subcategoryStore.subcategories" :key="subcategory.id" class="align-middle">
            <td class="ps-3">{{ subcategory.id }}</td>
            <td>
              {{ subcategory.name }}
            </td>
            <td class="ps-2">{{ subcategory.category.name }}</td>
            <td>
              <div class="d-flex align-items-center justify-content-end gap-3">
                <a role="button" class="btn-action btn-update" @click="onclickEditSubcategory(subcategory)" title="កែប្រែ">
                  <i class="bi bi-pencil-square"></i>
                </a>
                <a role="button" class="btn-action btn-delete" @click="onclickDeleteCategory(subcategory)" title="លុប">
                  <i class="bi bi-trash"></i>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!subcategoryStore.isLoading">
      <Pagination />
    </div>
  </div>
</template>

<script setup>
import { useSubcategoryStore } from "@/stores/views/subcategory_store";
import Pagination from "@/components/views/subcategory/Pagination.vue";
import { onMounted } from "vue";
import Loading from "../reusable/loading.vue";

const subcategoryStore = useSubcategoryStore();

onMounted(() => {
  subcategoryStore.onloadSubcategory();
});

const onclickEditSubcategory = (subObj) => {
  subcategoryStore.selectedId = subObj.id;
  subcategoryStore.frm.name = subObj.name;
  subcategoryStore.frm.category_id = subObj.category.id;
  if (subcategoryStore.vv) {
    subcategoryStore.vv.$reset();
  }
  subcategoryStore.mdl_add.show();
};

const onclickDeleteCategory = (subObj) => {
  subcategoryStore.selectedId = subObj.id;
  subcategoryStore.frm.name = subObj.name;
  subcategoryStore.mdl_delete.show();
};
</script>
