<template>
  <section class="ads-page">
    <UIAddButton @click="toggleModal" buttonText="اضافة فئة" />
    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input placeholder="ابحث في الفئات" v-model="input"></el-input>
    </div>

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
              قم بوضع الايقون التي تعبر عن الفئة او <em>اضغط للتحميل</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label=" ">
          <span>اسم الفئة باللغة العربية</span>
          <el-input
            v-model="input"
            placeholder="اكتب اسم الفئة باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <span>اسم الفئة باللغة الانجليزية</span>
          <el-input
            v-model="input"
            placeholder="اكتب اسم الفئة باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn">اضافة فئة</button>
      </el-form>
    </UIPopupForm>

    <UIEmpty
      v-else
      imgSrc="categories/no-categories.png"
      alt="no categories"
      caption="قم بإضافة الفئات المختلفة "
    />

    <!-- <div>
      <div class="row my-2">
        <div
          class="col d-flex justify-content-between align-items-center bg-white p-2 mx-2 rounded"
        >
          <div class="d-flex align-items-center gap-3">
            <img
              src="@/assets/imgs/categories/category-icon.png"
              alt="category icon"
            />
            <h6>القاهرة</h6>
          </div>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
        </div>
        <div
          class="col d-flex justify-content-between align-items-center bg-white p-2 mx-2 rounded"
        >
          <div class="d-flex align-items-center gap-3">
            <img
              src="@/assets/imgs/categories/category-icon.png"
              alt="category icon"
            />
            <h6>القاهرة</h6>
          </div>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
        </div>
        <div
          class="col d-flex justify-content-between align-items-center bg-white p-2 mx-2 rounded"
        >
          <div class="d-flex align-items-center gap-3">
            <img
              src="@/assets/imgs/categories/category-icon.png"
              alt="category icon"
            />
            <h6>القاهرة</h6>
          </div>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
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
      categories: [],
      page: 1,
      totalPages: 1,
    };
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
  },
};
</script>
