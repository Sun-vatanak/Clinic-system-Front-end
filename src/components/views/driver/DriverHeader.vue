<template>
  <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
    <div class="col-4 col-md-3 d-none d-sm-block">
      <div class="fs-5 p-0 fw-semibold">ទិន្ន័យរបស់អ្នកដឺកជញ្ជូន</div>
    </div>
    <div class="col-12 col-sm-7 col-xl-5 p-0">
      <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 gap-md-3">
        <div class="bg-white w-100 search-bar d-flex align-items-center ps-2 rounded-5">
          <input type="text" @input="driverStore.onloadDriver()" class="form-control bg-transparent border-0"
            placeholder="ស្វែងរក" v-model="driverStore.searchQuery" />
          <span class="input-group-text bg-transparent border-0">
            <i class="bi bi-search text-dark-emphasis"></i>
          </span>
        </div>
        <div class="d-flex align-items-center gap-3">
          <button type="button" @click="onclickAddSubcategory()" class="btn btn-primary btn-add">
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
import { usederiverStore } from "@/stores/views/driver_store";
import axios from "axios";
const driverStore = usederiverStore();
const onclickAddSubcategory = () => {
  driverStore.frm.name = "";
  driverStore.frm.user_id = "";
  driverStore.frm.latitude = "";
  driverStore.frm.longitude = "";
  driverStore.frm.vin = "";
  driverStore.frm.category_id = "";
  driverStore.crop.avatar = null;
  driverStore.selectedId = 0;
  if (driverStore.vv) {
    driverStore.vv.$reset();
  }
  console.log("hdd");
  driverStore.mdl_add.show();
};

const exportToCSV = async () => {
  try {
    const response = await axios.get("/api/deliveries?all=true");
    if (response.data.result) {
      const allData = response.data.data;
      const headers = ['ឈ្មោះអ្នកដឹកជញ្ជូន', 'Latitude', 'Logitude', 'លេខសម្គាល់យានជំនិះ'];
      const data = allData.map(item => [
        `"${item.user?.profile?.first_name || 'N/A'}  ${item.user?.profile?.last_name || 'N/A'}"`,
        `"${item.latitude || 'N/A' }"`,
        `"${item.longitude || 'N/A'}"`,
        `"${item.vin || 'N/A'}"`,
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
      link.setAttribute('download', 'drivers.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Failed to fetch drivers.");
    }
  } catch (error) {
    console.error("Error exporting drivers:", error);
  }
};
</script>
