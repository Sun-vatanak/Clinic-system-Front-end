<template>
    <div class="modal fade modal-view-image" id="modal-view-image-chat" data-bs-backdrop="static">
        <div class="modal-top border-0 d-flex justify-content-end w-100">
            <button type="button" class="btn border-0 text-white fs-4" @click="closeBtn">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
        <div class="modal-dialog">
            <div class="modal-content rounded-5 p-0">
                <div class="modal-body d-flex justify-content-center p-0">
                    <div class="modal-image" ref="imageContainer">
                        <img :src="messageStore.selected_image" alt="Preview Image" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { useMessageStore } from '@/stores/views/message_store';
import { Modal } from 'bootstrap';
import html2canvas from 'html2canvas';

const messageStore = useMessageStore();
const imageContainer = ref(null);

onMounted(() => {
    messageStore.mdl_view_image = Modal.getOrCreateInstance(document.getElementById('modal-view-image-chat'), {
        keyboard: false,
    });
});

const downloadImage = () => {
    const imageUrl = messageStore.selected_image;
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "downloaded-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};




const closeBtn = () => {
    messageStore.mdl_view_image.hide();
    messageStore.mdl_chat.show();
};
</script>


<style scoped>
.modal-view-image .modal-image {
    width: 600px;
    height: 440px;
    border-radius: 24px;
    overflow: hidden;
}

.modal-view-image .modal-image img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
}
</style>