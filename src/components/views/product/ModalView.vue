<template>
  <div class="modal fade" id="mdl-view" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 rounded-4 p-3">
        <div class="modal-header border-0 d-flex align-items-center justify-content-between">
          <div class="text-dark-emphasis h5 fw-semibold">ព័ត៌មានលម្អិតផលិតផល</div>
          <a role="button" class="btn-exit bg-light" data-bs-dismiss="modal" aria-label="Close">
            <i class="bi bi-x fs-4 text-primary"></i>
          </a>
        </div>
        <div class="modal-body">
          <div class="row gy-3" v-for="product in productStore.product_details">
            <div class="col-12 col-sm-5 d-flex align-items-center justify-content-center p-3">
              <div class="rounded-4 product-detail">
                <img :src="product.photo ? product.photo : '/default.png'" class="card-img object-fit-cover" alt="">
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-7 d-flex align-items-center">
              <div class="w-100">
                <h5 class="text-dark fw-semibold mb-3">{{ product.name }}</h5>
                <h4 class="fw-bold text-primary mb-3">
                  {{ product.price }}៛ / {{ product.measure.name }}
                </h4>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="bi bi-shop-window"></i>
                  <span>{{ product.vendor.business_name }}</span>
                  <span>{{ product.vendor.market.name }}</span>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="bi bi-tag"></i>
                  <span>{{ product.subcategory.name }}</span>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="bi bi-percent"></i>
                  <span>{{ product.discount == null? 0 : product.discount.discount_percentage}}</span>
                </div>
                <div class="mb-3 bg-light rounded-4 p-3">
                  <h6 class="text-dark-emphasis fw-semibold mb-3">ព័ត៌មានផលិតផល</h6>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex flex-column">
                      <span class="fs-14">ចំនួន</span>
                      <span class="fw-bold text-dark-emphasis">{{ product.stock_qty }}</span>
                    </div>
                    <div class="d-flex flex-column">
                      <span class="fs-14">បរិមាណគិតជា</span>
                      <span class="fw-bold text-dark-emphasis">
                        {{ product.measure.name }}
                      </span>
                    </div>
                    <div class="d-flex flex-column">
                      <span class="fs-14">ស្តុក</span>
                      <span class="fw-semibold"
                        :class="product.stock_level == 0 ? 'text-danger' : product.stock_level == 1 ? 'text-warning' : 'text-primary'">{{
                          product.stock_level == 0 ? 'មិនមានក្នុងស្តុក' : product.stock_level == 1 ?
                            'ស្តុកមានតិច' : 'មានក្នុងស្តុក' }}
                      </span>
                    </div>
                  </div>
                </div>
                <span>{{ product.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/views/product_store";

const productStore = useProductStore();

onMounted(() => {
  productStore.mdl_view = Modal.getOrCreateInstance(document.getElementById("mdl-view"));
});

</script>
