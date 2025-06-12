<template>
  <div class="vendor row bg-white rounded-4 section-spacing pb-3">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr class="text-start">
            <th class="text-dark-emphasis ps-3" scope="col">ល.រ</th>
            <th class="text-dark-emphasis" scope="col">អ្នកលក់</th>
            <th class="text-dark-emphasis" scope="col">ឈ្មោះតូប</th>
            <th class="text-dark-emphasis" scope="col">ផ្សារ</th>
            <th class="text-dark-emphasis text-center" scope="col">ស្ថានភាព</th>
            <th class="text-dark-emphasis text-end pe-5 action-category" scope="col">
              មុខងារ
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="vendorStore.isLoading">
            <td colspan="6" class="border-none">
              <Loading />
            </td>
          </tr>
          <tr v-if="vendorStore.total_records == 0 && !vendorStore.isLoading">
            <td colspan="6" class="text-center py-3">រកមិនឃើញទិន្នន័យ</td>
          </tr>
          <tr v-if="!vendorStore.isLoading" v-for="(vendor, i) in vendorStore.vendors" :key="vendor.id" class="align-middle text-start">
            <td class="ps-3">{{ i + 1 }}</td>
            <td>
              <div class="d-flex align-items-center gap-3">
                <div class="profile_category">
                  <img :src="vendor.user?.profile?.photo" alt="Vendor Photo">
                </div>
                <span v-if="vendor.user?.profile">
                  {{ `${vendor.user.profile.first_name || ''} ${vendor.user.profile.last_name || ''}` }}
                </span>
              </div>
            </td>
            <td class="ps-2">{{ vendor.business_name }}</td>
            <td class="ps-3">{{ vendor.market_name }}</td>
            <td class="fs-4 ps-4" :class="vendor.user.is_active == 1 ? 'text-primary' : 'text-primary'">
              <i class="bi-toggle-off status-user" :class="{ 'bi-toggle-on': vendor.user.is_active }"
                @click="onclickStatus(vendor)" :disabled="isLoading">
              </i>
            </td>
            <td>
              <div class="d-flex align-items-end justify-content-end gap-3">
                <a role="button" class="btn-action btn-views" @click="viewVendorModal(vendor)" title="មើលលម្អិត">
                  <i class="bi bi-eye"></i>
                </a>
                <a role="button" class="btn-action btn-update" @click="onclickEditVendor(vendor)" title="កែប្រែ">
                  <i class="bi bi-pencil-square"></i>
                </a>
                <a role="button" class="btn-action btn-delete" @click="onclickDeleteVendor(vendor)" title="លុប">
                  <i class="bi bi-trash"></i>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!vendorStore.isLoading">
      <Pagination />
    </div>
  </div>
</template>

<script setup>
import { useVendorStore } from "@/stores/views/vendor_store";
import Pagination from "@/components/views/vendor/Pagination.vue";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/views/auth/auth";
import axios from "axios";
import Loading from "../reusable/loading.vue";

const vendorStore = useVendorStore();
const authStore = useAuthStore();
const isLoading = ref(false);

onMounted(() => {
  vendorStore.onloadVendor();
});

const onclickEditVendor = (vendorOBJ) => {
  console.log(vendorStore.frm.market_id);

  vendorStore.selectedId = vendorOBJ.user_id;
  vendorStore.frm.user_id = vendorOBJ.user_id
  vendorStore.frm.business_name = vendorOBJ.business_name;
  vendorStore.frm.market_id = vendorOBJ.market_id;
  vendorStore.frm.open_time = vendorOBJ.open_time;
  vendorStore.frm.close_time = vendorOBJ.close_time;
  vendorStore.frm.latitude = vendorOBJ.latitude;
  vendorStore.frm.longitude = vendorOBJ.longitude;
  if (vendorOBJ.qrcode) {
    vendorStore.invoice_img = vendorOBJ.qrcode;
    vendorStore.frm.invoice_img = vendorOBJ.qrcode; 
  }

  if (vendorStore.vv) {
    vendorStore.vv.$reset();
  }
  vendorStore.mdl_add.show();

};

const viewVendorModal = (vendor) => {
  vendorStore.selectedVendor = vendor;
  vendorStore.mdl_view.show();
};
const onclickDeleteVendor = (vendor) => {
  vendorStore.frm.business_name = vendor.business_name;
  vendorStore.selectedId = vendor.user_id;
  vendorStore.mdl_delete.show();
};


const onclickStatus = async (vendor) => {

  vendor.user.is_active = !vendor.user.is_active;
  isLoading.value = true;
  try {
    if (vendor.user.is_active) {
      await axios.put(`/api/users/enable/${vendor.user_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + authStore.token,
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.put(`/api/users/disable/${vendor.user_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + authStore.token,
          "Content-Type": "multipart/form-data",
        },
      });
    }
  } catch (error) {
    vendor.user.is_active = !vendor.user.is_active;
  } finally {
    isLoading.value = false;
  }
};

</script>
