import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useOrderStore = defineStore('views/order', {
    state: () => ({
        frm: {
            status: '',
        },

        data: {
            id_statu: sessionStorage.getItem('id_status'),
            id_order: sessionStorage.getItem('id_order'),
            id_customer: sessionStorage.getItem('id_customer'),
            total_price: sessionStorage.getItem('total_price'),
            discount: sessionStorage.getItem('discount'),
            total_amount: sessionStorage.getItem('total_amount'),
            dilevery_fee: sessionStorage.getItem('dilevery_fee'),
            invioce: sessionStorage.getItem('invoice'),
        },
        order_detail: JSON.parse(sessionStorage.getItem('order_detail')) || {},
        orders: ref([]),
        queryStatus: ref(''),
        total_records: ref(1),
        currentPage: ref(1),
        totalPages: ref(1),
        querySearch: ref(''),
        selected_status: 0,
        selected_message: 0,
        selected_order: 0,
        per_page:10,
        isLoading: ref(false),
        order_id: 0,
        title_status:'',
        mdl_delete: null,
        mdl_status: null,
        mdl_invoice: null,
        uploadedataImagesChat: [],
        messagesChat: [],
        emptyChat: null,
        modalChat: null,
        modalViewImageChat: null,
        selectImageChat: null,
        modalErrorTypeImage: null,
        msgShowErrorTypeImage: null,
    }),
    actions: {
        async onloadOrder() {
            this.isLoading = true;
            try {
                const res = await axios.get(`/api/vendor-orders?scol=id&sdir=desc&per_page=${this.per_page}&page=${this.currentPage}&status_id=${this.queryStatus}&search=${this.querySearch}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    }
                });
                
                if (res.data.result) {
                    this.orders = res.data.data;
                    this.totalPages = res.data.paginate.total_page;
                    this.total_records = res.data.paginate.total;
                    console.log(this.orders);
                }

            } catch (error) {
                console.error("Error fetching subcategories:", error);
            } finally {
                this.isLoading = false;
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.onloadOrder();
            }
        },
    }
})