<template>
    <!-- modal -->
    <div class="modal show fade" id="mdl-crop" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content modal-del m-auto border-0">
                <div class="modal-body ">
                    <div class="card border-0">

                        <div class="card-body img-cropper">
                              <Cropper :src="marketStore.crop.img" :stencil-props="{
                            aspectRatio: 1
                        }" @change="onChangeCrop"></Cropper>
                        </div>
                      
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between border-0">
                    <button type="button" class="btn btn-outline-primary rounded-5 px-3 text-cancel fs-14"
                        data-bs-dismiss="modal">បោះបង់</button>
                    <input type="file" @change="onSelectedImageCrop($event)" class="form-control d-none" id="file_img_crop" accept="image/jpeg, image/png, image/gif">
                    <div class="d-flex align-items-center gap-3">
                        <button type="button" class="btn btn-outline-primary rounded-5 fs-14"
                            @click="chooseFileImage()">
                            <i class="bi bi-upload"></i> ប្ដូររូបភាព
                        </button>
                        <button type="button" class="btn btn-primary rounded-5 px-3 fs-14"
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
import { useMarketStore } from '@/stores/views/market_store.js';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.compact.css';

const marketStore = useMarketStore();
let temp = null;

onMounted(() => {
    marketStore.mdl_crop = Modal.getOrCreateInstance(document.getElementById('mdl-crop'));
});

const chooseFileImage = () => {
    document.getElementById('file_img_crop').click();
    document.getElementById('file_img_crop').value = '';
    marketStore.mdl_crop.hide();
}


const onChangeCrop = ({ coordinates, canvas  }) => {
    temp = canvas
}
const onSelectedImageCrop = (e) => {
    if (e.currentTarget.files.length === 0) {
        return;
    }

    const file = e.currentTarget.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 1 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        marketStore.error_message = 'អ្នកអាចប្រើរូបភាពប្រភេទ JPEG, PNG និង GIF'
        marketStore.mdl_crop.hide();
        marketStore.modalErrorTypeImage.show();
        return;
    }
    
    if (file.size > maxSize) {
        marketStore.error_message = 'ទំហំរូបភាពមិនត្រូវលើស 1MB';
        marketStore.mdl_crop.hide();
        marketStore.modalErrorTypeImage.show();
        return;
    }

    marketStore.frm.is_remove = 0;
    marketStore.crop.img = URL.createObjectURL(file);
    marketStore.mdl_crop.show();
}

const onCropted = () => {
    temp.toBlob((bin) => {
        marketStore.crop.blob = bin
        marketStore.crop.avatar = URL.createObjectURL(bin)
        marketStore.mdl_crop.hide();
        marketStore.mdl_add.show();
    }, 'image/jpeg')
}


</script>
