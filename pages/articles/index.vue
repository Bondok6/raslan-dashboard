<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة مقالة" />

    <!-- Search & Filter -->
    <div
      class="d-flex flex-wrap gap-2"
      v-if="!modalTrigger && !editModalTrigger"
    >
      <!-- Search -->
      <div class="search w-50">
        <img
          src="@/assets/imgs/orders/search.png"
          alt="search icon"
          class="search__icon"
        />
        <el-input
          placeholder="ابحث في المقالات"
          v-model="searchInput"
        ></el-input>
      </div>

      <!-- Filter by Category -->
      <el-form class="col-lg-4 col-sm-8">
        <el-form-item>
          <el-select
            v-model="categoryFilter"
            @change="filterByCategory"
            placeholder="حدد المقالات باختيار الفئة المناسبة"
            class="w-100"
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.titleAr"
              :value="category.id"
              class="text-center"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- Add Article -->
    <div class="mt-3" v-if="modalTrigger">
      <el-form :rules="topicFormRules" :model="topicForm" ref="topicForm">
        <div class="row">
          <el-form-item label=" " prop="image" class="col-lg-4 col-md-12">
            <label for="formFile" class="form-label"
              >أضف الصورة الخاصة للمقالة</label
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

          <div class="col-lg-8 row">
            <el-form-item class="col-lg-12" prop="category">
              <span>اختر الفئة التي تنتمى اليها المقالة</span>
              <el-select
                v-model="topicForm.category"
                placeholder="اختر الفئات المناسبة"
                class="w-100"
              >
                <el-option
                  v-for="category in categories"
                  :key="category.id"
                  :label="category.titleAr"
                  :value="category.id"
                  class="text-center"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" " class="col-lg-6 col-md-12" prop="titleAr">
              <span>اسم المقالة باللغة العربية</span>
              <el-input
                v-model="topicForm.titleAr"
                placeholder="اكتب اسم المقالة باللغة العربية"
              ></el-input>
            </el-form-item>

            <el-form-item label=" " class="col-lg-6 col-md-12" prop="titleEn">
              <span>اسم المقالة باللغة الانجليزية</span>
              <el-input
                v-model="topicForm.titleEn"
                placeholder="كتب اسم المقالة باللغة الانجليزية"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item label=" " prop="descriptionAr">
          <span>وصف المقالة باللغة العربية</span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="topicForm.descriptionAr"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionEn">
          <span>وصف المقالة باللغة الانجليزية</span>
          <el-input
            dir="ltr"
            type="textarea"
            :rows="4"
            v-model="topicForm.descriptionEn"
          ></el-input>
        </el-form-item>

        <div class="buttons w-100 p-3 d-flex gap-2 justify-content-end">
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="addTopic"
          >
            حفظ
          </button>
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="cancel"
          >
            الغاء
          </button>
        </div>
      </el-form>
    </div>

    <!-- Update Article -->
    <div class="mt-3" v-if="editModalTrigger">
      <el-form :rules="topicFormRules" :model="editTopicForm" ref="topicForm">
        <div class="row">
          <el-form-item label=" " prop="image" class="col-lg-4 col-md-12">
            <label for="formFile" class="form-label"
              >أضف الصورة الخاصة للمقالة</label
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

          <div class="col-lg-8 row">
            <el-form-item label=" " class="col-lg-6 col-md-12" prop="titleAr">
              <span>اسم المقالة باللغة العربية</span>
              <el-input
                v-model="editTopicForm.titleAr"
                placeholder="اكتب اسم المقالة باللغة العربية"
              ></el-input>
            </el-form-item>

            <el-form-item label=" " class="col-lg-6 col-md-12" prop="titleEn">
              <span>اسم المقالة باللغة الانجليزية</span>
              <el-input
                v-model="editTopicForm.titleEn"
                placeholder="Enter the title of the article in English"
                dir="ltr"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item label=" " prop="descriptionAr">
          <span>وصف المقالة باللغة العربية</span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="editTopicForm.descriptionAr"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionEn">
          <span>وصف المقالة باللغة الانجليزية</span>
          <el-input
            dir="ltr"
            type="textarea"
            :rows="4"
            v-model="editTopicForm.descriptionEn"
          ></el-input>
        </el-form-item>

        <div class="buttons w-100 p-3 d-flex gap-2 justify-content-end">
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="editTopic"
          >
            حفظ التغييرات
          </button>
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="cancel"
          >
            الغاء
          </button>
        </div>
      </el-form>
    </div>

    <!-- No Articles -->
    <UIEmpty
      v-if="topics.length < 1 && !modalTrigger"
      imgSrc="articles/no-articles.png"
      alt="no articles"
      caption="قم بإضافة المقالات  التي تنتمى الى هذه الفئة"
    />

    <!-- Articles -->
    <div class="cards" v-if="!modalTrigger" v-show="!editModalTrigger">
      <div
        class="card-item d-flex align-items-center justify-content-around my-2"
        v-for="topic in filteredTopics"
        :key="topic.id"
      >
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <h6
            class="key"
            @click="$router.push(`/articles/${topic.id}`)"
            role="button"
          >
            {{ topic.titleAr }}
          </h6>
          <h6 class="value">
            {{ topic.descriptionAr.split(/\s+/).slice(0, 20).join(" ") }} ...
          </h6>
        </div>
        <div class="align-self-start d-flex gap-2">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            @click="toggleEditModal(topic.id)"
            role="button"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click="deleteTopic(topic)"
            role="button"
          />
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <el-pagination
      v-if="totalPages > 1"
      class="position-relative bottom-0 my-4"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getTopics"
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
      topicForm: {
        image: null,
      },
      topicFormRules: {
        titleAr: [{ required: true, message: "Arabic title Is Required" }],
        titleEn: [{ required: true, message: "English title Is Required" }],
        descriptionAr: [
          { required: true, message: "Arabic description Is Required" },
        ],
        descriptionEn: [
          { required: true, message: "Arabic description Is Required" },
        ],
        category: [{ required: true, message: "Category Is Required" }],
      },
      editTopicForm: {
        image: null,
      },
      selectedImage: null,
      selectedImageUrl: null,
      categories: [],
      topics: [],
      totalPages: 1,
      page: 1,
      targetId: null,
      categoryFilter: "",
    };
  },
  async fetch() {
    await this.getCategories();
    await this.getTopics();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    async toggleEditModal(topicId) {
      const topicRes = await this.$axios.get(`/topics/${topicId}`);
      this.editTopicForm = { ...topicRes.data };
      this.selectedImage = topicRes.data.image;
      this.selectedImageUrl = topicRes.data.image;
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = topicId;
    },
    onImageSeclected(e) {
      if (e.target.files.length > 0) {
        this.selectedImage = this.topicForm.image = e.target.files[0];
        this.selectedImageUrl = URL.createObjectURL(this.selectedImage);
      }
    },
    async getCategories() {
      const categoriesRes = await this.$axios.get("/category");
      this.categories = await categoriesRes.data.docs;
    },
    addTopic() {
      this.$refs.topicForm.validate(async (valid) => {
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
            fd.append("titleAr", this.topicForm.titleAr);
            fd.append("titleEn", this.topicForm.titleEn);
            fd.append("image", this.topicForm.image);
            fd.append("descriptionAr", this.topicForm.descriptionAr);
            fd.append("descriptionEn", this.topicForm.descriptionEn);
            await this.$axios.post(
              `/category/${this.topicForm.category}/topics`,
              fd
            );
            // Reset
            this.topicForm = {};
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.toggleModal();
            await this.getTopics();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async getTopics() {
      let params = { page: this.page };
      const topicsRes = await this.$axios.get("/topics", { params });
      this.topics = await topicsRes.data.docs;
      this.totalPages = await topicsRes.data.totalPages;
      this.page = await topicsRes.data.page;
    },
    cancel() {
      this.topicForm = {
        image: null,
      };
      this.edittopicForm = {
        image: null,
      };
      this.selectedImage = null;
      this.selectedImageUrl = null;
      this.modalTrigger = false;
      this.editModalTrigger = false;
    },
    deleteTopic(topic) {
      this.$confirm(
        `هل انت متاكد من انك تريد حذف هذه المقالة ${topic.titleAr}`,
        "Warning",
        {
          confirmButtonText: "تأكيد",
          cancelButtonText: "الغاء",
          type: "warning",
        }
      )
        .then(async () => {
          this.$message({
            type: "success",
            message: "تم حذف المقالة بنجاح",
          });
          await this.$axios.delete(`topics/${topic.id}`);
          await this.getTopics();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "تم الغاء الحذف",
          });
        });
    },
    editTopic() {
      this.$refs.topicForm.validate(async (valid) => {
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
            fd.append("titleAr", this.editTopicForm.titleAr);
            fd.append("titleEn", this.editTopicForm.titleEn);
            fd.append("image", this.editTopicForm.image);
            fd.append("descriptionAr", this.editTopicForm.descriptionAr);
            fd.append("descriptionEn", this.editTopicForm.descriptionEn);
            await this.$axios.patch(`/topics/${this.targetId}`, fd);
            // Reset
            this.editTopicForm = {};
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.editModalTrigger = false;
            await this.getTopics();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async filterByCategory() {
      let params = { page: this.page };
      const topicsRes = await this.$axios.get(
        `/topics?category=${this.categoryFilter}`,
        { params }
      );
      this.topics = await topicsRes.data.docs;
      this.totalPages = await topicsRes.data.totalPages;
      this.page = await topicsRes.data.page;
    },
  },
  computed: {
    filteredTopics() {
      return this.topics.filter((topic) =>
        topic.titleAr.includes(this.searchInput)
      );
    },
  },
};
</script>
