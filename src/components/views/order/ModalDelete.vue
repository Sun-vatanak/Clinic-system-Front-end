<template>
    <div class="modal fade" id="mdl_delete" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content rounded-4">
                <div class="modal-body">
                    <div class="d-flex align-items-center flex-column">
                        <div class="box-del-icon mb-2">
                            <i class="bi bi-exclamation-triangle-fill text-danger fs-3"></i>
                        </div>
                        <h5 class="fw-semibold text-dark mt-2">បញ្ជាក់ការបដិសេធ</h5>
                    </div>
                    <div class="text-center m-auto subtext mt-1 px-3">
                        <span> តើអ្នកប្រាកដទេថាចង់បដិសេធការទិញរបស់អតិថិជន?</span>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center border-0">
                    <button type="button" class="btn btn-mdl btn-light fs-14 rounded-5" data-bs-dismiss="modal">បោះបង់</button>
                    <button type="button" class="btn btn-danger btn-mdl rounded-5 fs-14" @click="onclickDelete(8)">បាទ/បដិសេធ</button>
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

const router = useRouter();
const orderStore = useOrderStore();
const authStore = useAuthStore();
onMounted(() => {
    orderStore.mdl_delete = Modal.getOrCreateInstance(document.getElementById('mdl_delete'))
});
const onclickDelete = async (status_id) => {
    let frmData = new FormData();
    let idOrder = status_id
    frmData.append('status_id',idOrder)
    try {
        const res = await axios.post(`/api/orders/${orderStore.data.id_order}`,frmData, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authStore.token}`,
            }
        });
        if (res.data.result) {
            orderStore.onloadOrder();
            orderStore.mdl_delete.hide();
            router.push('/order');
        }
    } catch (error) {
        console.error("Error fetching order details:", error);
            if (error.response) {
                console.error("Response Data:", error.response.data);
                console.error("Status Code:", error.response.status);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
    }
}

</script>