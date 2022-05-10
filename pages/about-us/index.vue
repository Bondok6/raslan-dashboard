<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة معلومات" />

    <UIEmpty
      v-if="aboutData.length < 1 && !formToggle"
      imgSrc="about/no-info.png"
      alt="no info"
      caption="قم بإضافة معلومات تخص المعمل"
    />

    <div v-if="formToggle" class="add-info">
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="aboutFormRules"
        :model="aboutForm"
        ref="aboutForm"
      >
        <el-form-item label=" " prop="image">
          <input type="file" @change="onImageSeclected" required />
          <img :src="selectedImageUrl" alt="" v-if="selectedImageUrl" />
        </el-form-item>

        <el-form-item label=" " prop="descriptionAr">
          <span class="demo-input-label"> اضافة وصف باللغة العربية </span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="aboutForm.descriptionAr"
            placeholder="اكتب الوصف المناسب باللعة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionEn">
          <span class="demo-input-label"> اضافة وصف باللغة الانجليزية </span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="aboutForm.descriptionEn"
            placeholder="اكتب الوصف المناسب باللعة الانجليزية"
          ></el-input>
        </el-form-item>

        <div class="buttons w-100 m-4 d-flex gap-2 justify-content-end">
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="addInfo"
          >
            حفظ
          </button>
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click="toggleModal"
          >
            الغاء
          </button>
        </div>
      </el-form>
    </div>

    <div
      class="cards"
      v-for="info in aboutData"
      :key="info.id"
      v-show="!formToggle"
    >
      <div class="card-item card-item--ads card-item--ads--large">
        <div class="">
          <img
            :src="info.image"
            alt="ad image"
            class="card-item__img"
            width="300"
          />
        </div>
        <div class="w-100 d-flex flex-column">
          <div class="options align-self-end">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
          <p>
            {{ info.descriptionAr }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      formToggle: false,
      selectedImage: null,
      selectedImageUrl: null,
      aboutForm: {
        image: null,
      },
      aboutFormRules: {
        descriptionAr: [
          { required: true, message: "Arabic description Is Required" },
        ],
        descriptionEn: [
          { required: true, message: "English description Is Required" },
        ],
      },
      aboutData: [],
    };
  },
  async fetch() {
    await this.getInfo();
  },
  methods: {
    toggleModal() {
      this.formToggle = !this.formToggle;
    },
    onImageSeclected(e) {
      if (e.target.files.length > 0) {
        this.selectedImage = this.aboutForm.image = e.target.files[0];
        this.selectedImageUrl = URL.createObjectURL(this.selectedImage);
      }
    },
    addInfo() {
      this.$refs.aboutForm.validate(async (valid) => {
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
            fd.append("descriptionAr", this.aboutForm.descriptionAr);
            fd.append("descriptionEn", this.aboutForm.descriptionEn);
            fd.append("image", this.aboutForm.image);
            await this.$axios.post("/about", fd);
            // Reset
            this.aboutForm = {};
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.toggleModal();
            this.getInfo();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async getInfo() {
      const infoRes = await this.$axios.get("/about");
      const info = await infoRes.data;
      this.aboutData.push(info);
    },
  },
};
</script>
