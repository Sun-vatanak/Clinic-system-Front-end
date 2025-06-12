<template>
    <div class="rounded-4 mb-3">
        <div>
            <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
                <div class="col-3 d-none d-md-block">
                    <div class="fs-5 p-0 fw-semibold">ការកម្មង់</div>
                </div>
                <div class="col-12 col-md-8 p-0 pe-3">
                    <div
                        class="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between justify-content-md-end gap-2 gap-md-3">
                        <div class="bg-white mb-3 mb-md-0 search-width search-bar d-flex align-items-center ps-2 rounded-5">
                            <input type="search" class="form-control bg-transparent border-0"
                                v-model="orderStore.querySearch" placeholder="ស្វែងរក"
                                @input="orderStore.onloadOrder()">
                            <span class="input-group-text bg-transparent border-0">
                                <i class="bi bi-search text-dark-emphasis"></i>
                            </span>
                        </div>
                        <div>
                            <select class="form-select sort-user fs-16 text-dark-emphasis search-bar border-0 rounded-5"
                                @change="orderStore.onloadOrder" v-model="orderStore.queryStatus">
                                <option value="" hidden selected>ជ្រើសរើស</option>
                                <option value="">ទាំងអស់</option>
                                <option value="1">រង់ចាំ</option>
                                <option value="2">បានទទួល</option>
                                <option value="3">កំពុងរៀបចំ</option>
                                <option value="4">ត្រៀមរួច</option>
                                <option value="5">បានលុបចោល</option>
                                <option value="6">បានបង្វិលវិញ</option>
                                <option value="7">បានបញ្ចប់</option>
                                <option value="8">បានបដិសេធ</option>
                                <option value="9">បរាជ័យក្នុងការដឹកជញ្ជូន</option>
                            </select>
                        </div>
                        <div>
                            <button class="btn btn-primary rounded-5 px-3 d-flex align-items-center"
                                @click="exportToCSV">
                                <i class="bi bi-download me-2"></i>CVS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white section-spacing rounded-4 pb-3">
                <div class="table-Order table-responsive" id="styleScoll">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th class="text-dark-emphasis ps-3 fw-bold" scope="col">លេខបញ្ជាទិញ</th>
                                <th class="text-dark-emphasis fw-bold" scope="col">អតិថិជន</th>
                                <th class="text-dark-emphasis fw-bold" scope="col">ការបរិច្ឆេទ</th>
                                <th class="text-dark-emphasis fw-bold" scope="col">តម្លៃ</th>
                                <th class="text-dark-emphasis fw-bold" scope="col">ស្ថានភាព</th>
                                <th class="text-dark-emphasis fw-bold" scope="col">មុខងារ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="orderStore.isLoading">
                                <td colspan="6" class="border-none">
                                    <Loading />
                                </td>
                            </tr>
                            <tr v-if="orderStore.total_records == 0 && !orderStore.isLoading">
                                <td colspan="6" class="text-center py-3 ps-2 border-none">រកមិនឃើញទិន្នន័យ</td>
                            </tr>
                            <tr v-for="order in orderStore.orders" v-if="!orderStore.isLoading">
                                <td class="ps-3" scope="row">#{{ order.order_number }}</td>
                                <td class="ps-2">
                                    <div class="d-flex gap-2 align-items-center">
                                        <div>
                                            <img src="@/assets/img/default-profile.png"
                                                class="rounded-circle object-fil-cover" width="42px" alt="">
                                        </div>
                                        <div>
                                            <p class="mb-0">{{ order.customer.first_name + order.customer.last_name }}
                                            </p>
                                            <p class="mb-0 text-label fs-13">{{ order.customer.email }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="ps-2">{{ order.created_at }}</td>
                                <td class="ps-2">{{ order.total_amount + '៛' }}</td>
                                <td class="ps-2">
                                    <span v-if="order.status_id == 1"
                                        class="badge bg-warning-subtle fw-medium fs-13 text-warning px-3 rounded-5">កំពុងរង់ចាំ</span>
                                    <span v-if="order.status_id == 2"
                                        class="badge bg-primary-subtle fw-medium fs-13 text-primary px-3 rounded-5">បាទទទួល</span>
                                    <span v-if="order.status_id == 3"
                                        class="badge bg-info-subtle fw-medium fs-13 text-info px-3 rounded-5">កំពុងរៀបចំ</span>
                                    <span v-if="order.status_id == 4"
                                        class="badge bg-primary-subtle fw-medium fs-13 text-primary px-3 rounded-5">ត្រៀមរួច</span>
                                    <span v-if="order.status_id == 5"
                                        class="badge bg-danger-subtle fw-medium fs-13 text-danger px-3 rounded-5">បានលុបចោល</span>
                                    <span v-if="order.status_id == 6"
                                        class="badge bg-secondary fw-medium fs-13 text-primary px-3 rounded-5">បានបង្វិលវិញ</span>
                                    <span v-if="order.status_id == 7"
                                        class="badge bg-primary-subtle fw-medium fs-13 text-primary px-3 rounded-5">បានបញ្ចប់</span>
                                    <span v-if="order.status_id == 8"
                                        class="badge bg-danger-subtle fw-medium fs-13 text-danger px-3 rounded-5">បានបដិសេធ</span>
                                    <span v-if="order.status_id == 9"
                                        class="badge bg-danger-subtle fw-medium fs-13 text-danger px-3 rounded-5">បរាជ័យក្នុងការដឹកជញ្ជូន</span>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center gap-3 pe-lg-0 px-3">
                                        <a role="button" class="btn-action btn-views" @click="onviewOrder(order)" title="មើលលម្អិត">
                                            <i class="bi bi-eye"></i>
                                        </a>
                                        <a role="button" v-if="[1].includes(order.status_id)"
                                            @click="onupdateStatus(order.order_number, 2, 'ប្រាកដជាទទួល')"
                                            class="btn-approve btn-action" title="ទទួល">
                                            <i class="bi bi-check-circle"></i>
                                        </a>
                                        <a role="button" v-if="[1].includes(order.status_id)"
                                            @click="onupdateStatus(order.order_number, 8, 'ប្រាកដជាចង់បដិសេដ')" class="btn-reject btn-action"
                                            title="បដិសេដ">
                                            <i class="bi bi-x-circle"></i>
                                        </a>
                                        <a role="button" v-if="[2].includes(order.status_id)"
                                            @click="onupdateStatus(order.order_number, 3, 'នឹងកំពុងរៀបចំ')"
                                            class="btn-preparing btn-action" title="កំពុងរៀបចំ">
                                            <i class="bi bi-hourglass-split"></i>
                                        </a>
                                        <a role="button" v-if="[2, 3].includes(order.status_id)" @click="onupdateStatus(order.order_number, 4, 'បានត្រៀមរួចក្នុងការការដឹកជញ្ជូន')"
                                            class="btn-vendor btn-action" title="ត្រៀមរួច">
                                            <i class="bi bi-truck"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class=" px-3 pt-1" v-if="!orderStore.isLoading">
                    <Pagination />
                </div>
            </div>
        </div>
    </div>
    <ModalDelete />
    <ModalStatus />
</template>
<script setup>
import { useOrderStore } from '@/stores/views/order_store';
import ModalDelete from '@/components/views/order/ModalDelete.vue';
import ModalStatus from '@/components/views/order/ModalStatus.vue';
import { useAuthStore } from '@/stores/views/auth/auth'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import Pagination from "@/components/views/order/Pagination.vue";
import Loading from "@/components/views/reusable/loading.vue";
import axios from 'axios';

const route = useRouter();
const orderStore = useOrderStore();
const authStore = useAuthStore();
onMounted(() => {
    orderStore.onloadOrder();
});

const onviewOrder = async (getOrder) => {
    orderStore.order_id = getOrder.id;
    try {
        const res = await axios.get(`/api/orders/${getOrder.order_number}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authStore.token}`,
            }
        })
        orderStore.order_detail = res.data.data
        orderStore.data.id_order = res.data.data.order_number,
        sessionStorage.setItem('order_number', orderStore.data.id_order)
        orderStore.data.id_customer = res.data.data.customer.id
        orderStore.data.total_price = res.data.data.items.map(item => item.total_price);
        orderStore.data.total_price = orderStore.data.total_price.reduce((sum, price) => sum + price, 0);
        orderStore.data.total_amount = res.data.data.total_amount
        orderStore.data.dilevery_fee = res.data.data.dilevery_fee
        orderStore.data.discount = res.data.data.items.map(item => item.product.discount);
        orderStore.data.discount = orderStore.data.discount.reduce((sum, discount) => sum + discount, 0);
        orderStore.data.invioce = res.data.data.recipe;

        sessionStorage.setItem('order_detail', JSON.stringify(res.data.data));
        sessionStorage.setItem('id_customer', res.data.data.customer.id);
        sessionStorage.setItem('total_price', orderStore.data.total_price);
        sessionStorage.setItem('total_amount', orderStore.data.total_amount);
        sessionStorage.setItem('dilevery_fee', orderStore.data.dilevery_fee);
        sessionStorage.setItem('discount', orderStore.data.discount);
        sessionStorage.setItem('id_order', res.data.data.order_number);
        sessionStorage.setItem('id_status', res.data.data.status_id);
        sessionStorage.setItem('invoice',res.data.data.recipe);
        orderStore.data.id_statu = sessionStorage.getItem('id_status')

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
    route.push('/order-detail');
}

