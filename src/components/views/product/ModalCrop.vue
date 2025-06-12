<template>
    <div class="modal show fade" id="mdl-crop" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content modal-del m-auto rounded-4 border-0 pb-3">
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body img-cropper pb-0">
                            <Cropper :src="productStore.crop.img" :stencil-props="{
                            aspectRatio: 1
                        }" @change="onChangeCrop"></Cropper>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center border-0 gap-3 pb-2">
                    <button type="button" class="btn btn-outline-primary rounded-5 px-4 text-cancel fs-14"
                            data-bs-dismiss="modal">បោះបង់</button>
                    <input type="file" @change="onSelectedImage($event)" class="form-control d-none"
                    id="file_img">
                    <div class="d-flex align-items-center gap-3">
                        <button type="button" class="btn btn-outline-primary rounded-5 fs-14 px-4" @click="chooseFileImage()">
                        <i class="bi bi-upload"></i> ប្ដូររូបភាព
                    </button>
                        <button type="button" class="btn btn-primary rounded-5 px-4 fs-14" @click="onCropted()">រក្សាទុក</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Modal } from 'bootstrap';
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/views/product_store';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.compact.css';

const productStore = useProductStore();
let temp = null

onMounted(() => {
    productStore.mdl_crop = Modal.getOrCreateInstance(document.getElementById('mdl-crop'));
});

const chooseFileImage = () => {
    document.getElementById('file_img').value = ''
    document.getElementById('file_img').click();
    productStore.mdl_crop.hide();
}

const onSelectedImage = (e) => {
    
    if (e.currentTarget.files.length === 0) {
        return;
    }

    const file = e.currentTarget.files[0];
    const maxSize = 1 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
        productStore.error_Message = 'អ្នកអាចប្រើរូបភាពប្រភេទ JPEG, PNG និង GIF';
        productStore.mdl_errorTypeImage.show();
        productStore.mdl_crop.hide();
        return;
    }

    if (file.size > maxSize) {
        productStore.error_Message = 'ទំហំរូបភាពមិនត្រូវលើស 1MB';
        productStore.mdl_errorTypeImage.show();
        productStore.mdl_crop.hide();
        return;
    }

    productStore.crop.img = URL.createObjectURL(file)
    productStore.mdl_add.show();
    productStore.frm.is_remove = 0;

}

const onChangeCrop = ({ canvas }) => {
    temp = canvas
}

const onCropted = () => {
    temp.toBlob((bin) => {
        productStore.crop.blob = bin
        productStore.crop.avatar = URL.createObjectURL(bin)
        productStore.mdl_crop.hide()
        productStore.mdl_add.show();
    }, 'image/jpeg')
}


</script>
