<template>
  <section v-if="!$fetchState.pending">
    <UIAddButton @click="toggleModal" buttonText="اضافة او تعديل معلومة" />

    <!-- No Info -->
    <UIEmpty
      v-if="!info && !formToggle"
      imgSrc="about/no-info.png"
      alt="no info"
      caption="قم بإضافة معلومات تخص المعمل"
    />

    <!-- Add or Update Info -->
    <div v-if="formToggle" class="add-info">
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="aboutFormRules"
        :model="aboutForm"
        ref="aboutForm"
      >
        <el-form-item label=" " prop="image">
          <div class="d-flex">
            <div class="w-50">
              <label for="formFile" class="form-label"
                >أضف الايقون التي تعبر عن المعلومة</label
              >
              <input
                class="form-control"
                type="file"
                id="formFile"
                @change="onImageSeclected"
                accept="image/png, image/jpeg"
              />
            </div>
            <div class="text-center w-50">
              <img
                :src="selectedImageUrl"
                alt="preview"
                v-if="selectedImageUrl"
                width="150"
                height="150"
              />
            </div>
          </div>
        </el-form-item>

        <el-form-item label=" " prop="descriptionAr">
          <span> اضافة وصف باللغة العربية </span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="aboutForm.descriptionAr"
            placeholder="اكتب الوصف المناسب باللعة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionEn">
          <span> اضافة وصف باللغة الانجليزية </span>
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

    <!-- Info -->
    <div class="cards mt-3" v-if="!formToggle">
      <div class="card-item card-item--ads card-item--ads--large">
        <div>
          <img
            :src="info.image"
            alt="ad image"
            class="card-item__img"
            width="150"
          />
        </div>
        <div class="w-100 d-flex flex-column">
          <div class="align-self-end">
            <img
              src="@/assets/imgs/edit-icon.png"
              alt="edit icon"
              role="button"
              @click="toggleModal"
            />
          </div>
          <p class="px-4">
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
      aboutForm: { image: null },
      aboutFormRules: {
        descriptionAr: [
          { required: true, message: "Arabic description Is Required" },
        ],
        descriptionEn: [
          { required: true, message: "English description Is Required" },
        ],
      },
      info: null,
    };
  },
  async fetch() {
    await this.getInfo();
  },
  methods: {
    toggleModal() {
      this.formToggle = !this.formToggle;
      this.aboutForm = {};
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
      this.info = await infoRes.data;
    },
  },
};
</script>
