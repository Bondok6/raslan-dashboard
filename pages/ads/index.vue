<template>
  <section class="page ads-page">
    <UIAddButton @click="toggleModal" buttonText="اضافة اعلان" />

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form class="p-5 d-flex flex-column gap-2">
        <el-form-item>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              قم بوضع الملف هنا او <em>اضغط للتحميل</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              يجب ان يكون الملف من نوع jpg/png وحجمة اصغر من 500kb
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label=" ">
          <span> نبذة مختصرة عن الاعلان باللغة العربية </span>
          <el-input type="textarea" :rows="2"></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <span> نبذة مختصرة عن الاعلان باللغةالانجليزية </span>
          <el-input dir="ltr" type="textarea" :rows="2"></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn w-50 align-self-end">
          اضافة اعلان
        </button>
      </el-form>
    </UIPopupForm>

    <UIEmpty
      v-else
      imgSrc="ads/no-ads.png"
      alt="no ads"
      caption="لم يتم إضافة اى إعلانات بعد"
    />

    <!-- <div class="cards" >
      <div class="card-item card-item--ads">
        <div>
          <img
            src="@/assets/imgs/random.png"
            alt="ad image"
            class="card-item--ads__img"
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
            الصفحة التي يقرأها.
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
      modalTrigger: false,
      addAdsForm: {},
      addAdsFormRules: {
        textareaAr: [{ required: true, message: "This Field Is Required" }],
        textareaEn: [{ required: true, message: "This Field Is Required" }],
      },
    };
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
  },
};
</script>
