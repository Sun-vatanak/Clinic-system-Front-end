<template>
  <div
    class="modal show fade"
    id="mdl-crop"
    data-bs-backdrop="static"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modal-del m-auto rounded-4 border-0">
        <div class="modal-body">
          <div class="card border-0">
            <div class="card-body img-cropper">
              <Cropper
                :src="ProfileStore.crop.img"
                :stencil-props="{ aspectRatio: 1 }"
                @change="onChangeCrop"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between border-0">
          <button
            type="button"
            class="btn btn-outline-primary rounded-5 px-3 text-cancel fs-14"
            data-bs-dismiss="modal"
          >
            បោះបង់
          </button>
          <input
            type="file"
            @change="onSelectedImage($event)"
            class="form-control d-none"
            id="file_img"
          />
          <div class="d-flex align-items-center gap-3">
            <button
              type="button"
              class="btn btn-outline-primary rounded-5 fs-14"
              @click="chooseFileImage()"
            >
              <i class="bi bi-upload"></i> ប្ដូររូបភាព
            </button>
            <button
              type="button"
              class="btn btn-primary rounded-5 px-3 fs-14"
              @click="onSave()"
            >
              រក្សាទុក
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Modal } from "bootstrap";
import { onMounted, ref } from "vue";
import { useProfileStore } from "@/stores/views/store_profile";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import "vue-advanced-cropper/dist/theme.compact.css";
import axios from "axios";

const ProfileStore = useProfileStore();
const temp = ref(null);

onMounted(() => {
  const modalElement = document.getElementById("mdl-crop");
  if (modalElement) {
    ProfileStore.mdl_crop = Modal.getOrCreateInstance(modalElement);
  }
});

const onCropted = () => {
    temp.toBlob((bin) => {
        userStore.crop.blob = bin
        userStore.crop.avatar = URL.createObjectURL(bin)
        userStore.mdl_crop.hide()
        if(userStore.selectedId == 0){
            userStore.mdl_add.show();
        }else{
            userStore.mdl_add.show();
        }
    }, 'image/jpeg')
}

const chooseFileImage = () => {
  ProfileStore.mdl_crop.hide();
  document.getElementById("file_img").value = "";
  document.getElementById("file_img").click();
};

const onSelectedImage = (e) => {
  const file = e.currentTarget.files[0];
  ProfileStore.crop.img = URL.createObjectURL(file);
  ProfileStore.mdl_crop.show();
};

const onChangeCrop = ({ canvas }) => {
  temp.value = canvas;
};

const onSave = () => {
  if (!temp.value) return;

  temp.value.toBlob((blob) => {
    if (!blob) return;

    ProfileStore.crop.blob = blob;
    ProfileStore.crop.avatar = URL.createObjectURL(blob);
    ProfileStore.mdl_crop.hide();

    let frmData = new FormData();
    frmData.append("photo", blob);

    axios
      .post(`/api/users/profile/update?id=${ProfileStore.selectedId}`, frmData)
      .then(() => {
        ProfileStore.onloadProfile();
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  }, "image/jpeg");
};
</script>
