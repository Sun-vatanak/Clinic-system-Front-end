<template>
    <section class="not-found-page container-fluid container-lg py-2 px-3 px-lg-0">
         <div class="row">
              <div class="col-12">
                   <div class="card card-not-found align-items-center justify-content-center border-0 rounded-4 my-4">
                        <div class="not-found-img">
                             <img src="/error404.png"
                                  class="img-fluid w-100 h-100 object-fit-cover" alt="images">
                        </div>
                        <p class="pt-4 text-label not-found-heading">ទំព័រដែលលោកអ្នកស្វែងរកមិនមាននោះទេ!!</p>
                        <router-link class="btn btn-primary rounded-5 px-3 mt-1" aria-current="page"
                             to="/">ទៅទំព័រដើម</router-link>
                   </div>
              </div>
         </div>
    </section>
</template>
<style scoped>
.not-found-page .card-not-found {
    height: 83vh !important;
}

.not-found-page .card-not-found .not-found-img {
    width: 330px;
    height: 180px;
}

.not-found-heading{
    font-size: 20px;
    max-width: 220px;
    text-align: center;
}

</style>