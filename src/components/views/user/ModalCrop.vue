<template>
    <div class="modal show fade" id="mdl-crop" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content modal-del m-auto rounded-4 border-0 pb-3">
                <div class="modal-body pb-3">
                    <div class="card border-0">
                      <div class="card-body img-cropper pb-0">
                        <Cropper :src="userStore.crop.img" :stencil-props="{
                            aspectRatio: 1
                        }" @change="onChangeCrop"></Cropper>
                      </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center border-0 gap-3 pb-2">
                    <button type="button" class="btn btn-outline-primary rounded-5 px-4 text-cancel fs-14" @click = "cencel()"
                            data-bs-dismiss="modal">បោះបង់</button>
                    <input type="file" @change="onSelectedImage($event)" class="form-control d-none"
                    id="file_img">
                    <div class="d-flex align-items-center gap-4">
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
import { useUserStore } from '@/stores/views/user_store';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.compact.css';

const userStore = useUserStore();
let temp = null

onMounted(() => {
    userStore.mdl_crop = Modal.getOrCreateInstance(document.getElementById('mdl-crop'));
});

const chooseFileImage = () => {
    userStore.mdl_crop.hide();
    document.getElementById('file_img').value = ''
    document.getElementById('file_img').click();
}

const onSelectedImage = (e) => {
    if (e.currentTarget.files.length == 0) {
        return
    }
    const file = e.currentTarget.files[0];
    marketStore.crop.img = URL.createObjectURL(file)
    marketStore.mdl_crop.show();
}

const onChangeCrop = ({ coordinates, canvas }) => {
    temp = canvas
}

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

const cencel = () => {
    userStore.mdl_crop.hide()
    userStore.mdl_add.show()
}


</script>
