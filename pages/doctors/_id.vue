<template>
  <div>
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="teamEditFormRules"
        :model="teamEditForm"
        ref="teamForm"
      >
        <el-form-item label=" " prop="image">
          <label for="formFile" class="form-label"
            >أضف الصورة الخاصة بدكتور المعمل</label
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

        <div class="d-flex gap-2">
          <el-form-item label=" " prop="nameAr">
            <span> اسم الطبيب باللغة العربية </span>
            <el-input
              v-model="teamEditForm.nameAr"
              placeholder="اكتب اسم الطبيب باللغة العربية"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " prop="nameEn">
            <span> اسم الطبيب باللغة الانجليزية </span>
            <el-input
              v-model="teamEditForm.nameEn"
              placeholder="اكتب اسم الطبيب باللغة الانجليزية"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label=" " prop="descriptionAr">
          <span> نبذة مختصرة عن الطبيب باللغة العربية </span>
          <el-input
            type="textarea"
            :rows="2"
            v-model="teamEditForm.descriptionAr"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionEn">
          <span> نبذة مختصرة عن الطبيب باللغةالانجليزية </span>
          <el-input
            dir="ltr"
            type="textarea"
            :rows="2"
            v-model="teamEditForm.descriptionEn"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="editDoctor"
        >
          حفظ التغييرات
        </button>
      </el-form>
    </UIPopupForm>

    <div class="bg-white m-5 p-5">
      <div class="d-flex flex-column">
        <div class="align-self-end">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            class="m-2"
            role="button"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click="deleteCity(doctor)"
            role="button"
          />
        </div>

        <div class="align-self-center">
          <img :src="doctor.image" alt="doctor image" width="200" />
        </div>
      </div>

      <div class="mt-5 d-flex flex-column gap-3">
        <div>
          <h6 class="orange-text">اسم الطبيب</h6>
          <h6 class="key">{{ doctor.nameAr }}</h6>
        </div>
        <div>
          <h6 class="orange-text">نبذة مختصره عن الطبيب</h6>
          <h6 class="key">{{ doctor.descriptionAr }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editModalTrigger: false,
      doctor: {},
      selectedImage: null,
      selectedImageUrl: null,
      teamEditForm: {
        image: null,
      },
      teamEditFormRules: {
        nameAr: [{ required: true, message: "Arabic name Is Required" }],
        nameEn: [{ required: true, message: "English name Is Required" }],
        descriptoinAr: [
          { required: true, message: "Arabic descriptoin Is Required" },
        ],
        descriptoinEn: [
          { required: true, message: "English descriptoin Is Required" },
        ],
      },
    };
  },
  async fetch() {
    this.getDoctor();
  },
  methods: {
    toggleModal() {
      this.editModalTrigger = !this.editModalTrigger;
    },
    async getDoctor() {
      const doctor = await this.$axios.get(`/team/${this.$route.params.id}`);
      this.doctor = await doctor.data;
    },
    deleteCity(doctor) {
      this.$confirm(
        `Are you sure you want to delete ${doctor.nameAr}`,
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
          await this.$axios.delete(`team/${doctor.id}`);
          this.$router.push("/doctors");
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

<style></style>
