<template>
  <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
    <div class="col-4 col-md-3 d-none d-sm-block">
      <div class="fs-5 p-0 fw-semibold">ទិន្ន័យរបស់អ្នកលក់
      </div>
    </div>
    <div class="col-12 col-sm-7 col-xl-5 p-0">
      <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 gap-md-3">
        <div class="bg-white w-100 search-bar d-flex align-items-center ps-2 rounded-5">
          <input type="text" @input="vendorStore.onloadVendor()" class="form-control bg-transparent border-0"
            placeholder="ស្វែងរក" v-model="vendorStore.searchQuery" />
          <span class="input-group-text bg-transparent border-0">
            <i class="bi bi-search text-dark-emphasis"></i>
          </span>
        </div>
        <div class="d-flex align-items-center gap-3">
          <button type="button" @click="onclickAddVendor()" class="btn btn-primary btn-add">
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
import { useVendorStore } from '@/stores/views/vendor_store';
import { useUserStore } from '@/stores/views/user_store';
import axios from 'axios';

const vendorStore = useVendorStore();
const userStore = useUserStore();

const onclickAddVendor = () => {
  vendorStore.selectedId = 0;
  vendorStore.frm.user_id = "";
  vendorStore.frm.business_name = "";
  vendorStore.frm.market_id = "";
  vendorStore.frm.open_time = "";
  vendorStore.frm.close_time = "";
  vendorStore.frm.latitude = "";
  vendorStore.frm.longitude = "";
  vendorStore.frm.invoice_img = '';
  vendorStore.invoice_img = '';
  if (vendorStore.vv) {
    vendorStore.vv.$reset();
  }
  vendorStore.mdl_add.show();
};

const exportToCSV = async () => {
  try {
    const response = await axios.get("/api/vendors?all=true");
    if (response.data.result) {
      const allData = response.data.data;
      const headers = ['អ្នកលក់', 'លេខទូរស័ព្ទ', 'អ៊ីម៉ែល', 'តួនាទី', 'ភេទ', 'ទីតាំង', 'ឈ្មោះតូប', 'ផ្សារ', 'ម៉ោងបើក', 'ម៉ោងបិទ', 'Latitude', 'Logitude', 'Telegram_id'];
      const data = allData.map(item => [
        `"${item.user?.profile?.first_name || 'N/A'}  ${item.user?.profile?.last_name || 'N/A'}"`,
        `"${item.user?.profile?.phone || 'N/A'}"`,
        `"${item.user?.email || 'N/A'}"`,
        `"${item.user?.profile?.role_name || 'N/A'}"`,
        `"${item.user?.profile?.gender_id === 1 ? 'ប្រុស' : item.user?.profile?.gender_id === 2 ? 'ស្រី' : 'N/A'}"`,
        `"${item.user?.profile?.address || 'N/A'}"`,
        `"${item.business_name || 'N/A'}"`,
        `"${item.market_name || 'N/A'}"`,
        `"${item.open_time || 'N/A'}"`,
        `"${item.close_time || 'N/A'}"`,
        `"${item.latitude || 'N/A'}"`,
        `"${item.longitude || 'N/A'}"`,
        `"${item.user?.telegram_id || 'N/A'}"`,
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
      link.setAttribute('download', 'vendors.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Failed to fetch vendor.");
    }
  } catch (error) {
    console.error("Error exporting vendor:", error);
  }
};

</script>
