import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useMarketStore = defineStore('views/market_store', {
    state: () => ({
        frm: {
            name: '',
            location: '',
            photo: '',
            latitude: '',
            longitude: '',
            created_at: '',
            updated_at: '',
            description: '',
            is_remove: 0,
        },
        crop: {
            img: '',
            blob: null,
            avatar: '/default.png'
        },
        v_validate: null,
        selectedId: 0,
        markets: [
            { id: 1, name: 'ផ្សារទឹកថ្លារ', location: 'មហាវិថី សហពន្ធ័រុស្ស៊ី (១១០ រាជធានី​ភ្នំពេញ, 12102)' },
            { id: 2, name: 'ផ្សារចាស់', location: 'ផ្លូវ ១៣៦, រាជធានី​ភ្នំពេញ, 12204' },
            { id: 3, name: 'ផ្សារកណ្ដាល', location: 'ផ្លូវ ១០៤, រាជធានី ភ្នំពេញ, 12301' }
        ],
        currentPage: 1,
        itemsPerPage: 10,
        mdl_add: null,
        mdl_del: null,
        mdl_crop: null,
        modalErrorTypeImage: null,
        error_message: "",
        markets: ref([]),
        currentPage: ref(1),
        totalPages: ref(1),
        perPage: 10,
        total_records: ref(1),
        searchQuery: ref(""),
        isLoading: ref(false),
    }),
   
    actions: {
        async onloadMarket() {
            this.isLoading = true;
            try {
                const response = await axios.get(
                    `/api/markets?scol=id&sdir=desc&per_page=${this.perPage}&page=${this.currentPage}&search=${this.searchQuery}`
                );
                if (response.data.result) {
                    this.markets = response.data.data;
                    this.totalPages = response.data.paginate.total_page;
                    this.total_records = response.data.paginate.total;
                }
            } catch (error) {
                console.error("Error fetching markets:", error);
            } finally {
                this.isLoading = false;
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.onloadMarket();
            }
        },
    }
});