const onupdateStatus = async (getNumOrder, id_status, message) => {
    orderStore.selected_status = id_status;
    orderStore.selected_order = getNumOrder;
    orderStore.selected_message = message;
    orderStore.mdl_status.show();
}

const exportToCSV = async () => {
    try {
        const response = await axios.get(`/api/vendor-orders?all=true&status_id=${orderStore.queryStatus}`);
        if (response.data.result) {
            const allData = response.data.data;
            const headers = ['លេខកម្មង់', 'អតិថិជន', 'អ៊ីម៉ែល', 'ចំនួនសរុប', 'ស្ថានភាព', 'កាលបរិច្ឆេទ'];
            const data = allData.map(item => [
                `"#${item.order_number || 'N/A'}"`,
                `"${item.customer?.first_name || 'N/A'}  ${item.customer?.last_name || 'N/A'}"`,
                `"${item.customer?.email || 'N/A'}"`,
                `"${item.total_amount || 'N/A'}"`,
                `"${item.status || 'N/A'}"`,
                `"${item.created_at || 'N/A'}"`,
            ]);
            const BOM = "\uFEFF";
            const csvContent = BOM + [
                headers.join(','),
                ...data.map(row => row.join(','))
            ].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'order.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Failed to fetch orders.");
        }
    } catch (error) {
        console.error("Error exporting orders:", error);
    }
};
</script>
