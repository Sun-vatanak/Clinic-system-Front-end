<template>
    <div class="row bg-white section-spacing rounded-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-dark-emphasis" scope="col">ល.រ</th>
                        <th class="text-dark-emphasis" scope="col">ឈ្មោះផលិតផល</th>
                        <th class="text-dark-emphasis" scope="col">ប្រភេទផលិតផល</th>
                        <th class="text-dark-emphasis" scope="col">បរិមាណ</th>
                        <th class="text-dark-emphasis" scope="col">តម្លៃ</th>
                        <th class="text-dark-emphasis" scope="col">ផលិតផលស្តុក</th>
                        <th class="text-dark-emphasis text-center ps-5" scope="col">មុខងារ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="productStore.isLoading">
                        <td colspan="9" class="border-none">
                            <Loading />
                        </td>
                    </tr>
                    <tr v-if="productStore.products.length === 0 && !productStore.isLoading">
                        <td colspan="9" class="text-center py-3">
                            គ្មាននិន្នន័យ
                        </td>
                    </tr>
                    <tr v-for="(product, i) in productStore.products" :key="product.id" class="align-middle" v-if="!productStore.isLoading">
                        <td>{{ i + 1 }}</td>
                        <td>
                            <div class="d-flex align-items-center gap-2">
                                <div class="profile_user bg-light overflow-hidden">
                                    <img :src="product.photo ? product.photo : '/default.png'" class="card-img" alt="">
                                </div>
                                <span>
                                    {{ product.name }}
                                </span>
                            </div>
                        </td>
                        <!-- <td>{{ product.vendor.business_name}}</td> -->
                        <td>{{ product.subcategory.name }}</td>
                        <td>{{ product.stock_qty + " " + product.measure.name }}</td>
                        <td>{{ product.price }}៛</td>
                        <td>
                            <div :class="product.stock_qty <= 0 ? 'text-danger' : product.stock_qty <= 5 ? 'text-warning' : 'text-primary'">
                                {{ product.stock_qty <= 0 ? 'អស់ពីស្តុក' : product.stock_qty <= 5 ? 'ស្តុកមានតិច' : 'មានក្នងស្តុក' }}
                            </div>
                        </td>
                        <td>
                            <div class="d-flex align-items-center justify-content-end gap-3">
                                <a role="button" @click="onClickViewProduct(product.id)" class="btn-action btn-views" title="មើលលម្អិត">
                                    <i class="bi bi-eye"></i>
                                </a>
                                <a role="button" @click="onClickEditProduct(product)" class="btn-update btn-action" title="កែប្រែ">
                                    <i class="bi bi-pencil-square"></i>
                                </a>
                                <a role="button" @click="onClickDeleteProduct(product)" class="btn-delete btn-action" title="លុប">
                                    <i class="bi bi-trash"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="!productStore.isLoading">
            <Pagination />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProductStore } from "@/stores/views/product_store";
import Pagination from "@/components/views/product/Pagination.vue";
import Loading from "../reusable/loading.vue";
import axios from "axios";

const productStore = useProductStore();
const isLoading = ref(false);
onMounted(() => {
    productStore.onloadProduct();

});

const onClickEditProduct = (pro) => {
    productStore.selectedId = pro.id;
    productStore.frm.name = pro.name
    productStore.frm.price = pro.price
    // productStore.frm.vendor = pro.vendor.business_name
    productStore.frm.unit_measure = pro.measure.name
    productStore.frm.unit_measure_id = pro.measure.id
    productStore.frm.category = pro.subcategory.name
    productStore.frm.category_id = pro.subcategory.id
    productStore.frm.stock_qty = pro.stock_qty
    productStore.frm.stock_level = pro.stock_level
    productStore.frm.description = pro.description
    productStore.frm.photo = pro.photo

    if (pro.discount == null) {
        productStore.frm.discount = 0
        productStore.frm.start_date = null
        productStore.frm.end_date = null
    } else {
        productStore.frm.discount = pro.discount.discount_percentage
        productStore.frm.start_date = pro.discount.start_date
        productStore.frm.end_date = pro.discount.end_date
    }
    
    productStore.crop.avatar = pro.photo ? pro.photo : '/default.png';
    if (productStore.v_validate) {
        productStore.v_validate.$reset();
    }
    productStore.mdl_add.show();
}

const onClickDeleteProduct = (pro) => {
    productStore.selectedId = pro.id;
    productStore.frm.name = pro.name;
    productStore.mdl_delete.show();
}

const onClickViewProduct = async (id) => {
    isLoading.value = true;
    try {
        const res = await axios.get(`/api/products-detail/${id}`);
        if (res.data.result) {
            productStore.product_details = res.data.data
            console.log(productStore.product_details);
        }
    } catch (error) {
        if (err.response?.data?.errors?.name?.[0]) {
            console.log(err.response.data.errors.name[0]);
            if (err.response.data.errors.name[0].includes('The name has already been taken.')) {
                isNameTaken.value = true;
            }
        }
    } finally {
        isLoading.value = false;
    }
    productStore.mdl_view.show();
}

</script>