<template>
  <section class="ads-page" v-if="!$fetchState.pending">
    <UIAddButton @click="toggleModal" buttonText="اضافة فئة" />

    <!-- Search -->
    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input v-model="searchInput" placeholder="ابحث في الفئات"></el-input>
    </div>

    <!-- Add Category -->
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
        <el-form-item label=" " prop="image">
          <label for="formFile" class="form-label"
            >أضف الايقون التي تعبر عن بالفئة</label
          >
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="onImageSeclected"
            accept="image/png, image/jpeg"
          />
          <div class="text-center m-2">
            <img
              :src="selectedImageUrl"
              alt="preview"
              v-if="selectedImageUrl"
              width="150"
              height="100"
            />
          </div>
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

    <!-- Update Category -->
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="editModalTrigger"
      @update:modalTrigger="closeEditModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="categoriesFormRules"
        :model="editCategoryForm"
        ref="editCategoryForm"
      >
        <el-form-item label=" " prop="titleAr">
          <span>اسم الفئة الجديد باللغة العربية</span>
          <el-input
            v-model="editCategoryForm.titleAr"
            placeholder="اكتب اسم الفئة باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="titleEn">
          <span>اسم الفئة باللغة الانجليزية</span>
          <el-input
            v-model="editCategoryForm.titleEn"
            placeholder="اكتب اسم الفئة باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn"
          @click.prevent="editCategory"
        >
          حفظ التغييرات
        </button>
      </el-form>
    </UIPopupForm>

    <!-- No Categories -->
    <UIEmpty
      v-if="!categories"
      imgSrc="categories/no-categories.png"
      alt="no categories"
      caption="قم بإضافة الفئات المختلفة "
    />

    <!-- Categories -->
    <div class="d-flex flex-wrap mt-3">
      <div
        class="d-flex justify-content-around align-items-center bg-white p-2 m-2 rounded"
        style="width: 300px"
        v-for="category in filteredCategories"
        :key="category.id"
      >
        <div
          class="d-flex align-items-center gap-3"
          @click="$router.push(`/articles`)"
          role="button"
        >
          <img :src="category.image" alt="category icon" width="70" />
          <h6>{{ category.titleAr }}</h6>
        </div>
        <div class="options">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            @click="toggleEditModal(category.id)"
            role="button"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click="deleteCategory(category)"
            role="button"
          />
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <el-pagination
      class="position-fixed bottom-0"
      v-if="totalPages > 1"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getCategories"
      :total="totalPages * 10"
    >
    </el-pagination>
  </section>
</template>

<script>
export default {
  data() {
    return {
      modalTrigger: false,
      editModalTrigger: false,
      searchInput: "",
      selectedImage: null,
      selectedImageUrl: null,
      categoriesForm: {
        image: null,
      },
      categoriesFormRules: {
        titleAr: [{ required: true, message: "Arabic title Is Required" }],
        titleEn: [{ required: true, message: "English title Is Required" }],
      },
      editCategoryForm: {},
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
    closeEditModal() {
      this.editModalTrigger = !this.editModalTrigger;
    },
    async toggleEditModal(categoryId) {
      const categoryRes = await this.$axios.get(`/category/${categoryId}`);
      this.editCategoryForm = { ...categoryRes.data };
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = categoryId;
    },
    onImageSeclected(e) {
      if (e.target.files.length > 0) {
        this.selectedImage = this.categoriesForm.image = e.target.files[0];
        this.selectedImageUrl = URL.createObjectURL(this.selectedImage);
      }
    },
    addCategory() {
      this.$refs.categoriesForm.validate(async (valid) => {
        if (valid) {
          if (!this.selectedImage) {
            return;
          }
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            const fd = new FormData();
            fd.append("titleAr", this.categoriesForm.titleAr);
            fd.append("titleEn", this.categoriesForm.titleEn);
            fd.append("image", this.categoriesForm.image);
            fd.append("descriptionAr", this.categoriesForm.titleAr);
            await this.$axios.post("/category", fd);
            // Reset
            this.categoriesForm = {};
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.toggleModal();
            await this.getCategories();
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
          await this.$axios.delete(`category/${category.id}`);
          await this.getCategories();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    editCategory() {
      this.$refs.editCategoryForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.patch(
              `/category/${this.targetId}`,
              this.editCategoryForm
            );
            // Reset
            this.editCategoryForm = {};
            this.closeEditModal();
            await this.getCategories();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
  },
  computed: {
    filteredCategories() {
      return this.categories.filter((category) =>
        category.titleAr.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
  },
};
</script>
