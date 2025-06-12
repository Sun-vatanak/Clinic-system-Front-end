<template>
  <div class="row bg-white rounded-4 section-spacing pb-3">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="text-dark-emphasis ps-3" scope="col">ល.រ</th>
            <th class="text-dark-emphasis" scope="col">ឈ្មោះប្រភេទផលិតផល</th>
            <th class="text-dark-emphasis text-end action-category" scope="col">
              មុខងារ
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="categoryStore.isLoading">
            <td colspan="4" class="border-none">
              <Loading />
            </td>
          </tr>
          <tr v-if="categoryStore.total_records == 0 && !categoryStore.isLoading">
            <td colspan="4" class="text-center py-3">រកមិនឃើញទិន្នន័យ</td>
          </tr>
          <tr v-if="!categoryStore.isLoading" v-for="(category, i) in categoryStore.categories" :key="category.id" class="align-middle">
            <td class="ps-3">{{ i + 1 }}</td>
            <td>
              <div class="d-flex align-items-center gap-3">
                <div class="profile_category">
                  <img :src="category.photo" alt="" />
                </div>
                <span>
                  {{ category.name }}
                </span>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center justify-content-end gap-3">
                <a role="button" class="btn-action btn-update" @click="onclickEditCategory(category)" title="កែប្រែ">
                  <i class="bi bi-pencil-square"></i>
                </a>
                <a role="button" class="btn-action btn-delete" @click="onclickDeleteCategory(category)" title="លុប">
                  <i class="bi bi-trash"></i>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!categoryStore.isLoading">
      <Pagination />
    </div>
  </div>
</template>

<script setup>
import Pagination from "@/components/views/category/Pagination.vue";
import { useCategoryStore } from "@/stores/views/category_store";
import { onMounted } from "vue";
import Loading from "../reusable/loading.vue";
const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.onloadCategory();
});

const onclickEditCategory = (categoryOBJ) => {
  categoryStore.selectedId = categoryOBJ.id;
  categoryStore.frm.name = categoryOBJ.name;
  categoryStore.frm.create_at = categoryOBJ.create_at;
  categoryStore.crop.avatar = categoryOBJ.photo;
  categoryStore.frm.photo = categoryOBJ.photo;;

  categoryStore.mdl_add.show();
  if (categoryStore.v_validate) {
    categoryStore.v_validate.$reset();
  }
};

const onclickDeleteCategory = (categoryOBJ) => {
  categoryStore.selectedId = categoryOBJ.id;
  categoryStore.frm.name = categoryOBJ.name;
  categoryStore.mdl_delete.show();
};
</script>
