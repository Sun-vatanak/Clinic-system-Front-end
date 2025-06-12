<template>
    <!-- modal -->
    <div class="modal show fade" id="mdl-crop" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog withModal modal-dialog-centered">
            <div class="modal-content modal-del  m-auto border-0 rounded-4 pb-3">
                <div class="modal-body pb-3">
                    <div class="card border-0">
                      <div class="card-body img-cropper pb-0">
                        <Cropper :src="categoryStore.crop.img" :stencil-props="{
                            aspectRatio: 1
                        }" @change="onChangeCrop"></Cropper>
                      </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between border-0 gap-3 pb-2">
                    <button type="button" class="btn btn-outline-primary rounded-5 px-4 text-cancel fs-14"
                        data-bs-dismiss="modal">បោះបង់</button>
                    <input type="file" @change="onSelectedImageCrop($event)" class="form-control d-none" id="file_img_crop" accept="image/jpeg, image/png, image/gif">
                    <div class="d-flex align-items-center gap-4">
                        <button type="button" class="btn btn-outline-primary rounded-5 fs-14 px-4"
                            @click="chooseFileImage()">
                            <i class="bi bi-upload"></i> ប្ដូររូបភាព
                        </button>
                        <button type="button" class="btn btn-primary rounded-5 px-4 fs-14"
                            @click="onCropted()">រក្សាទុក</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Modal } from 'bootstrap';
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/views/category_store';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.compact.css';

const categoryStore = useCategoryStore();
let temp = null

onMounted(() => {
    categoryStore.mdl_crop = Modal.getOrCreateInstance(document.getElementById('mdl-crop'));
});

const chooseFileImage = () => {
    categoryStore.mdl_crop.hide();
    document.getElementById('file_img_crop').value = '';
    document.getElementById('file_img_crop').click();
}

const onSelectedImageCrop = (e) => {
    if (e.currentTarget.files.length === 0) {
        return;
    }

    const file = e.currentTarget.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 1 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        categoryStore.error_message = 'អ្នកអាចប្រើរូបភាពប្រភេទ JPEG, PNG និង GIF'
        categoryStore.mdl_crop.hide();
        categoryStore.modalErrorTypeImage.show();
        return;
    }
    
    if (file.size > maxSize) {
        categoryStore.error_message = 'ទំហំរូបភាពមិនត្រូវលើស 1MB';
        categoryStore.mdl_crop.hide();
        categoryStore.modalErrorTypeImage.show();
        return;
    }

    categoryStore.frm.is_remove = 0;
    categoryStore.crop.img = URL.createObjectURL(file);
    categoryStore.mdl_crop.show();
}

const onChangeCrop = ({ canvas }) => {
    temp = canvas
}

const onCropted = () => {
    temp.toBlob((bin) => {
        categoryStore.crop.blob = bin
        categoryStore.crop.avatar = URL.createObjectURL(bin)
        categoryStore.mdl_crop.hide();
        categoryStore.mdl_add.show();
    }, 'image/jpeg')
}


</script>


