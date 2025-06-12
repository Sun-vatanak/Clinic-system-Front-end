<template>
    <div class="row bg-white section-spacing rounded-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-dark-emphasis">ល.រ</th>
                        <th class="text-dark-emphasis">លេខកម្មង់</th>
                        <th class="text-dark-emphasis">អតិថិជន</th>
                        <th class="text-dark-emphasis">ចំនួនសរុប</th>
                        <th class="text-dark-emphasis">ស្ថានភាព</th>
                        <th class="text-dark-emphasis">កាលបរិច្ឆេទ</th>
                        <th class="text-dark-emphasis">មុខងារ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="useOrderAdmin.isLoading">
                        <td colspan="7" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="useOrderAdmin.total_records == 0 && !useOrderAdmin.isLoading">
                        <td colspan="7" class="text-center py-3">
                            រកមិនឃើញទិន្នន័យ
                        </td>
                    </tr>
                    <tr v-if="!useOrderAdmin.isLoading" v-for="(orderAdmin, i) in useOrderAdmin.orderAdmins"
                        :key="orderAdmin.id" class="align-middle">
                        <td class="ps-3">{{ i + 1 }}</td>
                        <td class="ps-4">{{ orderAdmin.order_number }}</td>
                        <td>{{ `${orderAdmin.customer.first_name} ${orderAdmin.customer.last_name}` }}</td>
                        <td class="ps-3">{{ orderAdmin.total_amount }}៛</td>
                        <td class="ps-2">
                            <span v-if="orderAdmin.status_id == 1"
                                class="badge bg-warning-subtle fw-medium fs-13 text-warning px-3 rounded-5">កំពុងរង់ចាំ</span>
                            <span v-if="orderAdmin.status_id == 2"
                                class="badge bg-primary-subtle fw-medium fs-13 text-primary px-3 rounded-5">បាទទទួល</span>
                            <span v-if="orderAdmin.status_id == 3"
                                class="badge bg-info-subtle fw-medium fs-13 text-info px-3 rounded-5">កំពុងរៀបចំ</span>
                            <span v-if="orderAdmin.status_id == 4"
                                class="badge bg-primary-subtle fw-medium fs-13 text-primary px-3 rounded-5">ត្រៀមរួច</span>
                            <span v-if="orderAdmin.status_id == 5"
                                class="badge bg-danger-subtle fw-medium fs-13 text-danger px-3 rounded-5">បានលុបចោល</span>
                            <span v-if="orderAdmin.status_id == 6"
                                class="badge bg-secondary fw-medium fs-13 text-primary px-3 rounded-5">បានបង្វិលវិញ</span>
                            <span v-if="orderAdmin.status_id == 7"
                                class="badge bg-primary-subtle fw-medium fs-13 text-primary px-3 rounded-5">បានបញ្ចប់</span>
                            <span v-if="orderAdmin.status_id == 8"
                                class="badge bg-danger-subtle fw-medium fs-13 text-danger px-3 rounded-5">បានបដិសេធ</span>
                            <span v-if="orderAdmin.status_id == 9"
                                class="badge bg-danger-subtle fw-medium fs-13 text-danger px-3 rounded-5">បរាជ័យក្នុងការដឹកជញ្ជូន</span>
                        </td>
                        <td>{{ orderAdmin.created_at }}</td>
                        <td>
                            <div class="d-flex ps-2">
                                <a role="button" title="សងប្រាក់" class="btn-action btn-delete" @click="onupdateStatus(orderAdmin.order_number, 6, 'ពិតជាត្រូវសងប្រាក់ទៅអតិថិជនវិញក្នុង')"
                                    :class="{ 'disabled-class': ![9, 8, 5].includes(orderAdmin.status_id) }">
                                    <i class="bi bi-arrow-counterclockwise"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="!useOrderAdmin.isLoading" class="mb-3">
                <Pagination />
            </div>
        </div>
    </div>
     <ModalStatus />
</template>

<script setup>
import { onMounted } from "vue";
import { useOrderAdminStore } from "@/stores/views/orderadmin_store";
import Pagination from "@/components/views/orderadmins/Pagination.vue";
import Loading from "../reusable/loading.vue";
import { useOrderStore } from "@/stores/views/order_store";
import ModalStatus from "./ModalStatus.vue";

const orderStore = useOrderStore();
const useOrderAdmin = useOrderAdminStore();

onMounted(() => {
    useOrderAdmin.onloadOrderAdmin();
});

const onclickRefund = () => {
    useOrderAdmin.mdl_refund.show();
};

const onupdateStatus = async (getNumOrder, id_status, message) => {
    orderStore.selected_status = id_status;
    orderStore.selected_order = getNumOrder;
    orderStore.selected_message = message;
    orderStore.mdl_status.show();
}

</script>
