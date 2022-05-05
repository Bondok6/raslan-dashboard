<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة تعليمات" />
    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input
        placeholder="ابحث في تعليمات سحب العينة"
        v-model="input"
      ></el-input>
    </div>

    <div class="mt-3" v-if="modalTrigger">
      <el-form ref="form" :model="form">
        <div class="row">
          <el-form-item label=" " class="col-lg-6 col-md-12">
            <span>اسم العينة باللغة العربية</span>
            <el-input
              v-model="input"
              placeholder="اكتب اسم العينة باللغة العربية"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " class="col-lg-6 col-md-12">
            <span>اسم العينة باللغة الانجليزية</span>
            <el-input
              v-model="input"
              placeholder="كتب اسم العينة باللغة الانجليزية"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <span>التعليمات الازمة باللغة العربية</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="اكتب اسم التعليم الازم اتباعه باللغة العربية"
            v-model="textarea"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <span>التعليمات الازمة باللغة الانجليزية</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="اكتب اسم التعليم الازم اتباعه باللغة الانجليزية"
            v-model="textarea"
          >
          </el-input>
        </el-form-item>

        <div class="buttons w-100 p-3 d-flex gap-2 justify-content-end">
          <button type="submit" class="secondary-btn w-25 align-self-end">
            حفظ
          </button>
          <button type="submit" class="secondary-btn w-25 align-self-end">
            الغاء
          </button>
        </div>
      </el-form>
    </div>

    <UIEmpty
      v-else
      imgSrc="instruction/no-instruction.png"
      alt="no instruction"
      caption="قم بإضافة تعليمات لسحب العينة"
    />

    <!-- <div class="cards">
      <div class="card-item d-flex align-items-center justify-content-around">
        <div class="d-flex gap-2 align-items-center">
          <h6 class="key">اسم العينة</h6>
          <h6 class="value">
            هذا السطر يعتبر اسم للعينة التي اضيف ليها تعليمات
          </h6>
        </div>
        <div class="options">
          <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
          <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      modalTrigger: false,
      editorConfig: {
        simpleUpload: {
          uploadUrl: "path_to_image_controller",
          headers: {
            Authorization: "optional_token",
          },
        },
      },
      contentHolderAr: "",
      contentHolderEn: "",
    };
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
  },
};
</script>
