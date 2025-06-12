<template>
  <div class="modal fade" id="mdl-edit" aria-labelledby="modalTitle" aria-describedby="modalDescription"
    data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content p-3 rounded-4">
        <form @submit.prevent="onclickSaveUser">
          <div class="modal-header border-0">
            <h5 id="modalTitle" class="modal-title">
              {{ driverStore.selectedId == 0 ? "បន្ថែមអ្នកប្រើប្រាស់" : "កែប្រែអ្នកដឹកជញ្ចូន" }}
            </h5>
          </div>
          <div id="modalDescription" class="modal-body">
            <div class="d-flex flex-wrap flex-md-nowrap gap-3">
              <div class="mb-0 mb-md-3 w-100">
                <div class="input-field">
                  <select class="form-select rounded-5" disabled id="category" autocomplete="off">
                    <option value="" hidden selected>{{ driverStore.frm.fname + " " + driverStore.frm.lname }}</option>
                  </select>
                  <label for="user_id" class="form-label">អ្នកដឹកជញ្ជូន</label>
                </div>
              </div>
              <div class="mb-0 mb-md-3 w-100">
                <div class="input-field">
                  <input type="text" class="form-control rounded-5" id="vin" v-model="driverStore.frm.vin"
                    placeholder="" />
                  <label for="vin" class="form-label">លេខសម្គាល់យានជំនិះ</label>
                </div>
              </div>

            </div>
            <div class="d-flex flex-wrap flex-md-nowrap gap-3">

              <div class="mb-0 mb-md-3 w-100">
                <div class="input-field">
                  <input type="text" class="form-control rounded-5" id="latitude" v-model="driverStore.frm.latitude"
                    placeholder="" />
                  <label for="latitude" class="form-label">រយៈទទឹង</label>
                </div>
              </div>
              <div class="mb-3 w-100">
                <div class="input-field">
                  <input type="text" class="form-control rounded-5" id="longitude" v-model="driverStore.frm.longitude"
                    placeholder="" />
                  <label for="longitude" class="form-label">រយៈបណ្តោយ</label>
                </div>
              </div>
            </div>

          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-light rounded-5 btn-150 text-cancel" data-bs-dismiss="modal">
              បោះបង់
            </button>
            <button :disabled="isLoading" type="submit" class="btn btn-primary rounded-5 btn-150">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              {{ isLoading ? "កំពុងបញ្ជូន" : "បញ្ជូន" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { ref, onMounted } from "vue";
import { usederiverStore } from "@/stores/views/driver_store";
import axios from "axios";

const driverStore = usederiverStore();
const isLoading = ref(false);
onMounted(() => {
  driverStore.mdl_edit = Modal.getOrCreateInstance(document.getElementById("mdl-edit"));
});
const onclickSaveUser = async () => {
  isLoading.value = true;

  const formData = {
    latitude: parseFloat(driverStore.frm.latitude),
    longitude: parseFloat(driverStore.frm.longitude),
    vin: driverStore.frm.vin,
    is_active: driverStore.frm.is_active === "1",
  };

  try {
    if (driverStore.selectedId == 0) {
      await axios.post("/api/deliveries", formData);
    } else {
      await axios.post(`/api/deliveries/${driverStore.selectedId}`, formData);
    }
    driverStore.mdl_edit.hide();
    resetForm();
    driverStore.onloadDriver();
  } catch (error) {
    console.error("Error saving user:", error.message);
  } finally {
    isLoading.value = false;
  }
};
const resetForm = () => {
  driverStore.frm = {
    latitude: "",
    longitude: "",
    vin: "",
    is_active: "1",
  };
};
</script>