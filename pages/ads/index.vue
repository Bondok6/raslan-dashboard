<template>
  <section class="page ads-page">
    <UIAddButton @click="toggleModal" buttonText="اضافة اعلان" />

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="adsFormRules"
        :model="adsForm"
        ref="adsForm"
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
          <span>عنوان الاعلان باللغة العربية</span>
          <el-input
            v-model="adsForm.titleAr"
            placeholder="اكتب عنوان الاعلان باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionAr">
          <span> نبذة مختصرة عن الاعلان باللغة العربية </span>
          <el-input
            type="textarea"
            :rows="2"
            v-model="adsForm.descriptionAr"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="titleEn">
          <span>اسم الاعلان باللغة الانجليزية</span>
          <el-input
            v-model="adsForm.titleEn"
            placeholder="اكتب عنوان الاعلان باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionEn">
          <span> نبذة مختصرة عن الاعلان باللغةالانجليزية </span>
          <el-input
            dir="ltr"
            type="textarea"
            :rows="2"
            v-model="adsForm.descriptionEn"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="addAds"
        >
          اضافة اعلان
        </button>
      </el-form>
    </UIPopupForm>

    <UIEmpty
      v-if="ads.length < 1"
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
      selectedImageUrl: null,
      adsForm: {
        image: null,
      },
      adsFormRules: {
        titleAr: [{ required: true, message: "Arabic title Is Required" }],
        descriptionAr: [
          { required: true, message: "English description Is Required" },
        ],
        titleEn: [{ required: true, message: "English title Is Required" }],
        descriptionEn: [
          { required: true, message: "English description Is Required" },
        ],
      },
      ads: [],
      page: 1,
      totalPages: 1,
    };
  },
  async fetch() {
    await this.getAds();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    onImageSeclected(e) {
      if (e.target.files.length > 0) {
        this.selectedImage = this.adsForm.image = e.target.files[0];
        this.selectedImageUrl = URL.createObjectURL(this.selectedImage);
      }
    },
    addAds() {
      this.$refs.adsForm.validate(async (valid) => {
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
            fd.append("titleAr", this.adsForm.titleAr);
            fd.append("descriptionAr", this.adsForm.titleAr);
            fd.append("titleEn", this.adsForm.titleEn);
            fd.append("descriptionAr", this.adsForm.descriptionEn);
            fd.append("image", this.adsForm.image);
            await this.$axios.post("/ads", fd);
            // Reset
            this.adsForm = {};
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.toggleModal();
            // this.getAds();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async getAds() {
      let params = { page: this.page };
      const adsRes = await this.$axios.get("/ads?branches=10", { params });
      this.ads = await adsRes.data.docs;
      this.totalPages = await adsRes.data.totalPages;
      this.page = await adsRes.data.page;
      console.log(this.ads);
    },
  },
};
</script>
