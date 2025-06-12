<template>
  <div
    class="modal fade"
    id="mdl-Confirm-delivery"
    tabindex="-1"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content p-2 rounded-4">
        <div class="modal-body d-flex flex-column gap-3 align-items-center">
          <div class="">
            <span class="fs-1 text-primary"><i class="bi bi-patch-check-fill"></i></span>
          </div>
          <div>
            <h1 class="fs-5 fw-semibold mb-2 text-center">ជោគជ័យ</h1>
            <p class="mb-0 fs-6 text-center text-form">
              ពាក្យសម្ងាត់បស់អ្នក​ <br />
              កែប្រែបានជោគជ័យ
            </p>
          </div>
        </div>
        <div
          class="modal-footer border-0 d-flex justify-content-between flex-nowrap gap-2"
        >
          <button
            type="button"
            class="btn btn-cancle rounded-5 w-50"
            data-bs-dismiss="modal"
          >
            បោះបង់
          </button>
          <button
            type="button"
            class="btn btn-primary rounded-5 w-50"
            @click="onclickclose()"
          >
            យល់ព្រម់
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { onMounted } from "vue";
import { useProfileStore } from "@/stores/views/store_profile";
const ProfileStore = useProfileStore();

onMounted(() => {
   ProfileStore.mdl_cf = Modal.getOrCreateInstance(
    document.getElementById("mdl-Confirm-delivery")
  );
});
function onclickclose() {
 ProfileStore.mdl_cf.hide();
}

</script>
