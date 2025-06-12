<template>
  <div
    class="modal show fade"
    id="mdl-crop"
    data-bs-backdrop="static"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modal-del m-auto border-0">
        <div class="modal-body">
          <div class="card border-0">
             <div class="card-body img-cropper">
              <Cropper
              :src="subcategoryStore.crop.img"
              :stencil-props="{
                aspectRatio: 1,
              }"
              @change="onChangeCrop"
            ></Cropper>
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
              @click="onCropted()"
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
import { onMounted } from "vue";
import { useSubcategoryStore } from "@/stores/views/subcategory_store";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import "vue-advanced-cropper/dist/theme.compact.css";

const subcategoryStore = useSubcategoryStore();
let temp = null;

onMounted(() => {
  subcategoryStore.mdl_crop = Modal.getOrCreateInstance(
    document.getElementById("mdl-crop")
  );
});

const chooseFileImage = () => {
  subcategoryStore.mdl_crop.hide();
  document.getElementById("file_img").value = "";
  document.getElementById("file_img").click();
};

const onSelectedImage = (e) => {
  if (e.currentTarget.files.length == 0) {
    return;
  }
  const file = e.currentTarget.files[0];
  marketStore.crop.img = URL.createObjectURL(file);
  marketStore.mdl_crop.show();
};

const onChangeCrop = ({ canvas }) => {
  temp = canvas;
};

const onCropted = () => {
  temp.toBlob((bin) => {
    subcategoryStore.crop.blob = bin;
    subcategoryStore.crop.avatar = URL.createObjectURL(bin);
    subcategoryStore.mdl_crop.hide();
    subcategoryStore.mdl_add.show();
  }, "image/jpeg");
};
</script>
