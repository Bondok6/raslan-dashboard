<template>
  <section v-if="!$fetchState.pending">
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="editModalTrigger"
      @update:modalTrigger="toggleEditModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="editCityFormRules"
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

    <div class="d-flex flex-wrap my-3">
      <div class="d-flex justify-content-between bg-white p-3 m-3 rounded">
        <h6>{{ city.nameAr }}</h6>

        <div class="options me-5">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            @click="toggleEditModal"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click="deleteCity(city)"
          />
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
      city: {},
      editCityForm: {},
      editCityFormRules: {
        nameAr: [{ required: true, message: "Arabic name Is Required" }],
        nameEn: [{ required: true, message: "English name Is Required" }],
      },
    };
  },
  async fetch() {
    await this.getCity();
  },
  methods: {
    toggleEditModal() {
      this.editCityForm = this.city;
      this.editModalTrigger = !this.editModalTrigger;
    },
    async getCity() {
      const cityRes = await this.$axios.get(`/city/${this.$route.params.id}`);
      this.city = await cityRes.data;
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
          this.$router.push("/cities");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    async editCity() {
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
              `city/${this.$route.params.id}`,
              this.editCityForm
            );
            this.editCityForm = {};
            this.getCity();
            this.editModalTrigger = false;
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
