<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة مقالة" />
    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input placeholder="ابحث في المقالات" v-model="input"></el-input>
    </div>

    <div class="mt-3" v-if="modalTrigger">
      <el-form ref="form" :model="form">
        <div class="row">
          <el-form-item class="col-lg-4 col-md-12">
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
                أضف الايقون الخاصة بالمقالة او
                <em>اضغط للتحميل</em>
              </div>
            </el-upload>
          </el-form-item>

          <div class="col-lg-8 row">
            <el-form-item class="col-lg-12">
              <span>اختر الفئة التي تنتمى اليها المقالة</span>
              <el-select
                v-model="caseInput"
                placeholder="اختر الفئات المناسبة"
                class="w-100"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" " class="col-lg-6 col-md-12">
              <span>اسم المقالة باللغة العربية</span>
              <el-input
                v-model="input"
                placeholder="اكتب اسم المقالة باللغة العربية"
              ></el-input>
            </el-form-item>

            <el-form-item label=" " class="col-lg-6 col-md-12">
              <span>اسم المقالة باللغة الانجليزية</span>
              <el-input
                v-model="input"
                placeholder="كتب اسم المقالة باللغة الانجليزية"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="editor">
          <span>وصف المقالة باللغة العربية</span>
          <client-only placeholder="loading...">
            <ckeditor-nuxt v-model="contentHolderAr" :config="editorConfig" />
          </client-only>
        </div>

        <div class="editor">
          <span>وصف المقالة باللغة الانجليزية</span>
          <client-only placeholder="loading...">
            <ckeditor-nuxt v-model="contentHolderEn" :config="editorConfig" />
          </client-only>
        </div>

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
      imgSrc="articles/no-articles.png"
      alt="no articles"
      caption="قم بإضافة المقالات  التي تنتمى الى هذه الفئة"
    />

    <!-- <div class="cards">
      <div class="card-item d-flex align-items-center justify-content-around">
        <div class="d-flex gap-2 align-items-center">
          <h6 class="key">اسم المقالة</h6>
          <h6 class="value">مشاكل القلب وعلاقته بضيق التنفس</h6>
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
