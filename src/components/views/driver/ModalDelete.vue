<template>
  <div class="modal fade delete-confirmation" id="mdl-del" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content rounded-4 p-2">
        <div class="modal-body d-flex flex-column align-items-center gap-3">
          <div class="close-btn">
            <i class="bi bi-exclamation-triangle-fill fs-4 text-danger"></i>
          </div>
          <div>
            <p class="mb-0 text-center fs-4 fw-semibold mb-1">លុបអ្នកដឹកជញ្ជូន</p>
            <p class="mb-0 text-center fs-6 text-form">
              អ្នកនឹងលុប <span class="text-black">{{ driverStore.frm.name }}</span> ចេញពីប្រព័ន្ធ។ តើអ្នកប្រាកដទេ?
            </p>
          </div>
          <div class="w-100 d-flex justify-content-center gap-2">
            <button
              type="button"
              class="btn btn-mdl btn-light fs-14 rounded-5"
              data-bs-dismiss="modal"
              :disabled="isLoading"
            >
              ទេ, រក្សាទុក
            </button>
            <button
              type="button"
              class="btn btn-danger btn-mdl rounded-5 fs-14"
              @click="onclickDelete"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              {{ isLoading ? "កំពុងលុប" : "បាទ/ចាស់, លុប" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import { usederiverStore } from "@/stores/views/driver_store";
import axios from "axios";

const driverStore = usederiverStore();
const isLoading = ref(false);

onMounted(() => {
  driverStore.mdl_delete = new Modal(document.getElementById("mdl-del"));
});

const onclickDelete = async () => {
  isLoading.value = true;
  try {
    const response = await axios.delete(`/api/deliveries/${driverStore.selectedId}`);
    console.log("Delivery deleted:", response.data);
    driverStore.onloadDriver(); 
  } catch (error) {
    console.error("Error deleting delivery:", error.response ? error.response.data : error.message);
  } finally {
    isLoading.value = false;
    driverStore.mdl_delete.hide();
  }
};
</script>