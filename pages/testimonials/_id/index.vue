<template>
  <div class="testimonials-page">
    <div class="testimonials">
      <div class="row">
        <div class="col-md-6">
          <div>
            <h6 class="testimonials__key">الاسم</h6>
            <div class="testimonials__value">بدر جلال زهران</div>
          </div>
        </div>

        <div class="col-md-6">
          <div>
            <h6 class="testimonials__key">رقم الهاتف</h6>
            <div class="testimonials__value">01256215522</div>
          </div>
        </div>
      </div>

      <div class="testimonials__list">
        <div
          class="
            d-flex
            justify-content-between
            testimonials__list-item
            align-items-center
            flex-wrap
          "
        >
          <div class="d-flex gap-1 align-items-center">
            <span>1-</span>
            <h6>هل تم استقبالك ​بطريقة لائقة اثناء زيارتك لفروعنا؟</h6>
          </div>
          <el-rate v-model="value" disabled text-color="#ff9900"> </el-rate>
        </div>

        <div
          class="
            d-flex
            justify-content-between
            testimonials__list-item
            align-items-center
            flex-wrap
          "
        >
          <div class="d-flex gap-1 align-items-center">
            <span>1-</span>
            <h6>هل تم استقبالك ​بطريقة لائقة اثناء زيارتك لفروعنا؟</h6>
          </div>
          <el-rate v-model="value" disabled text-color="#ff9900"> </el-rate>
        </div>

        <div
          class="
            d-flex
            justify-content-between
            testimonials__list-item
            align-items-center
            flex-wrap
          "
        >
          <div class="d-flex gap-1 align-items-center">
            <span>1-</span>
            <h6>هل تم استقبالك ​بطريقة لائقة اثناء زيارتك لفروعنا؟</h6>
          </div>
          <el-rate v-model="value" disabled text-color="#ff9900"> </el-rate>
        </div>

        <div
          class="
            d-flex
            justify-content-between
            testimonials__list-item
            align-items-center
            flex-wrap
          "
        >
          <div class="d-flex gap-1 align-items-center">
            <span>1-</span>
            <h6>هل تم استقبالك ​بطريقة لائقة اثناء زيارتك لفروعنا؟</h6>
          </div>
          <el-rate v-model="value" disabled text-color="#ff9900"> </el-rate>
        </div>
      </div>

      <div class="testimonials__feedback">
        <h6 class="testimonials__key">الملاحظات</h6>
        <div class="testimonials__value p-3">
          هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
          القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة
          التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ
          طبيعياَ -إلى حد م
        </div>
      </div>

      <div class="testimonials__feedback mt-5">
        <h6 class="testimonials__key">عرفتنا منين ؟</h6>
        <div class="testimonials__value">facebook</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 5,
    };
  },
};
</script>

<style>
</style>