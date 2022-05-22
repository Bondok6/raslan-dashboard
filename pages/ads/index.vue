<template>
  <section class="page ads-page">
    <UIAddButton @click="toggleModal" buttonText="اضافة اعلان" />

    <!-- Add Ads -->
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

    <!-- Update Ads -->
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="editModalTrigger"
      @update:modalTrigger="toggleEditModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :model="editAdsForm"
        ref="editAdsForm"
      >
        <el-form-item label=" " prop="titleAr">
          <span>عنوان الاعلان الجديد باللغة العربية</span>
          <el-input
            v-model="editAdsForm.titleAr"
            placeholder="اكتب عنوان الاعلان الجديد باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionAr">
          <span> نبذة مختصرة عن الاعلان الجديد باللغة العربية </span>
          <el-input
            type="textarea"
            :rows="2"
            v-model="editAdsForm.descriptionAr"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="titleEn">
          <span>اسم الاعلان الجديد باللغة الانجليزية</span>
          <el-input
            v-model="editAdsForm.titleEn"
            placeholder="اكتب عنوان الاعلان باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionEn">
          <span> نبذة مختصرة عن الاعلان الجديد باللغةالانجليزية </span>
          <el-input
            dir="ltr"
            type="textarea"
            :rows="2"
            v-model="editAdsForm.descriptionEn"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="editAds"
        >
          حفظ التغييرات
        </button>
      </el-form>
    </UIPopupForm>

    <!-- No Ads -->
    <UIEmpty
      v-if="ads.length < 1"
      imgSrc="ads/no-ads.png"
      alt="no ads"
      caption="لم يتم إضافة اى إعلانات بعد"
    />

    <!-- Ads -->
    <div class="cards">
      <div
        class="card-item d-flex justify-content-between my-2"
        v-for="ad in ads"
        :key="ad.id"
      >
        <div class="d-flex align-items-center">
          <img
            :src="ad.image"
            alt="ad image"
            class="card-item--ads__img"
            width="150"
          />

          <div class="p-2">
            <h6>{{ ad.titleAr }}</h6>
            <p>
              {{ ad.descriptionAr }}
            </p>
          </div>
        </div>

        <div class="d-flex gap-3 align-self-start">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            role="button"
            @click="toggleEditModal(ad.id)"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            role="button"
            @click="deleteAds(ad)"
          />
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <el-pagination
      v-if="totalPages > 1"
      class="position-fixed bottom-0"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getAds"
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
      editAdsForm: {},
      ads: [],
      page: 1,
      totalPages: 1,
      targetId: null,
    };
  },
  async fetch() {
    await this.getAds();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    toggleEditModal(id) {
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = id;
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
            fd.append("descriptionEn", this.adsForm.descriptionEn);
            fd.append("image", this.adsForm.image);
            await this.$axios.post("/ads", fd);
            // Reset
            this.adsForm = {};
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.toggleModal();
            await this.getAds();
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
      const adsRes = await this.$axios.get("/ads", { params });
      this.ads = await adsRes.data.docs;
      this.totalPages = await adsRes.data.totalPages;
      this.page = await adsRes.data.page;
    },
    deleteAds(ads) {
      this.$confirm(
        `Are you sure you want to delete ${ads.titleAr}`,
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
          await this.$axios.delete(`ads/${ads.id}`);
          await this.getAds();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    async editAds() {
      await this.$axios.patch(`/ads/${this.targetId}`, this.editAdsForm);
      // Reset
      this.editAdsForm = {};
      this.toggleEditModal();
      await this.getAds();
    },
  },
};
</script>
