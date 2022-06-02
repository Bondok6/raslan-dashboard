<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة باقة" />

    <!-- Search -->
    <div class="search w-50" v-if="!modalTrigger">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input placeholder="ابحث في الباقات" v-model="searchInput"></el-input>
    </div>

    <!-- Add Package -->
    <div class="mt-3" v-if="modalTrigger">
      <el-form
        :rules="packagesFormRules"
        :model="packagesForm"
        ref="packagesForm"
      >
        <div class="row">
          <el-form-item label=" " prop="image" class="col-lg-4 col-md-12">
            <label for="formFile" class="form-label"
              >أضف الايقون التي تعبر عن الباقة</label
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

          <div class="col-lg-8 row">
            <el-form-item label=" " class="col-lg-6 col-md-12" prop="titleAr">
              <span>اسم الباقة باللغة العربية</span>
              <el-input
                v-model="packagesForm.titleAr"
                placeholder="اكتب اسم الباقة باللغة العربية"
              ></el-input>
            </el-form-item>

            <el-form-item label=" " class="col-lg-6 col-md-12" prop="titleEn">
              <span>اسم الباقة باللغة الانجليزية</span>
              <el-input
                v-model="packagesForm.titleEn"
                placeholder="كتب اسم الباقة باللغة الانجليزية"
              ></el-input>
            </el-form-item>

            <el-form-item class="col-lg-12" prop="branches">
              <span>اختر الفروع التي ينتمى اليها</span>
              <el-select
                v-model="packagesForm.branches"
                placeholder="الفروع"
                class="w-100"
                multiple
              >
                <el-option
                  v-for="branch in allBranches"
                  :key="branch.id"
                  :label="branch.city.nameAr + ', ' + branch.titleAr"
                  :value="branch.id"
                  class="text-center"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <el-form-item
            label=" "
            class="col-lg-4 col-md-12"
            prop="priceAfterDiscount"
          >
            <span>السعر النهائي</span>
            <el-input
              v-model="packagesForm.priceAfterDiscount"
              placeholder="اكتب السعر"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " class="col-lg-4 col-md-12" prop="pice">
            <span>السعر قبل الخصم</span>
            <el-input
              v-model="packagesForm.price"
              placeholder="اكتب السعر"
            ></el-input>
          </el-form-item>

          <el-form-item class="col-lg-4 col-md-12" prop="availableAt">
            <span>مكان الحجز</span>
            <el-select
              v-model="packagesForm.availableAt"
              placeholder="اختر مكان الحجز"
              class="w-100"
              @change="getTests(packagesForm.availableAt)"
            >
              <el-option
                v-for="[key, val] of Object.entries(locations)"
                :key="key"
                :label="val"
                :value="key"
                class="text-center"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item class="col-lg-12" prop="tests">
            <span>التحاليل التي تتكون منها الباقة</span>
            <el-select
              v-model="packagesForm.tests"
              placeholder="اختر التحاليل المناسبة"
              class="w-100"
              multiple
            >
              <el-option
                v-for="test in tests"
                :key="test.id"
                :label="test.titleAr"
                :value="test.id"
                class="text-center"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label=" " class="col-lg-8 col-md-12" prop="measuresAr">
            <span>الإجراءات الازمة باللغة العربية</span>
            <div class="d-flex gap-3">
              <el-input
                v-model="measuresAr"
                placeholder="اكتب الإجراء اللازم باللغة العربية ثم اضغط علي زر (اضافة) وقم بكتابه اجراء اخر اذا وجد"
              ></el-input>
              <button
                type="button"
                @click="addMeasureAr(measuresAr)"
                class="primary-btn px-3 d-flex gap-2"
              >
                اضافة
                <span class="badge bg-white purple-text">{{
                  this.packagesForm.measuresAr.length
                }}</span>
              </button>
            </div>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label=" " class="col-lg-8 col-md-12" prop="measuresEn">
            <span>الإجراءات الازمة باللغة الانجليزية</span>
            <div class="d-flex gap-3">
              <el-input
                v-model="measuresEn"
                placeholder="اكتب الإجراء اللازم باللغة الانجليزية ثم اضغط علي زر (اضافة) وقم بكتابه اجراء اخر اذا وجد"
              ></el-input>
              <button
                type="button"
                @click="addMeasureEn(measuresEn)"
                class="primary-btn px-3 d-flex gap-2"
              >
                اضافة
                <span class="badge bg-white purple-text">{{
                  this.packagesForm.measuresEn.length
                }}</span>
              </button>
            </div>
          </el-form-item>
        </div>
        <div class="buttons w-100 p-3 d-flex gap-2 justify-content-end">
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="addPackage"
          >
            حفظ
          </button>
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="cancel"
          >
            الغاء
          </button>
        </div>
      </el-form>
    </div>

    <!-- No Packages -->
    <UIEmpty
      v-if="packages.length < 1"
      imgSrc="analysis/no-analysis.png"
      alt="no analysis"
      caption="قم بإضافة التحاليل التابعة للمعمل"
    />

    <!-- Packages -->
    <div class="cards" v-if="!modalTrigger">
      <div
        class="card-item d-flex align-items-center justify-content-around my-2"
        v-for="pack in filteredPackages"
        :key="pack.id"
      >
        <div
          class="icon"
          @click="$router.push(`/packages/${pack.id}`)"
          role="button"
        >
          <img :src="pack.image" alt="icon" width="100" height="100" />
        </div>
        <div class="content mx-2">
          <h6 @click="$router.push(`/packages/${pack.id}`)" role="button">
            {{ pack.titleAr }}
          </h6>
          <div class="d-flex pt-2" v-if="pack.availableAt == 'both'">
            <figure class="ms-2">
              <img src="@/assets/imgs/analysis/heal.png" alt="heal" />
              <figcaption class="d-inline">زيارة منزلية</figcaption>
            </figure>
            <figure>
              <img src="@/assets/imgs/analysis/check.png" alt="check" />
              <figcaption class="d-inline">حجز خارجي</figcaption>
            </figure>
          </div>
          <div class="d-flex pt-2" v-else-if="pack.availableAt == 'home'">
            <figure class="ms-2">
              <img src="@/assets/imgs/analysis/heal.png" alt="heal" />
              <figcaption class="d-inline">زيارة منزلية</figcaption>
            </figure>
          </div>
          <div class="d-flex pt-2" v-else>
            <figure>
              <img src="@/assets/imgs/analysis/check.png" alt="check" />
              <figcaption class="d-inline">حجز خارجي</figcaption>
            </figure>
          </div>
        </div>
        <div>
          <div class="options">
            <img
              src="@/assets/imgs/edit-icon.png"
              alt="edit icon"
              @click="$router.push(`/packages/${pack.id}`)"
            />
            <img
              src="@/assets/imgs/delete-icon.png"
              alt="delete icon"
              @click="deletePackage(pack)"
            />
          </div>
          <div class="mt-1" v-if="pack.priceAfterDiscount">
            <div class="price">{{ pack.priceAfterDiscount }}EGP</div>
            <del>{{ pack.price }}EGP</del>
          </div>
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
      @current-change="getPackages"
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
      selectedImage: null,
      selectedImageUrl: null,
      searchInput: "",
      packages: [],
      page: 1,
      totalPages: 1,
      locations: {
        home: "في المنزل فقط",
        lab: "في المعمل فقط",
        both: "في المنزل او المعمل",
      },
      packagesForm: {
        image: null,
        measuresAr: [],
        measuresEn: [],
      },
      packagesFormRules: {
        titleAr: [{ required: true, message: "Arabic title Is Required" }],
        titleEn: [{ required: true, message: "English title Is Required" }],
        availableAt: [{ required: true, message: "Location Is Required" }],
        branches: [{ required: true, message: "Branches Is Required" }],
        image: [{ required: true, message: "Icon Is Required" }],
        measuresAr: [{ required: true, message: "This field Is Required" }],
        measuresEn: [{ required: true, message: "This field Is Required" }],
        tests: [{ required: true, message: "This field Is Required" }],
      },
      allBranches: [],
      tests: [],
      measuresAr: "",
      measuresEn: "",
    };
  },
  async fetch() {
    await this.getPackages();
    await this.getAllBranches();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    onImageSeclected(e) {
      if (e.target.files.length > 0) {
        this.selectedImage = this.packagesForm.image = e.target.files[0];
        this.selectedImageUrl = URL.createObjectURL(this.selectedImage);
      }
    },
    async getPackages() {
      let params = { page: this.page };
      const packagesRes = await this.$axios.get("/packages", { params });
      this.packages = await packagesRes.data.docs;
      this.totalPages = await packagesRes.data.totalPages;
      this.page = await packagesRes.data.page;
    },
    async getAllBranches() {
      const branchesRes = await this.$axios.get("/branches");
      this.allBranches = await branchesRes.data.docs;
    },
    async getTests(location) {
      const testsRes = await this.$axios.get(`/tests?availableAt=${location}`);
      this.tests = await testsRes.data.docs;
    },
    deletePackage(pack) {
      this.$confirm(
        `Are you sure you want to delete this package ${pack.titleAr}`,
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
          await this.$axios.delete(`product/${pack.id}`);
          await this.getPackages();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    addMeasureAr(measure) {
      if (!measure) return;
      this.packagesForm.measuresAr.push(measure);
      this.measuresAr = "";
    },
    addMeasureEn(measure) {
      if (!measure) return;
      this.packagesForm.measuresEn.push(measure);
      this.measuresEn = "";
    },
    addPackage() {
      this.$refs.packagesForm.validate(async (valid) => {
        if (valid) {
          if (!this.selectedImage) return;
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            const fd = new FormData();
            fd.append("titleAr", this.packagesForm.titleAr);
            fd.append("titleEn", this.packagesForm.titleEn);
            fd.append("image", this.packagesForm.image);
            fd.append("availableAt", this.packagesForm.availableAt);
            this.packagesForm.branches.forEach((branch) => {
              fd.append("branches", branch);
            });
            this.packagesForm.measuresAr.forEach((measure) => {
              fd.append("measuresAr", measure);
            });
            this.packagesForm.measuresEn.forEach((measure) => {
              fd.append("measuresEn", measure);
            });
            this.packagesForm.tests.forEach((test) => {
              fd.append("tests", test);
            });
            fd.append("measuresAr", this.packagesForm.measuresAr);
            fd.append("measuresEn", this.packagesForm.measuresEn);
            fd.append("price", this.packagesForm.price || "");
            fd.append(
              "priceAfterDiscount",
              this.packagesForm.priceAfterDiscount || ""
            );
            await this.$axios.post("/packages", fd);
            // Reset
            this.packagesForm = {
              image: null,
              measuresAr: [],
              measuresEn: [],
            };
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.toggleModal();
            await this.getPackages();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    cancel() {
      this.packagesForm = {
        image: null,
        measuresAr: [],
        measuresEn: [],
      };
      this.selectedImage = null;
      this.selectedImageUrl = null;
      this.toggleModal();
    },
  },
  computed: {
    filteredPackages() {
      return this.packages.filter((pack) =>
        pack.titleAr.includes(this.searchInput)
      );
    },
  },
};
</script>
