<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة طبيب" />

    <!-- Search -->
    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input
        placeholder="ابحث في الفريق الطبي"
        v-model="searchInput"
      ></el-input>
    </div>

    <!-- Add Doctor -->
    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="teamFormRules"
        :model="teamForm"
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
              v-model="teamForm.nameAr"
              placeholder="اكتب اسم الطبيب باللغة العربية"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " prop="nameEn">
            <span> اسم الطبيب باللغة الانجليزية </span>
            <el-input
              v-model="teamForm.nameEn"
              placeholder="اكتب اسم الطبيب باللغة الانجليزية"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label=" " prop="descriptionAr">
          <span> نبذة مختصرة عن الطبيب باللغة العربية </span>
          <el-input
            type="textarea"
            :rows="2"
            v-model="teamForm.descriptionAr"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionEn">
          <span> نبذة مختصرة عن الطبيب باللغةالانجليزية </span>
          <el-input
            dir="ltr"
            type="textarea"
            :rows="2"
            v-model="teamForm.descriptionEn"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="addDoctor"
        >
          اضافة طبيب
        </button>
      </el-form>
    </UIPopupForm>

    <!-- Update Doctor -->
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="editModalTrigger"
      @update:modalTrigger="closeEditModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="teamFormRules"
        :model="editTeamForm"
        ref="editTeamForm"
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
            <span> اسم الطبيب الجديد باللغة العربية </span>
            <el-input
              v-model="editTeamForm.nameAr"
              placeholder="اكتب اسم الطبيب باللغة العربية"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " prop="nameEn">
            <span> اسم الطبيب الجديد باللغة الانجليزية </span>
            <el-input
              v-model="editTeamForm.nameEn"
              placeholder="اكتب اسم الطبيب باللغة الانجليزية"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label=" " prop="descriptionAr">
          <span> نبذة مختصرة عن الطبيب باللغة العربية </span>
          <el-input
            type="textarea"
            :rows="2"
            v-model="editTeamForm.descriptionAr"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="descriptionEn">
          <span> نبذة مختصرة عن الطبيب باللغةالانجليزية </span>
          <el-input
            dir="ltr"
            type="textarea"
            :rows="2"
            v-model="editTeamForm.descriptionEn"
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

    <!-- No Doctors -->
    <UIEmpty
      v-if="team"
      imgSrc="doctors/no-doctors.png"
      alt="no doctors"
      caption="قم بإضافة الفريق الطبي الخاص بالمعمل "
    />

    <!-- Doctors -->
    <div class="cards">
      <div
        class="card-item card-item--ads my-2"
        v-for="doctor in filteredTeam"
        :key="doctor.id"
      >
        <nuxt-link :to="`/doctors/${doctor.id}`">
          <img :src="doctor.image" alt="ad image" width="150" />
        </nuxt-link>
        <div class="d-flex flex-column w-100">
          <div class="align-self-end">
            <img
              src="@/assets/imgs/edit-icon.png"
              alt="edit icon"
              @click="toggleEditModal(doctor.id)"
              role="button"
              class="mx-2"
            />
            <img
              src="@/assets/imgs/delete-icon.png"
              alt="delete icon"
              @click="deleteDoctor(doctor)"
              role="button"
            />
          </div>
          <h6>{{ doctor.nameAr }}</h6>
          <p>
            <img src="@/assets/imgs/doctors/member.png" alt="member" />
            {{ doctor.descriptionAr }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <el-pagination
      class="position-relative bottom-0 my-4"
      v-if="totalPages > 1"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getTeam"
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
      teamForm: {
        image: null,
      },
      teamFormRules: {
        image: [{ required: true, message: "Image Is Required" }],
        nameAr: [{ required: true, message: "Arabic name Is Required" }],
        nameEn: [{ required: true, message: "English name Is Required" }],
        descriptionAr: [
          { required: true, message: "Arabic descriptoin Is Required" },
        ],
        descriptionEn: [
          { required: true, message: "English descriptoin Is Required" },
        ],
      },
      team: null,
      page: 1,
      totalPages: 1,
      targetId: null,
      editTeamForm: {},
    };
  },
  async fetch() {
    await this.getTeam();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    closeEditModal() {
      this.editModalTrigger = !this.editModalTrigger;
      this.selectedImage = null;
      this.selectedImageUrl = null;
    },
    async toggleEditModal(doctorId) {
      const docRes = await this.$axios.get(`/team/${doctorId}`);
      this.editTeamForm = { ...docRes.data };
      this.selectedImage = docRes.data.image;
      this.selectedImageUrl = docRes.data.image;
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = doctorId;
    },
    onImageSeclected(e) {
      if (e.target.files.length > 0) {
        this.selectedImage = this.teamForm.image = e.target.files[0];
        this.editTeamForm.image = e.target.files[0];
        this.selectedImageUrl = URL.createObjectURL(this.selectedImage);
      }
    },
    addDoctor() {
      this.$refs.teamForm.validate(async (valid) => {
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
            fd.append("nameAr", this.teamForm.nameAr);
            fd.append("nameEn", this.teamForm.nameEn);
            fd.append("image", this.teamForm.image);
            fd.append("descriptionAr", this.teamForm.descriptionAr);
            fd.append("descriptionEn", this.teamForm.descriptionEn);
            await this.$axios.post("/team", fd);
            // Reset
            this.teamForm = {};
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.toggleModal();
            await this.getTeam();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async getTeam() {
      let params = { page: this.page };
      const teamRes = await this.$axios.get("/teams", { params });
      this.team = await teamRes.data.docs;
      this.totalPages = await teamRes.data.totalPages;
      this.page = await teamRes.data.page;
    },
    deleteDoctor(doctor) {
      this.$confirm(
        `هل انت متأكد من انك تريد حذف هذا الطبيب ${doctor.nameAr}`,
        "Warning",
        {
          confirmButtonText: "تأكيد",
          cancelButtonText: "إلغاء",
          type: "warning",
        }
      )
        .then(async () => {
          this.$message({
            type: "success",
            message: "تم حذف الطبيب بنجاح",
          });
          await this.$axios.delete(`team/${doctor.id}`);
          await this.getTeam();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "تم إلغاء الحذف",
          });
        });
    },
    editDoctor() {
      this.$refs.editTeamForm.validate(async (valid) => {
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
            fd.append("nameAr", this.editTeamForm.nameAr);
            fd.append("nameEn", this.editTeamForm.nameEn);
            fd.append("image", this.editTeamForm.image);
            fd.append("descriptionAr", this.editTeamForm.descriptionAr);
            fd.append("descriptionEn", this.editTeamForm.descriptionEn);
            await this.$axios.patch(`/team/${this.targetId}`, fd);
            // Reset
            this.editTeamForm = {};
            this.closeEditModal();
            await this.getTeam();
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
    filteredTeam() {
      if (this.team) {
        return this.team.filter((doctor) =>
          doctor.nameAr.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }
    },
  },
};
</script>
