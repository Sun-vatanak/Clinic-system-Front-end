<template>
    <div class="modal fade" id="mdl_invoice" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        data-bs-target="#staticBackdrop">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header border-0 d-flex align-items-center justify-content-between">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">វិក័យប័ត្រ</h1>
                    <a role="button" class="btn-exit bg-light" data-bs-dismiss="modal" aria-label="Close">
                        <i class="bi bi-x fs-4 text-primary"></i>
                    </a>
                </div>
                <div class="modal-body">
                    <img :src="orderStore.order_detail.recipe" class=" object-fit-cover w-100 h-100" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Modal } from 'bootstrap';
import { onMounted } from 'vue';
import { useOrderStore } from '@/stores/views/order_store';

const orderStore = useOrderStore();
onMounted(() => {
    orderStore.mdl_invoice = Modal.getOrCreateInstance(document.getElementById('mdl_invoice'))
})
</script>