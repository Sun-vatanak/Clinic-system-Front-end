<template>
    <div class="modal fade delete-confirmation" id="modal-error-type-image" tabindex="-1">
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content rounded-4 p-2">
                <div class="modal-body d-flex flex-column align-items-center gap-3">
                    <div class="close-btn">
                        <i class="bi bi-exclamation-circle fs-4 mt-1"></i>
                    </div>
                    <div>
                        <p class="mb-0 text-center fs-4  fw-semibold">បញ្ហា</p>
                        <p class="mb-0 text-center  fs-6 text-form">{{ categoryStore.error_message }}</p>
                    </div>
                    <div class="w-100">
                        <button type="button" class="btn btn-danger w-100 rounded-5 fs-6" @click="closeModal()">
                            យល់ព្រម
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/views/category_store';
import { Modal } from 'bootstrap';
const categoryStore = useCategoryStore();

onMounted(() => {
    categoryStore.modalErrorTypeImage = Modal.getOrCreateInstance(document.getElementById('modal-error-type-image'), {
        keyboard: false,
        backdrop: 'static',
    });
});

const closeModal = () => {
    categoryStore.modalErrorTypeImage.hide();
    categoryStore.mdl_crop.hide();
    categoryStore.mdl_add.show();
}

</script>
