<template>
  <section class="ads-page">
    <UIAddButton @click="toggleModal" buttonText="اضافة فئة" />

    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input placeholder="ابحث في الفئات"></el-input>
    </div>

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="categoriesFormRules"
        :model="categoriesForm"
        ref="categoriesForm"
      >
        <el-form-item label=" ">
          <input type="file" @change="onImageSeclected" />
        </el-form-item>
        <el-form-item label=" " prop="titleAr">
          <span>اسم الفئة باللغة العربية</span>
          <el-input
            v-model="categoriesForm.titleAr"
            placeholder="اكتب اسم الفئة باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="titleEn">
          <span>اسم الفئة باللغة الانجليزية</span>
          <el-input
            v-model="categoriesForm.titleEn"
            placeholder="اكتب اسم الفئة باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn"
          @click.prevent="addCategory"
        >
          اضافة فئة
        </button>
      </el-form>
    </UIPopupForm>

    <UIEmpty
      v-if="categories.length < 1"
      imgSrc="categories/no-categories.png"
      alt="no categories"
      caption="قم بإضافة الفئات المختلفة "
    />

    <div class="mt-3">
      <div class="row my-2">
        <div
          class="col d-flex justify-content-between align-items-center bg-white p-2 mx-2 rounded"
          v-for="category in categories"
          :key="category.id"
        >
          <div class="d-flex align-items-center gap-3">
            <img :src="category.image" alt="category icon" class="w-25" />
            <h6>{{ category.titleAr }}</h6>
          </div>
          <div class="options">
            <img
              src="@/assets/imgs/delete-icon.png"
              alt="delete icon"
              @click="deleteCategory(category)"
            />
          </div>
        </div>
      </div>
    </div>

    <el-pagination
      class="position-fixed bottom-0"
      background
      layout="prev, pager, next"
      v-model="page"
      @current-change="getCategories"
      :total="page * 10"
    >
    </el-pagination>
  </section>
</template>

<script>
export default {
  data() {
    return {
      modalTrigger: false,
      selectedImage: null,
      categoriesForm: {
        image: null,
      },
      categoriesFormRules: {
        titleAr: [{ required: true, message: "Arabic title Is Required" }],
        titleEn: [{ required: true, message: "English title Is Required" }],
      },
      categories: [],
      page: 1,
      totalPages: 1,
    };
  },
  async fetch() {
    await this.getCategories();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    onImageSeclected(e) {
      this.selectedImage = e.target.files[0];
      const fd = new FormData();
      fd.append("image", this.selectedImage, this.selectedImage.name);
      this.categoriesForm.image = fd;
    },
    addCategory() {
      this.$refs.categoriesForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            console.log(this.categoriesForm);
            // await this.$axios.post("/category", { data: this.categoriesForm });
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async getCategories() {
      let params = { page: this.page };
      const categoriesRes = await this.$axios.get("/category", { params });
      this.categories = await categoriesRes.data.docs;
      this.totalPages = await categoriesRes.data.totalPages;
      this.page = await categoriesRes.data.page;
    },
    deleteCategory(category) {
      this.$confirm(
        `Are you sure you want to delete category ${category.titleAr}`,
        "Warning",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          this.$message({
            type: "success",
            message: "Delete completed",
          });
          // await this.$axios.delete(`category/${category.id}`);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
};
</script>
