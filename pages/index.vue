<template>
  <div class="home">
    <div class="home__statistics statistics">
      <div class="statistics__card d-flex gap-3 align-items-center">
        <img
          class="stats-info__img"
          src="@/assets/imgs/stats-clients.svg"
          alt=""
        />
        <div class="stats-info">
          <h6 class="stats-info__title">العملاء الحاليين</h6>
          <span> 600 </span>
        </div>
      </div>

      <div class="statistics__card d-flex gap-3 align-items-center">
        <img
          class="stats-info__img"
          src="@/assets/imgs/orders-stats.svg"
          alt=""
        />
        <div class="stats-info">
          <h6 class="stats-info__title">العملاء الحاليين</h6>
          <span> 600 </span>
        </div>
      </div>

      <div class="statistics__card d-flex gap-3 align-items-center">
        <img
          class="stats-info__img"
          src="@/assets/imgs/orders-2-stats.svg"
          alt=""
        />
        <div class="stats-info">
          <h6 class="stats-info__title">العملاء الحاليين</h6>
          <span> 600 </span>
        </div>
      </div>

      <div class="statistics__card d-flex gap-3 align-items-center">
        <img
          class="stats-info__img"
          src="@/assets/imgs/testimonials-stats.svg"
          alt=""
        />
        <div class="stats-info">
          <h6 class="stats-info__title">العملاء الحاليين</h6>
          <span> 600 </span>
        </div>
      </div>
    </div>

    <div class="home__testimonials">
      <h4>استطلاعات الرأى</h4>
      <div class="testimonials">
        <section class="testimonials__card">
          <div>
            <h6 class="testimonials__key">الاسم</h6>
            <h6 class="testimonials__value">بدر جلال زهران</h6>
          </div>

          <div>
            <h6 class="testimonials__key">رقم الهاتف</h6>
            <h6 class="testimonials__value">01256215522</h6>
          </div>

          <button @click="$router.push('/testimonials/5')" class="icon-btn">
            <img src="@/assets/imgs/details.svg" alt="" />
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
