<template>
  <div class="testimonials-page" v-if="!$fetchState.pending">
    <div class="testimonials">
      <div class="row">
        <div class="col-md-6">
          <div>
            <h6 class="testimonials__key">الاسم</h6>
            <div class="testimonials__value">{{ poll.name }}</div>
          </div>
        </div>

        <div class="col-md-6">
          <div>
            <h6 class="testimonials__key">رقم الهاتف</h6>
            <div class="testimonials__value" dir="ltr">{{ poll.phone }}</div>
          </div>
        </div>
      </div>

      <div
        class="testimonials__list"
        v-for="item in QA"
        :key="item.question.id"
      >
        <div
          class="d-flex justify-content-between testimonials__list-item align-items-center flex-wrap"
        >
          <div class="d-flex gap-1 align-items-center">
            <span>{{ item.question.id }}-</span>
            <h6>{{ item.question.questionAr }}</h6>
          </div>
          <el-rate v-model="item.value" disabled text-color="#ff9900">
          </el-rate>
        </div>
      </div>

      <div class="testimonials__feedback">
        <h6 class="testimonials__key">الملاحظات</h6>
        <div class="testimonials__value p-3">
          {{ poll.notes || "لا يوجد" }}
        </div>
      </div>

      <div class="testimonials__feedback mt-5">
        <h6 class="testimonials__key">عرفتنا منين ؟</h6>
        <div class="testimonials__value">{{ poll.youKnowUs }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      poll: {},
      QA: [],
    };
  },
  async fetch() {
    const pollRes = await this.$axios.get(`/poll/${this.$route.params.id}`);
    this.poll = await pollRes.data;
    this.QA = await pollRes.data.answers;
  },
};
</script>
