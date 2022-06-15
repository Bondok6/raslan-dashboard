<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة فرع" />

    <!-- Add Branch -->
    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="branchFormRules"
        :model="branchForm"
        ref="branchForm"
      >
        <div class="d-flex gap-3">
          <el-form-item prop="city" class="d-flex flex-column">
            <span>اختر المحافظة</span>
            <el-select
              v-model="branchForm.city"
              placeholder="اختر المحافظة"
              @change="getRegions(branchForm.city)"
            >
              <el-option
                v-for="city in allCities"
                :key="city.id"
                :label="city.nameAr"
                :value="city.id"
                class="text-center"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="region" class="d-flex flex-column">
            <span>اختر المنطقة</span>
            <el-select v-model="branchForm.region" placeholder="اختر المنطقة">
              <el-option
                v-for="region in allRegions"
                :key="region.id"
                :label="region.nameAr"
                :value="region.id"
                class="text-center"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="d-flex gap-3">
          <el-form-item class="d-flex flex-column" prop="titleAr">
            <span>العنوان باللغة العربية</span>
            <el-input
              placeholder="العنوان"
              v-model="branchForm.titleAr"
            ></el-input>
          </el-form-item>

          <el-form-item class="d-flex flex-column" prop="titleEn">
            <span>العنوان باللغة الانجليزية</span>
            <el-input
              placeholder="Enter an anddress in English"
              v-model="branchForm.titleEn"
              dir="ltr"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item prop="location">
          <span>رابط الموقع على الخريطة</span>
          <el-input
            placeholder="Enter the link of the location"
            v-model="branchForm.location"
            dir="ltr"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="addBranch"
        >
          اضافة فرع
        </button>
      </el-form>
    </UIPopupForm>

    <!-- UpdateBranch -->
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="editModalTrigger"
      @update:modalTrigger="closeEditModal"
    >
      <el-form
        class="p-5 d-flex flex-column gap-2"
        :rules="branchFormRules"
        :model="editBranchForm"
        ref="editBranchForm"
      >
        <div class="d-flex gap-3">
          <el-form-item class="d-flex flex-column" prop="titleAr">
            <span>العنوان الجديد باللغة العربية</span>
            <el-input
              placeholder="العنوان"
              v-model="editBranchForm.titleAr"
            ></el-input>
          </el-form-item>

          <el-form-item class="d-flex flex-column" prop="titleEn">
            <span>العنوان الجديد باللغة الانجليزية</span>
            <el-input
              placeholder="Enter a new address in English"
              v-model="editBranchForm.titleEn"
              dir="ltr"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item prop="location">
          <span>رابط الموقع على الخريطة</span>
          <el-input
            placeholder="ادخل رابط الموقع الجديد على الخريطة"
            v-model="editBranchForm.location"
            dir="ltr"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="editBranch"
        >
          حفظ التغييرات
        </button>
      </el-form>
    </UIPopupForm>

    <!-- No Regions -->
    <UIEmpty
      v-if="!allBranches"
      imgSrc="branches/no-branches.png"
      alt="no branches"
      caption="قم بإضافة الفروع الخاصة بالمعمل"
    />

    <!-- Regions -->
    <div class="cards">
      <div
        class="card-item card-item--branch my-2"
        v-for="branch in allBranches"
        :key="branch.id"
      >
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">المحافظة</h6>
            <h6 class="value">{{ branch.city.nameAr }}</h6>
          </div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">المنطقة</h6>
            <h6 class="value">{{ branch.region.nameAr }}</h6>
          </div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">العنوان</h6>
            <h6 class="value">{{ branch.titleAr }}</h6>
          </div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">الموقع</h6>
            <a
              class="value orange-text"
              :href="branch.location"
              target="_blanck"
              >اضغط هنا</a
            >
          </div>
        </div>
        <div class="options">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            @click="toggleEditModal(branch.id)"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click="deleteBranch(branch)"
          />
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
      @current-change="getAllBranches"
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
      allRegions: [],
      allCities: [],
      allBranches: [],
      branchForm: {},
      branchFormRules: {
        city: [{ required: true, message: "City Is Required" }],
        region: [{ required: true, message: "Region Is Required" }],
        titleAr: [{ required: true, message: "Arabic title Is Required" }],
        titleEn: [{ required: true, message: "English title Is Required" }],
        location: [{ required: true, message: "Location Is Required" }],
      },
      editBranchForm: {},
      targetId: null,
      page: 1,
      totalPages: 1,
    };
  },
  async fetch() {
    await this.getAllCities();
    await this.getAllBranches();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    closeEditModal() {
      this.editModalTrigger = !this.editModalTrigger;
    },
    async toggleEditModal(branchId) {
      const branchRes = await this.$axios.get(`/branch/${branchId}`);
      this.editBranchForm = { ...branchRes.data };
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = branchId;
    },
    async getAllCities() {
      const citiesRes = await this.$axios.get("/cities");
      this.allCities = await citiesRes.data.docs;
    },
    async getRegions(city) {
      const regionsRes = await this.$axios.get(`/regions?city=${city}`);
      this.allRegions = await regionsRes.data.docs;
    },
    async getAllBranches() {
      let params = { page: this.page };
      const branchesRes = await this.$axios.get("/branches", { params });
      this.allBranches = await branchesRes.data.docs;
      this.totalPages = await branchesRes.data.totalPages;
      this.page = await branchesRes.data.page;
    },
    addBranch() {
      this.$refs.branchForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.post(
              `/region/${this.branchForm.region}/branch`,
              this.branchForm
            );
            // Reset
            this.branchForm = {};
            this.toggleModal();
            await this.getAllBranches();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    deleteBranch(branch) {
      this.$confirm(
        `هل انت متأكد من انك تريد حذف هذا الفرع ${branch.titleAr}`,
        "Warning",
        {
          confirmButtonText: "تأكيد",
          cancelButtonText: "الغاء",
          type: "warning",
        }
      )
        .then(async () => {
          this.$message({
            type: "success",
            message: "تم حذف الفرع بنجاح",
          });
          await this.$axios.delete(`branch/${branch.id}`);
          await this.getAllBranches();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "تم الغاء الحذف",
          });
        });
    },
    editBranch() {
      this.$refs.editBranchForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.patch(
              `/branch/${this.targetId}`,
              this.editBranchForm
            );
            // Reset
            this.editBranchForm = {};
            this.closeEditModal();
            await this.getAllBranches();
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
