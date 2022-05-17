<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة منطقة" />

    <!-- Add Region -->
    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="regionFormRules"
        :model="regionForm"
        ref="regionForm"
      >
        <el-form-item prop="city">
          <span class="d-block">اختر المحافظة</span>
          <el-select v-model="regionForm.city" placeholder="المحافظة">
            <el-option
              v-for="city in allCities"
              :key="city.id"
              :label="city.nameAr"
              :value="city.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" " prop="nameAr">
          <span>المنطقة</span>
          <el-input
            v-model="regionForm.nameAr"
            placeholder="اكتب اسم المنطقة باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="nameEn">
          <span>المنطقة باللغة الانجليزية</span>
          <el-input
            v-model="regionForm.nameEn"
            placeholder="اكتب اسم المنطقة باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn" @click.prevent="addRegion">
          اضافة منطقة
        </button>
      </el-form>
    </UIPopupForm>

    <!-- Update Region -->
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="editModalTrigger"
      @update:modalTrigger="toggleEditModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="editRegionFormRules"
        :model="editRegionForm"
        ref="editRegionForm"
      >
        <el-form-item label=" " prop="nameAr">
          <span>المنطقة</span>
          <el-input
            v-model="editRegionForm.nameAr"
            placeholder="اكتب اسم المنطقة الجديد باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="nameEn">
          <span>المنطقة باللغة الانجليزية</span>
          <el-input
            v-model="editRegionForm.nameEn"
            placeholder="اكتب اسم المنطقة الجديد باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn" @click.prevent="editRegion">
          حفظ التغييرات
        </button>
      </el-form>
    </UIPopupForm>

    <!-- No Regions -->
    <UIEmpty
      v-if="!regions"
      imgSrc="cities/no-cities.png"
      alt="no cities"
      caption="قم بإضافة المناطق التابعة للمعمل"
    />

    <!-- Regions -->
    <div class="d-flex flex-wrap">
      <div
        v-for="region in regions"
        :key="region.id"
        class="d-flex flex-wrap justify-content-between bg-white p-3 m-3 rounded"
      >
        <div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">المحافظة</h6>
            <h6 class="value">{{ region.city.nameAr }}</h6>
          </div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">المنطقة</h6>
            <h6 class="value">{{ region.nameAr }}</h6>
          </div>
        </div>
        <div class="options justify-self-end me-5">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            @click="toggleEditModal(region.id)"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click="deleteRegion(region)"
          />
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <el-pagination
      class="position-fixed bottom-0"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getAllRegions"
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
      allCities: [],
      regionForm: {},
      regionFormRules: {
        city: [{ required: true, message: "City Is Required" }],
        nameAr: [{ required: true, message: "Arabic name Is Required" }],
        nameEn: [{ required: true, message: "English name Is Required" }],
      },
      editRegionForm: {},
      editRegionFormRules: {
        nameAr: [{ required: true, message: "Arabic name Is Required" }],
        nameEn: [{ required: true, message: "English name Is Required" }],
      },
      regions: null,
      region: null,
      targetId: null,
      page: 1,
      totalPages: 1,
    };
  },
  async fetch() {
    await this.getAllCities();
    await this.getAllRegions();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    toggleEditModal(regionId) {
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = regionId;
    },
    async getAllCities() {
      const citiesRes = await this.$axios.get("/cities");
      this.allCities = await citiesRes.data.docs;
    },
    async getAllRegions() {
      let params = { page: this.page };
      const regionsRes = await this.$axios.get("/regions", { params });
      this.regions = await regionsRes.data.docs;
      this.totalPages = await regionsRes.data.totalPages;
      this.page = await regionsRes.data.page;
    },
    addRegion() {
      this.$refs.regionForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.post(
              `/city/${this.regionForm.city}/region`,
              this.regionForm
            );
            // Reset
            this.regionForm = {};
            this.toggleModal();
            await this.getAllRegions();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    deleteRegion(region) {
      this.$confirm(
        `Are you sure you want to delete ${region.nameAr}`,
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
          await this.$axios.delete(`region/${region.id}`);
          await this.getAllRegions();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    editRegion() {
      this.$refs.editRegionForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.patch(
              `/region/${this.targetId}`,
              this.editRegionForm
            );
            // Reset
            this.editRegionForm = {};
            this.toggleEditModal();
            await this.getAllRegions();
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
