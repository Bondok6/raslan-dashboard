<template>
  <section v-if="!$fetchState.pending">
    <!-- Update Package -->
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
          <el-form-item label=" " class="col-lg-12" prop="measuresAr">
            <span>التعليمات الازمة باللغة العربية</span>
            <div class="d-flex gap-3">
              <el-input
                v-model="measureAr"
                placeholder="اكتب الإجراء اللازم باللغة العربية ثم اضغط علي زر (اضافة) وقم بكتابه اجراء اخر اذا وجد"
              ></el-input>
              <button
                type="button"
                @click="addMeasureAr(measureAr)"
                class="primary-btn px-3 d-flex gap-2"
              >
                اضافة
                <span class="badge bg-white purple-text">{{
                  this.packagesForm.measuresAr.length
                }}</span>
              </button>
              <button
                type="button"
                @click="deleteMeasuresAr()"
                class="primary-btn px-3 d-flex gap-2"
              >
                حذف جميع التعليمات السابقة
              </button>
            </div>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label=" " class="col-lg-12" prop="measuresEn">
            <span>الإجراءات الازمة باللغة الانجليزية</span>
            <div class="d-flex gap-3">
              <el-input
                v-model="measureEn"
                placeholder="Write the necessary instructions in English, then press the (Add) button and write another instruction"
                dir="ltr"
              ></el-input>
              <button
                type="button"
                @click="addMeasureEn(measureEn)"
                class="primary-btn px-3 d-flex gap-2"
              >
                اضافة
                <span class="badge bg-white purple-text">{{
                  this.packagesForm.measuresEn.length
                }}</span>
              </button>
              <button
                type="button"
                @click="deleteMeasuresEn()"
                class="primary-btn px-3 d-flex gap-2"
              >
                Delete all previous Instructions
              </button>
            </div>
          </el-form-item>
        </div>

        <div class="buttons w-100 p-3 d-flex gap-2 justify-content-end">
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="editPackage"
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

    <div
      class="card-item d-flex align-items-center justify-content-between my-2 py-2 bg-white"
      v-if="!modalTrigger"
    >
      <div class="d-flex gap-2 align-items-center">
        <div class="icon" role="button">
          <img :src="pack.image" alt="icon" width="100" height="100" />
        </div>
        <div class="content mx-2" role="button">
          <h6>
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
      </div>

      <div class="d-flex flex-row-reverse gap-5">
        <div class="options">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            @click="toggleModal"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click.prevent="deletePackage(pack)"
          />
        </div>
        <div class="mt-1" v-if="pack.priceAfterDiscount">
          <div class="orange-text fw-bold">
            {{ pack.priceAfterDiscount }}EGP
          </div>
          <del>{{ pack.price }}EGP</del>
        </div>
      </div>
    </div>
    <div class="bg-white d-flex flex-column p-3 gap-3" v-if="!modalTrigger">
      <div>
        <h5 class="purple-text py-2">الفروع التي ينتمي اليها</h5>
        <ul class="list-inline" v-for="branch in branches" :key="branch.id">
          <li class="key">{{ branch.titleAr }}, {{ branch.region.nameAr }}</li>
        </ul>
      </div>
      <div>
        <h5 class="purple-text py-2">التحاليل التي تتكون منها الباقة</h5>
        <ul v-for="test in pack.tests" :key="test.id" class="list-inline px-3">
          <li class="key">{{ test.titleAr }}</li>
        </ul>
      </div>
      <div>
        <h5 class="purple-text py-2">الاجراءات الازمة</h5>
        <ul
          class="list-inline"
          v-for="(measure, index) in pack.measuresAr"
          :key="index"
        >
          <li class="key">
            {{ measure }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      modalTrigger: false,
      pack: [],
      branches: [],
      packagesForm: {},
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
      locations: {
        home: "في المنزل فقط",
        lab: "في المعمل فقط",
        both: "في المنزل او المعمل",
      },
      allBranches: [],
      tests: [],
      selectedImage: null,
      selectedImageUrl: null,
      measureAr: "",
      measureEn: "",
    };
  },
  async fetch() {
    await this.getPackage();
    await this.getAllBranches();
  },
  methods: {
    async getPackage() {
      const packageRes = await this.$axios.get(
        `/product/${this.$route.params.id}`
      );
      this.pack = await packageRes.data;
      if (this.pack.branches.length < 1) return;
      for (let i = 0; i < this.pack.branches.length; i++) {
        let branch = await this.$axios.get(`/branch/${this.pack.branches[i]}`);
        this.branches.push(await branch.data);
      }
    },
    deletePackage(pack) {
      this.$confirm(
        `هل انت متأكد من انك تريد حذف هذه الباقة ${pack.titleAr}`,
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
            message: "تم حذف الباقة بنجاح",
          });
          await this.$axios.delete(`product/${pack.id}`);
          this.$router.push("/packages");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "تم الغاء الحذف",
          });
        });
    },
    closeEditModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    async toggleModal() {
      this.packagesForm = { ...this.pack };
      this.selectedImage = this.pack.image;
      this.selectedImageUrl = this.pack.image;
      await this.getTests(this.packagesForm.availableAt);
      this.modalTrigger = !this.modalTrigger;
    },
    onImageSeclected(e) {
      if (e.target.files.length > 0) {
        this.selectedImage = this.packagesForm.image = e.target.files[0];
        this.selectedImageUrl = URL.createObjectURL(this.selectedImage);
      }
    },
    async getAllBranches() {
      const branchesRes = await this.$axios.get("/branches");
      this.allBranches = await branchesRes.data.docs;
    },
    editPackage() {
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
            this.packagesForm.tests.forEach((test) => {
              fd.append("tests", test);
            });
            this.packagesForm.measuresAr.forEach((measure) => {
              fd.append("measuresAr", measure);
            });
            this.packagesForm.measuresEn.forEach((measure) => {
              fd.append("measuresEn", measure);
            });
            fd.append("price", this.packagesForm.price || "");
            fd.append(
              "priceAfterDiscount",
              this.packagesForm.priceAfterDiscount || ""
            );
            await this.$axios.patch(`/product/${this.$route.params.id}`, fd);
            // Reset
            this.packagesForm = {};
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.branches = [];
            this.closeEditModal();
            await this.getPackage();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async getTests(location) {
      this.packagesForm.tests = [];
      const testsRes = await this.$axios.get(`/tests?availableAt=${location}`);
      this.tests = await testsRes.data.docs;
    },
    deleteMeasuresAr() {
      this.packagesForm.measuresAr = [];
    },
    deleteMeasuresEn() {
      this.packagesForm.measuresEn = [];
    },
    addMeasureAr(measure) {
      if (!measure) return;
      this.packagesForm.measuresAr.push(measure);
      this.measureAr = "";
    },
    addMeasureEn(measure) {
      if (!measure) return;
      this.packagesForm.measuresEn.push(measure);
      this.measureEn = "";
    },
    cancel() {
      this.packagesForm = {};
      this.selectedImage = null;
      this.selectedImageUrl = null;
      this.closeEditModal();
    },
  },
};
</script>

<style></style>
