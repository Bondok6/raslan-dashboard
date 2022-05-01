<template>
  <section class="ads-page">
    <UIAddButton @click="showAboutForm" buttonText="اضافة معلومات" />

    <UIEmpty
      v-if="!formToggle"
      imgSrc="about/no-info.png"
      alt="no info"
      caption="قم بإضافة معلومات تخص المعمل"
    />

    <div v-if="formToggle" class="add-info">
      <el-form action="" class="p-5 d-flex flex-column gap-2">
        <div>
          <span class="demo-input-label"> اضافة وصف باللغة العربية </span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="textareaAr"
            placeholder="اكتب الوصف المناسب باللعة العربية"
          ></el-input>
        </div>
        <div>
          <span class="demo-input-label"> اضافة وصف باللغة الانجليزية </span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="textareaEn"
            placeholder="اكتب الوصف المناسب باللعة الانجليزية"
          ></el-input>
        </div>
        <div class="buttons w-100 m-4 d-flex gap-2 justify-content-end">
          <button type="submit" class="secondary-btn w-25 align-self-end">
            حفظ
          </button>
          <button type="submit" class="secondary-btn w-25 align-self-end">
            الغاء
          </button>
        </div>
      </el-form>
    </div>

    <!-- <div class="cards">
      <div class="card-item card-item--ads card-item--ads--large">
        <div>
          <img
            src="@/assets/imgs/random.png"
            alt="ad image"
            class="card-item__img"
          />
        </div>
        <div class="card-item--ads__content">
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
          <p>
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى
            المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو
            شكل توضع الفقرات في الصفحة التي يقرأها.
          </p>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      formToggle: false,
    };
  },
  methods: {
    showAboutForm() {
      this.formToggle = true;
    },
  },
};
</script>
