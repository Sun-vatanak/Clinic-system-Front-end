<template>
  <div class="row bg-white rounded-4 section-spacing pb-3">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr class="text-start">
            <th class="text-dark-emphasis " scope="col">ល.រ</th>
            <th class="text-dark-emphasis" scope="col">អ្នកដឹកជញ្ជូន</th>
            <th class="text-dark-emphasis" scope="col">ស្ថានភាព</th>
            <th class="text-dark-emphasis" scope="col">ការដឹកជញ្ជូន</th>
            <th class="text-dark-emphasis" scope="col">លេខសម្គាល់យានជំនិះ</th>
            <th class="text-dark-emphasis text-center pe-5 " scope="col">មុខងារ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="driverStore.isLoading">
            <td colspan="6" class="border-none">
              <Loading />
            </td>
          </tr>
          <tr v-if="driverStore.total_records === 0 && !driverStore.isLoading">
            <td colspan="6" class="text-center py-3">រកមិនឃើញទិន្នន័យ</td>
          </tr>
          <tr v-if="!driverStore.isLoading" v-for="(driver, i) in driverStore.driver" :key="driver.id" class="align-middle ">
            <td class="ps-3">{{ i + 1 }}</td>
            <td>
              <div class="d-flex align-items-center gap-3">
                <div class="profile_category">
                  <img :src="driver.user.profile.photo" alt="" />
                </div>
                <span>
                  {{ driver.user.profile.first_name }}
                  {{ driver.user.profile.last_name }}
                </span>
              </div>
            </td>
            <!-- <td class="fs-4 ps-4" :class="driver.is_active ? 'text-primary' : 'text-primary'">
              <i class="bi-toggle-off status-user" :class="{ 'bi-toggle-on': driver.is_active }"
                @click="onclickStatus(driver)" v-if="driver.id !== driverStore.spinnerId"
                :disabled="driverStore.isLoading"></i>
              <div class="spinner-border text-primary fs-13" style="width: 15px; height: 15px;"
                :disabled="driverStore.isLoading" role="status" v-if="driver.id === driverStore.spinnerId"></div>
            </td> -->
            <td class="fs-4" :class="driver.is_active ? 'text-primary' : 'text-primary'">
                            <i class="bi-toggle-off status-user" role="button" :class="{ 'bi-toggle-on': driver.user.is_active }, { 'disabled-class' : authStore.user.profile.id == driver.id}"
                                @click="onclickStatus(driver)">
                            </i>
                        </td>
            <td class="ps-2">{{ driver.latitude }}, {{ driver.longitude }}</td>
            <td class="ps-2">{{ driver.vin }}</td>
            <td>
              <div class="d-flex align-items-center ps-3  gap-3">
                <a role="button" class="btn-action btn-views" @click="onclickViewsUser(driver)" title="មើលលម្អិត">
                  <i class="bi bi-eye"></i>
                </a>
                <a role="button" class="btn-action btn-update" @click="onclickEditDriver(driver)" title="កែប្រែ">
                  <i class="bi bi-pencil-square"></i>
                </a>
                <a role="button" class="btn-action btn-delete" @click="onclickDeleteDriver(driver)" title="លុប">
                  <i class="bi bi-trash"></i>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!driverStore.isLoading">
      <Pagination />
    </div>
  </div>
  <ModelView ref="ModelViewRef" />
</template>
<script setup>
import { usederiverStore } from "@/stores/views/driver_store";
import Pagination from "@/components/views/driver/Pagination.vue";
import ModelView from "@/components/views/driver/ModelVeiew.vue";
import { useAuthStore } from "@/stores/views/auth/auth";
import { onMounted, ref } from "vue";
import axios from "axios";
import Loading from "../reusable/loading.vue";

const driverStore = usederiverStore();
const authStore = useAuthStore();
const ModelViewRef = ref(null);
const isLoading = ref(false);


onMounted(() => {
  driverStore.onloadDriver();
});

const onclickEditDriver = (driver) => {
  driverStore.frm = {
    user_id: "",
    latitude: "",
    longitude: "",
    vin: "",
    is_active: "1",
  };
  driverStore.selectedId = driver.id;
  driverStore.frm = {
    user_id: driver.user_id,
    
    latitude: driver.latitude,
    longitude: driver.longitude,
    vin: driver.vin,
    fname: driver.user.profile.first_name,
    lname:driver.user.profile.last_name,
    is_active: driver.is_active.toString(),
  };
  if (driverStore.vv) {
    driverStore.vv.$reset();
  }
  driverStore.mdl_edit.show();
};

const onclickDeleteDriver = (driver) => {
  driverStore.selectedId = driver.id;
  driverStore.frm.name = `${driver.user.profile.first_name} ${driver.user.profile.last_name}`;
  driverStore.mdl_delete.show();
};

const onclickViewsUser = (driver) => {
  console.log("View button clicked", driver);
  ModelViewRef.value.openUserModal(driver);
};

// const onclickStatus = async (driver) => {
//   if (!driver) return;
//   driverStore.isLoading = true;
//   driverStore.spinnerId = driver.id;
//   try {
//     const newStatus = driver.is_active === 1 ? 0 : 1;
//     const response = await axios.post(`/api/deliveries/${driver.id}`, {
//       is_active: newStatus,
//     });
//     console.log("Status updated:", response.data);
//     driver.is_active = newStatus;
//   } catch (error) {
//     console.error("Error updating status:", error.response ? error.response.data : error.message);
//   } finally {
//     driverStore.isLoading = false;
//     driverStore.spinnerId = 0;
//   }
// };
const onclickStatus = async (driver) => {
  driver.user.is_active = !driver.user.is_active;
    isLoading.value = true;

    try {
        if (driver.user.is_active) {
            await axios.put(`/api/users/enable/${driver.id}`);
        } else {
            await axios.put(`/api/users/disable/${driver.id}`);
        }
    } catch (error) {
        console.error(error);
        driver.user.is_active = !driver.user.is_active;
    } finally {
        isLoading.value = false;
    }
};
</script>