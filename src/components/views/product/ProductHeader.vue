<template>
    <div class="row rounded-14 d-flex align-items-center justify-content-between section-spacing">
        <div class="col-3 d-none d-md-block">
            <div class="fs-5 p-0 fw-semibold">ផលិតផល</div>
        </div>
        <div class="col-12 col-md-8 p-0">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between justify-content-md-end gap-2 gap-md-3">
                <div class="bg-white w-100 search-width mb-3 mb-md-0 search-bar d-flex align-items-center ps-2 rounded-5">
                    <input type="search" class="form-control bg-transparent border-0" placeholder="ស្វែងរក"
                        v-model="productStore.searchQuery" @input="productStore.onloadProduct"/>
                    <span class="input-group-text bg-transparent border-0">
                        <i class="bi bi-search text-dark-emphasis"></i>
                    </span>
                </div>
                <div>
                    <select
                        class="form-select bg-white fs-16 sort-user text-dark-emphasis search-bar border-0 rounded-5"
                        v-model="productStore.selectedSubcategory" @change="productStore.onloadProduct()">
                        <option value="" hidden selected>ជ្រើសរើស</option>
                        <option value="">ទាំងអស់</option>
                        <option v-for="product in productStore.subcategories" :key="product.id" :value="product.id">
                            {{ product.name }}
                        </option>

                    </select>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <button type="button" @click="onClickAddProduct()" class="btn btn-primary p-0 btn-add">
                        <i class="bi bi-plus-lg"></i>
                    </button>
                    <button class="btn btn-primary rounded-5 px-3 d-flex align-items-center" @click="exportToCSV">
                        <i class="bi bi-download me-2"></i>CVS
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductStore } from '@/stores/views/product_store';
import { onMounted } from 'vue';
import axios from 'axios';

const productStore = useProductStore();
onMounted(() => {
    productStore.onloadProduct()
})
const onClickAddProduct = () => {
    productStore.selectedId = 0
    productStore.frm.name = ''
    productStore.frm.price = ''
    productStore.frm.category = ''
    productStore.frm.category_id = ''
    productStore.frm.stock_qty = ''
    productStore.frm.stock_level = ''
    productStore.frm.description = ''
    productStore.frm.discount = 0
    productStore.frm.start_date = ''
    productStore.frm.end_date = ''
    productStore.frm.unit_measure = ''
    productStore.frm.unit_measure_id = ''
    productStore.crop.avatar = '/default.png'
    productStore.crop.img = ''
    productStore.crop.blob = null
    productStore.frm.photo = ''
    if (productStore.v_validate) {
        productStore.v_validate.$reset();
    }
    productStore.mdl_add.show();
}

const exportToCSV = async () => {
    try {
        const response = await axios.get(`/api/products/dashboard?all=true&subcategory_id=${productStore.selectedSubcategory}`);
        if (response.data.result) {
            const allData = response.data.data;
            const headers = ['ឈ្មោះផលិតផល', 'ប្រភេទផលិតផល', 'បរិមាណ', 'រង្វាស់', 'តម្លៃ​','បញ្ចុះតម្លៃ', 'ថ្ងៃបញ្ចុះតម្លៃ', 'ថ្ងៃបញ្ចប់បញ្ចុះតម្លៃ', 'ស្តុក', 'អំពីផលិតផល'];
            const data = allData.map(item => [
                `"${item.name || 'N/A'}"`,
                `"${item.subcategory?.name || 'N/A'}"`,
                `"${item.stock_qty || 'N/A'}"`,
                `"${item.measure?.name || 'N/A'}"`,
                `"${item.price || 'N/A'}"`,
                `"${item.discount?.discount_percentage || 'N/A'}"`,
                `"${item.discount?.start_date || 'N/A'}"`,
                `"${item.discount?.end_date || 'N/A'}"`,
                `"${item.stock_qty <= 0 ? 'អស់ពិស្តុក' : item.stock_qty <= 5 ? 'ស្តុកមានតិច' : 'មានក្នុងស្តុក' }"`,
                `"${item.description || 'N/A'}"`,
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
            link.setAttribute('download', 'products.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Failed to fetch products.");
        }
    } catch (error) {
        console.error("Error exporting products:", error);
    }
};
</script>
hidden selected