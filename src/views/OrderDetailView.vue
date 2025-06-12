<template>
    <div class="mt-4">
        <div class="row g-4">
            <div class="col-12 col-lg-8">
                <div class="p-3 bg-white rounded-4">
                    <p class="mb-0 text-black fw-bold">តារាងការបញ្ជាទិញ</p>
                    <div class="table-Order table-responsive fs-16" id="styleScoll">
                        <table class="table align-middle">
                            <thead>
                                <tr>
                                    <th class="ps-0" scope="col">ផលិតផល</th>
                                    <th scope="col">ប្រភេទផលិតផល</th>
                                    <th scope="col">ចំនួន</th>
                                    <th scope="col">តម្លៃ</th>
                                    <th scope="col">សរុប</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orderStore.order_detail.items">
                                    <td class="" scope="row">
                                        <div class="d-flex gap-2 align-items-center">
                                            <div>
                                                <img :src="order.product.image" class="object-fil-cover" width="60px"
                                                    alt="">
                                            </div>
                                            <div>
                                                <p class="mb-0">{{ order.product.name }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="ps-2">
                                        {{ order.product.subcategory }}
                                    </td>
                                    <td class="ps-2">{{ order.quantity }}</td>
                                    <td class="ps-2">{{ order.unit_price + '៛' }}</td>
                                    <td class="ps-2">{{ order.total_price + '៛' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg-6 p-3 pe-5 bg-white rounded-4">
                            <p class="text-black fw-bold mb-3">សង្ខេបការទិញរបស់អតិថិជន</p>
                            <div class="d-flex justify-content-between">
                                <p class="mb-1 text-dark">តម្លៃផលិតផល</p>
                                <p class="mb-1 text-black">{{ orderStore.data.total_price ? orderStore.data.total_price
                                    +
                                    '៛' :
                                    0 + '៛' }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-1 text-dark">វិធីបង់ប្រាក់</p>
                                <p class="mb-1 text-black">
                                    <span v-if="orderStore.order_detail.payment_method_id == 1">
                                        បង់តាមអ្នកដឹកជញ្ជូន
                                    </span>
                                    <span v-else @click="onInvoice()"
                                        class="text-primary cursor-pointer text-decoration-underline">
                                        KHQR
                                    </span>
                                </p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-1 text-dark">បញ្ចុះតម្លៃ</p>
                                <p class="mb-1 text-black">{{ (orderStore.data.discount / 100) *
                                    orderStore.data.total_price
                                    +
                                    '៛' }}
                                </p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-1 text-dark">ថ្លៃដឹកជញ្ជូន</p>
                                <p class="mb-1 text-black">{{ orderStore.data.dilevery_fee + '៛' }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-0 text-black fw-bold">សរុប</p>
                                <p class="mb-0 text-primary fw-bold">{{ (orderStore.order_detail.total_amount +
                                    orderStore.order_detail.dilevery_fee) + '៛' }}</p>
                            </div>
                            <!-- <button type="button" class="btn btn-primary rounded-5 px-3 py-1 text-center"
                                @click="onInvoice()">
                                <span>វិក័យប័ត្រ</span>
                            </button> -->
                        </div>
                        <div class="col-12 col-lg-6 p-3 ps-5 bg-white rounded-4">
                            <p class="text-black fw-bold mb-3">ព័ត៌មានរបស់អតិថិជន</p>
                            <div class="d-flex justify-content-between">
                                <p class="mb-1 text-dark">ឈ្មោះ</p>
                                <p class="mb-1 text-black">{{ orderStore.order_detail.customer.first_name + " " +
                                    orderStore.order_detail.customer.last_name }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-1 text-dark">លេខទំនាក់ទំនង</p>
                                <p class="mb-1 text-black">{{ orderStore.order_detail.customer.phone }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-1 text-dark">មតិ</p>
                                <p class="mb-1 text-black">{{orderStore.order_detail.customer.additional_info === null ? 'មិនមាន':orderStore.order_detail.customer.additional_info}}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-1 text-dark me-2">ទីតាំង</p>
                                <p class="mb-1 text-black">{{ orderStore.order_detail.customer.address }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4">
                <ul class="list-unstyled bg-white rounded-4">
                    <li class="p-3">
                        <p class="text-black fw-bold mb-0">ទំនាក់ទំនង</p>
                        <p class="text-label fw-medium fs-13 mb-2">
                            ធ្វើការផ្ញើសារទៅកាន់អតិថិជន {{ orderStore.data.id_statu == 4 ? "ឬ អ្នកដឹកជញ្ជូន" : "" }}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex gap-3 align-items-center">
                                <div>
                                    <img src="@/assets/img/default-profile.png" class="rounded-circle object-fit-cover"
                                        width="50px" alt="" />
                                </div>
                                <div>
                                    <h6 class="fw-medium mb-1">
                                        <span class="fw-bold fs-5 text-label">. </span>
                                        <span class="fs-13 text-primary">អតិថិជន</span>
                                    </h6>
                                    <p class="text-label mb-0 fs-13">
                                        ទំនាក់ទំនងជាមួយអតិថិជន
                                        <span class="text-dark fw-medium ms-2"></span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button @click="openModalChat(orderStore.order_detail.customer.id)"
                                    :disabled="!([1, 2, 3, 4].includes(Number(orderStore.data.id_statu)))" type="button"
                                    class="btn bg-secondary text-primary border-0 fw-medium btn-message px-3 py-1 rounded-4">
                                    ផ្ញើរសារ
                                </button>
                            </div>
                        </div>
                        <div class="text-label">
                            <hr />
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex gap-3 align-items-center">
                                <div>
                                    <img src="@/assets/img/default-profile.png" class="rounded-circle object-fit-cover"
                                        width="50px" alt="" />
                                </div>
                                <div>
                                    <h6 class="fw-medium mb-1">
                                        <span class="fw-bold fs-5 text-label">. </span>
                                        <span class="fs-13 text-primary">អ្នកដឹកជញ្ជូន</span>
                                    </h6>
                                    <p class="text-label mb-0 fs-13">
                                        ទំនាក់ទំនងជាមួយអ្នកដឹកជញ្ជូន
                                        <span class="text-dark fw-medium ms-2"></span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button @click="openModalChat(orderStore.order_detail?.delivery?.user_id)"
                                    :disabled="!([4].includes(Number(orderStore.data.id_statu)))" type="button"
                                    class="btn bg-secondary text-primary border-0 fw-medium btn-message px-3 py-1 rounded-4">
                                    ផ្ញើរសារ
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <ModalDelete />
    <ModalInvoice />
    <Chat />
    <ErrorImage />
    <ViewImage />
</template>
<script setup>
import Chat from "@/components/views/chats/Chat.vue";
import ErrorImage from "@/components/views/chats/ErrorImage.vue";
import ViewImage from "@/components/views/chats/ViewImage.vue";
import ModalInvoice from "@/components/views/order/ModalInvoice.vue";
import { useRouter } from 'vue-router';
import { useMessageStore } from "@/stores/views/message_store";
import { useOrderStore } from '@/stores/views/order_store';
import { onMounted, computed } from 'vue';
import axios from 'axios';

const messageStore = useMessageStore();
const router = useRouter();
const orderStore = useOrderStore();

onMounted(() => {
    orderStore.onloadOrder();
})


const onInvoice = () => {
    orderStore.mdl_invoice.show();
}

const openModalChat = (id) => {
    messageStore.mdl_chat.show();
    messageStore.startConversation(id);
};
</script>
