<template>
  <div
    class="modal fade"
    id="mdl_delete"
    tabindex="-1"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content p-2 rounded-4">
        <div class="modal-body d-flex flex-column gap-3 align-items-center">
          <div class="">
            <span class="fs-1 text-danger"
              ><i class="bi bi-exclamation-triangle-fill"></i
            ></span>
          </div>
          <div>
            <h1 class="fs-5 fw-semibold mb-2 text-center">លុបផលិតផល</h1>
            <p class="mb-0 fs-6 text-center text-form">
              តើ​អ្នកប្រាកដទេថា​ចង់​លុបរូប​ <br />
              គណនីរបស់អ្នក
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
            class="btn btn-danger rounded-5 w-50"
            @click="onclickOk()"
          >
            លុប
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { onMounted } from "vue";
//   import ImageDelete from '@/assets/images/pngs/delete_image.png';
import { useProfileStore } from "@/stores/views/store_profile";
const ProfileStore = useProfileStore();

onMounted(() => {
  ProfileStore.mdl_delete = Modal.getOrCreateInstance(
    document.getElementById("mdl_delete"),
    {
      keyboard: false,
    }
  );
});

const onclickOk = () => {
  ProfileStore.crop.avatar = null;
  ProfileStore.mdl_delete.hide();
};
</script>
