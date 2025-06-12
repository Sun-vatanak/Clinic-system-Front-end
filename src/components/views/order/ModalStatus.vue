<template>
    <div class="modal fade" id="mdl_status" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content rounded-4">
                <div class="modal-body">
                    <div class="d-flex align-items-center flex-column">
                        <div class="box-del-icon mb-2">
                            <i class="bi bi-exclamation-triangle-fill text-danger fs-3"></i>
                        </div>
                        <h5 class="fw-semibold text-dark mt-2">ធ្វើបច្ចុប្បន្នភាពស្ថានភាពការកម្មង់</h5>
                    </div>
                    <div class="text-center m-auto subtext mt-1 px-3">
                        <span>តើអ្នក <span class="text-dark fw-bolder">{{ orderStore.selected_message }}</span> ការកម្មង់នេះមែនទេ?</span>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center gap-3 border-0">
                    <button type="button" class="btn btn-mdl btn-light fs-14 rounded-5"
                        data-bs-dismiss="modal">បោះបង់</button>
                    <button type="button" class="btn btn-danger btn-mdl rounded-5 fs-14"
                        @click="onOkay()">បាទ/យល់ព្រម</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { useOrderStore } from '@/stores/views/order_store';
import { useAuthStore } from "@/stores/views/auth/auth";
import { onMounted } from 'vue';
import { Modal } from 'bootstrap';
import axios from 'axios';
import { useRouter } from 'vue-router';


const orderStore = useOrderStore();
const authStore = useAuthStore();

onMounted(() => {
    orderStore.mdl_status = Modal.getOrCreateInstance(document.getElementById('mdl_status'))
});

const onOkay = async () => {
    orderStore.mdl_status.hide();
    let order_number = orderStore.selected_order;
    let status_id = orderStore.selected_status;
    let frmData = new FormData();
    frmData.append('status_id', status_id);
    try {
        const res = await axios.post(`/api/orders/${order_number}`, frmData, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authStore.token}`,
            }
        });
        if (res.data.result) {
            if (status_id == 4) {
                AssignDelivery();
            }
            orderStore.onloadOrder();
        }
    } catch (error) {

    }
}

const AssignDelivery = async () => {
    try {
        const res = await axios.post(`/api/delivery-find-nearest/${orderStore.selected_order}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authStore.token}`,
            }
        });
        console.log(res.data);

    } catch (error) {
        console.log(error);
    }
}


</script>