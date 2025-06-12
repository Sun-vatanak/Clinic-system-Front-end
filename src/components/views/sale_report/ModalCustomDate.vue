<template>
    <!-- modal -->
    <div class="modal show fade" id="mdl-CD" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content mdl-CD m-auto p-3 rounded-14 border-0">
                <div class="modal-body">
                    <h4 class="mb-1 fw-semibold">ស្វែងរករបាយការណ៍លក់</h4>
                    <p class="mb-3">ស្វែងរករបាយការណ៍លក់តាមការជ្រើសរើសរយៈពេល</p>
                    <div class="list-unstyled mb-3">
                        <p class="fw-semibold mb-2">ជ្រើសរើសរយៈពេល</p>
                        <a role="button" class="btn period-btn"
                            :class="{ 'btn-primary text-white': selectedPeriod === 'Week', 'btn-outline-primary': selectedPeriod !== 'Week' }"
                            @click="selectedPeriod = 'Week'">Week</a>

                        <a role="button" class="btn period-btn ms-2 position-relative"
                            :class="{ 'btn-primary text-white': selectedPeriod === 'Month', 'btn-outline-primary': selectedPeriod !== 'Month' }"
                            @click="toggleMonthDropdown">
                            Month
                        </a>
                        <a role="button" class="btn period-btn ms-2"
                            :class="{ 'btn-primary text-white': selectedPeriod === 'Quarter', 'btn-outline-primary': selectedPeriod !== 'Quarter' }"
                            @click="selectedPeriod = 'Quarter'">Quarter</a>

                        <a role="button" class="btn period-btn ms-2"
                            :class="{ 'btn-primary text-white': selectedPeriod === 'Year', 'btn-outline-primary': selectedPeriod !== 'Year' }"
                            @click="selectedPeriod = 'Year'">Year</a>

                        <a role="button" class="btn period-btn ms-2"
                            :class="{ 'btn-primary text-white': selectedPeriod === 'Custom', 'btn-outline-primary': selectedPeriod !== 'Custom' }"
                            @click="selectedPeriod = 'Custom'">Custom Date</a>
                    </div>

                    <div v-if="selectedPeriod === 'Month' && showMonthDropdown" class="dropdown-menu d-block mt-1">
                            <a v-for="month in months" :key="month.value" class="dropdown-item"
                                @click="selectMonth(month.value)">
                                {{ month.label }}
                            </a>
                        </div>
                   

                    <div v-if="selectedPeriod === 'Custom'">
                        <div class="mb-3">
                            <label for="startDate" class="form-label text-black">ថ្ងៃចាប់ផ្តើម</label>
                            <input type="datetime-local" v-model="startDate" class="form-control" id="startDate">
                        </div>
                        <div class="mb-3">
                            <label for="endDate" class="form-label text-black">ថ្ងៃបញ្ចប់</label>
                            <input type="datetime-local" v-model="endDate" class="form-control" id="endDate">
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-end border-0">
                    <button type="button" class="btn btn-outline-primary text-cancel fs-14"
                        data-bs-dismiss="modal">ត្រឡប់វិញ</button>
                    <button type="button" class="btn btn-primary fs-14" @click="onclickSave()">បញ្ជូន</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Modal } from 'bootstrap';
import { ref, onMounted } from 'vue';
import { useSaleReportStore } from '@/stores/views/saleReport_store';

const useSaleReport = useSaleReportStore();

const startDate = ref('');
const endDate = ref('');
const selectedPeriod = ref('Week');
const selectedMonth = ref(null);
const showMonthDropdown = ref(false);

const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
];

const toggleMonthDropdown = () => {
    if (selectedPeriod.value === 'Month') {
        showMonthDropdown.value = !showMonthDropdown.value;
    } else {
        selectedPeriod.value = 'Month';
        showMonthDropdown.value = true;
    }
};

const selectMonth = (month) => {
    selectedMonth.value = month;
    showMonthDropdown.value = false;
    console.log('Selected Month:', month);
};

const onclickSave = () => {
    console.log('Start Date:', startDate.value);
    console.log('End Date:', endDate.value);
    console.log('Selected Period:', selectedPeriod.value);
    console.log('Selected Month:', selectedMonth.value);

    useSaleReport.customDateRange = {
        start: startDate.value,
        end: endDate.value,
        period: selectedPeriod.value,
        month: selectedMonth.value,
    };

    useSaleReport.mdl_customDate.hide();
};

onMounted(() => {
    useSaleReport.mdl_customDate = Modal.getOrCreateInstance(document.getElementById('mdl-CD'));
});
</script>

<style scoped>
.dropdown-menu {
    position: absolute;
    background-color: var(--white);
    border: 1px solid var(--success);
    z-index: 1050;
    width: auto;
    min-width: 160px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.dropdown-item {
    cursor: pointer;
}
.dropdown-item:hover {
    background-color: var(--primary);
    color: var(--white);

}
.period-btn:hover {
    background-color: var(--primary); 
    color: var(--white) !important;
    border-color: var(--primary);
}

</style>
