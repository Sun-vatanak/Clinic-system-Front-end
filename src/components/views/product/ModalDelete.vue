<template>
    <div class="modal fade" id="mdl-del" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content rounded-4">
                <div class="modal-body">
                    <div class="d-flex align-items-center flex-column">
                        <div class="box-del-icon mb-2">
                            <i class="bi bi-exclamation-triangle-fill text-danger fs-3"></i>
                        </div>
                        <h5 class="fw-semibold text-dark mt-2">លុបផលិតផល</h5>
                    </div>
                    <div class="text-center m-auto subtext mt-1 px-3">
                        <span>ផលិតផលដែលមានឈ្មោះ "<span class="fw-semibold text-dark">{{ productStore.frm.name }}</span>" និងត្រូវចេញពីប្រព័ន្ទ!</span>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center border-0">
                    <button type="button" class="btn btn-mdl btn-light fs-14 rounded-5" data-bs-dismiss="modal">ទេ, រក្សាទុក</button>
                    <button type="button" class="btn btn-danger btn-mdl rounded-5 fs-14" @click="onclickDelete()" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        {{ isLoading ? "កំពុងលុប" : "បាទ/ចាស់, លុប" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Modal } from 'bootstrap';
import { onMounted,ref} from 'vue';
import axios from 'axios';
import { useProductStore } from '@/stores/views/product_store';

const productStore = useProductStore();
const isLoading = ref(false);

onMounted(() => {
    productStore.mdl_delete = Modal.getOrCreateInstance(document.getElementById('mdl-del'));
});

const onclickDelete = async () => {
    isLoading.value = true;
    try {
        await axios.delete(`/api/products/${productStore.selectedId}`);
        productStore.onloadProduct();
        productStore.mdl_delete.hide();
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>
