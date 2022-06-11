<template>
  <section v-if="!$fetchState.pending">
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

    <!-- Article  -->
    <div class="bg-white m-5 p-5" v-if="!editModalTrigger">
      <div class="d-flex flex-column">
        <div class="align-self-end">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            class="m-2"
            @click="toggleEditModal()"
            role="button"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click="deleteTopic(topic)"
            role="button"
          />
        </div>

        <div class="align-self-center">
          <img :src="topic.image" alt="topic image" width="200" />
        </div>
      </div>

      <div class="mt-5 d-flex flex-column gap-3">
        <div>
          <h6 class="orange-text">اسم المقالة</h6>
          <h6 class="key">{{ topic.titleAr }}</h6>
        </div>
        <div>
          <h6 class="orange-text">محتوى المقالة</h6>
          <h6 class="key lh-lg" style="text-align: justify">
            {{ topic.descriptionAr }}
          </h6>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      editModalTrigger: false,
      topic: {},
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
      editTopicForm: {},
      selectedImage: null,
      selectedImageUrl: null,
      categories: [],
    };
  },
  async fetch() {
    await this.getTopic();
    await this.getCategories();
  },
  methods: {
    toggleEditModal() {
      this.editModalTrigger = !this.editModalTrigger;
    },
    onImageSeclected(e) {
      if (e.target.files.length > 0) {
        this.selectedImage = this.editTopicForm.image = e.target.files[0];
        this.selectedImageUrl = URL.createObjectURL(this.selectedImage);
      }
    },
    async getTopic() {
      const topicRes = await this.$axios.get(
        `/topics/${this.$route.params.id}`
      );
      this.topic = await topicRes.data;
    },
    async getCategories() {
      const categoriesRes = await this.$axios.get("/category");
      this.categories = await categoriesRes.data.docs;
    },
    deleteTopic(topic) {
      this.$confirm(
        `هل انت متأكد من انك تريد حذف هذة المقالة ${topic.titleAr}`,
        "Warning",
        {
          confirmButtonText: "تاكيد",
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
          this.$router.push("/articles");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "تم الغاء الحذف",
          });
        });
    },
    async toggleEditModal() {
      const topicRes = await this.$axios.get(
        `/topics/${this.$route.params.id}`
      );
      this.editTopicForm = { ...topicRes.data };
      this.selectedImage = topicRes.data.image;
      this.selectedImageUrl = topicRes.data.image;
      this.editModalTrigger = !this.editModalTrigger;
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
            await this.$axios.patch(`/topics/${this.$route.params.id}`, fd);
            // Reset
            this.editTopicForm = {};
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.editModalTrigger = false;
            await this.getTopic();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    cancel() {
      this.edittopicForm = {
        image: null,
      };
      this.selectedImage = null;
      this.selectedImageUrl = null;
      this.editModalTrigger = false;
    },
  },
};
</script>
