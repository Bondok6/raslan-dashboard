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
          <span> {{ countUsers }} </span>
        </div>
      </div>

      <div class="statistics__card d-flex gap-3 align-items-center">
        <img
          class="stats-info__img"
          src="@/assets/imgs/orders-stats.svg"
          alt=""
        />
        <div class="stats-info">
          <h6 class="stats-info__title">الطلبات</h6>
          <span> {{ countAllOrders }} </span>
        </div>
      </div>

      <div class="statistics__card d-flex gap-3 align-items-center">
        <img
          class="stats-info__img"
          src="@/assets/imgs/orders-2-stats.svg"
          alt=""
        />
        <div class="stats-info">
          <h6 class="stats-info__title">الطلبات المرفوضة</h6>
          <span> {{ countRejectedOrders }} </span>
        </div>
      </div>

      <div class="statistics__card d-flex gap-3 align-items-center">
        <img
          class="stats-info__img"
          src="@/assets/imgs/testimonials-stats.svg"
          alt=""
        />
        <div class="stats-info">
          <h6 class="stats-info__title">استطلاعات الرأي</h6>
          <span> {{ countPolls }} </span>
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
  data() {
    return {
      countUsers: 0,
      countAllOrders: 0,
      countRejectedOrders: 0,
      countPolls: 0,
    };
  },
  async fetch() {
    const countUsersRes = await this.$axios.get("/count/users");
    const countPollsRes = await this.$axios.get("/polls/count");
    const countOrdersRes = await this.$axios.get("/count/orders");
    const countRejectedRes = await this.$axios.get(
      "/count/orders?status=rejected"
    );
    this.countUsers = await countUsersRes.data.totalDoc;
    this.countPolls = await countPollsRes.data.totalDoc;
    this.countAllOrders = await countOrdersRes.data.totalDoc;
    this.countRejectedOrders = await countRejectedRes.data.totalDoc;
    console.log(this.countUsers);
  },
};
</script>
