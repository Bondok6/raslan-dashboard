<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة محافظة" />

    <!-- Add City -->
    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="cityFormRules"
        :model="cityForm"
        ref="cityForm"
      >
        <el-form-item label=" " prop="nameAr">
          <span>المحافظة باللغة العربية</span>
          <el-input
            v-model="cityForm.nameAr"
            placeholder="اكتب اسم المحافظة باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="nameEn">
          <span>المحافظة باللغة الانجليزية</span>
          <el-input
            v-model="cityForm.nameEn"
            placeholder="اكتب اسم المحافظة باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn" @click.prevent="addCity">
          اضافة محافظة
        </button>
      </el-form>
    </UIPopupForm>

    <!-- Update City -->
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="editModalTrigger"
      @update:modalTrigger="closeEditModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="cityFormRules"
        :model="editCityForm"
        ref="editCityForm"
      >
        <el-form-item label=" " prop="nameAr">
          <span>المحافظة</span>
          <el-input
            v-model="editCityForm.nameAr"
            placeholder="اكتب اسم المحافظة الجديد باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="nameEn">
          <span>المحافظة باللغة الانجليزية</span>
          <el-input
            v-model="editCityForm.nameEn"
            placeholder="اكتب اسم المحافظةالجديد باللغة الانجليزية"
            dir="ltr"
          ></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn" @click.prevent="editCity">
          حفظ التغييرات
        </button>
      </el-form>
    </UIPopupForm>

    <!-- No Cities -->
    <UIEmpty
      v-if="allCities.length < 1"
      imgSrc="cities/no-cities.png"
      alt="no cities"
      caption="قم بإضافة المحافظات التابعة للمعمل"
    />

    <!-- Cities -->
    <div class="d-flex flex-wrap my-3">
      <div
        class="d-flex justify-content-between bg-white p-3 m-3 rounded"
        v-for="city in allCities"
        :key="city.id"
      >
        <nuxt-link
          :to="`/cities/${city.id}`"
          class="text-reset text-decoration-none"
        >
          <h6>{{ city.nameAr }}</h6>
        </nuxt-link>

        <div class="options me-5">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            @click="toggleEditModal(city.id)"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click="deleteCity(city)"
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
      @current-change="getAllCities"
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
      cityForm: {},
      cityFormRules: {
        nameAr: [{ required: true, message: "Arabic name Is Required" }],
        nameEn: [{ required: true, message: "English name Is Required" }],
      },
      allCities: [],
      page: 1,
      totalPages: 1,
      editCityForm: {},
      targetId: null,
    };
  },
  async fetch() {
    await this.getAllCities();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    closeEditModal() {
      this.editModalTrigger = !this.editModalTrigger;
    },
    async toggleEditModal(cityId) {
      const cityRes = await this.$axios.get(`/city/${cityId}`);
      this.editCityForm = { ...cityRes.data };
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = cityId;
    },
    addCity() {
      this.$refs.cityForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.post("/city", this.cityForm);
            // Reset
            this.cityForm = {};
            this.toggleModal();
            await this.getAllCities();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async getAllCities() {
      let params = { page: this.page };
      const citiesRes = await this.$axios.get("/cities", { params });
      this.allCities = await citiesRes.data.docs;
      this.totalPages = await citiesRes.data.totalPages;
      this.page = await citiesRes.data.page;
    },
    deleteCity(city) {
      this.$confirm(
        `Are you sure you want to delete ${city.nameAr}`,
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
          await this.$axios.delete(`city/${city.id}`);
          await this.getAllCities();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    editCity() {
      this.$refs.editCityForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.patch(
              `/city/${this.targetId}`,
              this.editCityForm
            );
            // Reset
            this.editCityForm = {};
            this.closeEditModal();
            await this.getAllCities();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
  },
};
</script>
