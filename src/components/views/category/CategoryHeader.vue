<template>
  <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
    <div class="col-4 col-md-3 d-none d-sm-block">
      <div class="fs-5 p-0 fw-semibold">ប្រភេទផលិតផល</div>
    </div>
    <div class="col-12 col-sm-7 col-xl-5 p-0">
      <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 gap-md-3">
        <div class="bg-white w-100 search-bar d-flex align-items-center ps-2 rounded-5">
          <input @input="categoryStore.onloadCategory" type="text" class="form-control bg-transparent border-0"
            placeholder="ស្វែងរក" v-model="categoryStore.searchQuery">
          <span class="input-group-text bg-transparent border-0">
            <i class="bi bi-search text-dark-emphasis"></i>
          </span>
        </div>
        <div class="d-flex align-items-center gap-3">
          <button type="button" @click="onclickAddCategory()" class="btn btn-primary btn-add">
            <i class="bi bi-plus-lg"></i>
          </button>
          <button class="btn btn-primary rounded-5 px-3 d-flex align-items-center" @click="exportToCSV">
            <i class="bi bi-download me-2"></i>CVS
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from "@/stores/views/category_store";
import axios from "axios";

const categoryStore = useCategoryStore();

const onclickAddCategory = () => {
  categoryStore.frm.name = "";
  categoryStore.frm.create_at = "";
  categoryStore.crop.avatar = null;
  categoryStore.selectedId = 0;
  categoryStore.frm.photo = '';
  if (categoryStore.v_validate) {
    categoryStore.v_validate.$reset();
  }
  categoryStore.mdl_add.show();
};

const exportToCSV = async () => {
  try {
    const response = await axios.get("/api/categories?all=true");
    if (response.data.result) {
      const allData = response.data.data;
      const headers = ['ឈ្មោះប្រភេទផលិតផល'];

      const data = allData.map(item => [
        `"${item.name || 'N/A'}"`,
      ]);
      const BOM = "\uFEFF";
      const csvContent = BOM + [
        headers.join(','),
        ...data.map(row => row.join(','))
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'categories.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Failed to fetch Markets.");
    }
  } catch (error) {
    console.error("Error exporting Markets:", error);
  }
};
</script>
