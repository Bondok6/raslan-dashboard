<template>
  <section v-if="!$fetchState.pending">
    <div
      class="card-item d-flex align-items-center justify-content-between my-2 py-2 bg-white"
      v-if="!modalTrigger"
    >
      <div class="d-flex gap-2 align-items-center">
        <div class="icon" role="button">
          <img :src="test.icon" alt="icon" width="100" height="100" />
        </div>
        <div class="content mx-2" role="button">
          <h6>
            {{ test.titleAr }}
          </h6>
          <div class="d-flex pt-2" v-if="test.availableAt == 'both'">
            <figure class="ms-2">
              <img src="@/assets/imgs/analysis/heal.png" alt="heal" />
              <figcaption class="d-inline">زيارة منزلية</figcaption>
            </figure>
            <figure>
              <img src="@/assets/imgs/analysis/check.png" alt="check" />
              <figcaption class="d-inline">حجز خارجي</figcaption>
            </figure>
          </div>
          <div class="d-flex pt-2" v-else-if="test.availableAt == 'home'">
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
            @click="deleteTest(test)"
          />
        </div>
        <div class="mt-1" v-if="test.priceAfterDiscount">
          <div class="orange-text fw-bold">
            {{ test.priceAfterDiscount }}EGP
          </div>
          <del>{{ test.price }}EGP</del>
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
        <h5 class="purple-text py-2">النتايج المحتملة</h5>
        <ul
          class="px-3"
          v-for="(result, index) in possibleResults"
          :key="index"
        >
          <li>
            <h6>{{ result.titleAr }}</h6>
            <p class="key">{{ result.descriptionAr }}</p>
          </li>
        </ul>
      </div>
      <div>
        <h5 class="purple-text py-2">الاجراءات الازمة</h5>
        <p class="key">{{ test.measuresAr }}</p>
      </div>
    </div>

    <!-- update Analysis -->
    <div class="mt-3" v-if="modalTrigger">
      <el-form
        :rules="analysisFormRules"
        :model="analysisForm"
        ref="analysisForm"
      >
        <div class="row">
          <el-form-item label=" " prop="icon" class="col-lg-4 col-md-12">
            <label for="formFile" class="form-label"
              >أضف الايقون التي تعبر عن التحليل</label
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
              <span>اسم التحليل باللغة العربية</span>
              <el-input
                v-model="analysisForm.titleAr"
                placeholder="اكتب اسم التحليل باللغة العربية"
              ></el-input>
            </el-form-item>

            <el-form-item label=" " class="col-lg-6 col-md-12" prop="titleEn">
              <span>اسم التحليل باللغة الانجليزية</span>
              <el-input
                v-model="analysisForm.titleEn"
                placeholder="كتب اسم التحليل باللغة الانجليزية"
              ></el-input>
            </el-form-item>

            <el-form-item class="col-lg-12">
              <span>اختر الفروع التي ينتمى اليها</span>
              <el-select
                v-model="analysisForm.branches"
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
              v-model="analysisForm.priceAfterDiscount"
              placeholder="اكتب السعر"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " class="col-lg-4 col-md-12" prop="price">
            <span>السعر قبل الخصم</span>
            <el-input
              v-model="analysisForm.price"
              placeholder="اكتب السعر"
            ></el-input>
          </el-form-item>

          <el-form-item class="col-lg-4 col-md-12" prop="availableAt">
            <span>مكان الحجز</span>
            <el-select
              v-model="analysisForm.availableAt"
              placeholder="اختر مكان الحجز"
              class="w-100"
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
          <el-form-item
            label=" "
            class="col-lg-4 col-md-12"
            prop="possibleResults"
          >
            <span>النسبة المرتفعة</span>
            <el-input
              v-model="analysisForm.possibleResults[0].descriptionAr"
              placeholder="اكتب النسبة المناسبة"
            ></el-input>
          </el-form-item>

          <el-form-item
            label=" "
            class="col-lg-4 col-md-12"
            prop="possibleResults"
          >
            <span>النسبة المتوسطة</span>
            <el-input
              v-model="analysisForm.possibleResults[1].descriptionAr"
              placeholder="اكتب النسبة المناسبة"
            ></el-input>
          </el-form-item>

          <el-form-item
            label=" "
            class="col-lg-4 col-md-12"
            prop="possibleResults"
          >
            <span>النسبة المنخفضة</span>
            <el-input
              v-model="analysisForm.possibleResults[2].descriptionAr"
              placeholder="اكتب النسبة المناسبة"
            ></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label=" " class="col-lg-4 col-md-12" prop="measuresAr">
            <span>الإجراءات الازمة باللغة العربية</span>
            <el-input
              v-model="analysisForm.measuresAr"
              placeholder="اكتب الإجراءات الازمة باللغة العربية"
            ></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label=" " class="col-lg-4 col-md-12" prop="measuresEn">
            <span>الإجراءات الازمة باللغة الانجليزية</span>
            <el-input
              v-model="analysisForm.measuresEn"
              placeholder="اكتب الإجراءات الازمة باللغة الانجليزية"
            ></el-input>
          </el-form-item>
        </div>
        <div class="buttons w-100 p-3 d-flex gap-2 justify-content-end">
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="editTest"
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      test: null,
      possibleResults: [],
      branches: [],
      modalTrigger: false,
      selectedImage: null,
      selectedImageUrl: null,
      analysisForm: {},
      analysisFormRules: {
        titleAr: [{ required: true, message: "Arabic title Is Required" }],
        titleEn: [{ required: true, message: "English title Is Required" }],
        availableAt: [{ required: true, message: "Location Is Required" }],
        branches: [{ required: true, message: "Branches Is Required" }],
        icon: [{ required: true, message: "Icon Is Required" }],
        measuresAr: [{ required: true, message: "This field Is Required" }],
        measuresEn: [{ required: true, message: "This field Is Required" }],
        possibleResults: [
          { required: true, message: "This fields Is Required" },
        ],
      },
      locations: {
        home: "في المنزل فقط",
        lab: "في المعمل فقط",
        both: "في المنزل او المعمل",
      },
      allBranches: [],
    };
  },
  async fetch() {
    await this.getTest();
    await this.getAllBranches();
  },
  methods: {
    async getTest() {
      const testRes = await this.$axios.get(
        `/product/${this.$route.params.id}`
      );
      this.test = await testRes.data;
      this.possibleResults = await testRes.data.possibleResults;
      if (this.test.branches.length < 1) return;
      for (let i = 0; i < this.test.branches.length; i++) {
        let branch = await this.$axios.get(`/branch/${this.test.branches[i]}`);
        this.branches.push(await branch.data);
      }
    },
    deleteTest(test) {
      this.$confirm(
        `هل انت متأكد من انك تريد حذف هذا التحليل ${test.titleAr}`,
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
            message: "تم حذف التحليل بنجاح",
          });
          await this.$axios.delete(`product/${test.id}`);
          this.$router.push("/analysis");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "تم الغاء عملية الحذف",
          });
        });
    },
    toggleModal() {
      this.analysisForm = { ...this.test };
      this.selectedImage = this.test.icon;
      this.selectedImageUrl = this.test.icon;
      this.modalTrigger = !this.modalTrigger;
    },
    onImageSeclected(e) {
      if (e.target.files.length > 0) {
        this.selectedImage = this.analysisForm.icon = e.target.files[0];
        this.selectedImageUrl = URL.createObjectURL(this.selectedImage);
      }
    },
    cancel() {
      this.analysisForm = {};
      this.selectedImage = null;
      this.selectedImageUrl = null;
      this.toggleModal();
    },
    editTest() {
      this.$refs.analysisForm.validate(async (valid) => {
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
            fd.append("titleAr", this.analysisForm.titleAr);
            fd.append("titleEn", this.analysisForm.titleEn);
            fd.append("icon", this.analysisForm.icon);
            fd.append("availableAt", this.analysisForm.availableAt);
            this.analysisForm.branches.forEach((branch) => {
              fd.append("branches", branch);
            });
            fd.append("measuresAr", this.analysisForm.measuresAr);
            fd.append("measuresEn", this.analysisForm.measuresEn);
            fd.append("price", this.analysisForm.price || "");
            fd.append(
              "possibleResults[0][descriptionAr]",
              this.analysisForm.possibleResults[0].descriptionAr
            );
            fd.append(
              "possibleResults[1][descriptionAr]",
              this.analysisForm.possibleResults[1].descriptionAr
            );
            fd.append(
              "possibleResults[2][descriptionAr]",
              this.analysisForm.possibleResults[2].descriptionAr
            );
            fd.append(
              "possibleResults[0][titleAr]",
              this.analysisForm.possibleResults[0].titleAr
            );
            fd.append(
              "possibleResults[1][titleAr]",
              this.analysisForm.possibleResults[1].titleAr
            );
            fd.append(
              "possibleResults[2][titleAr]",
              this.analysisForm.possibleResults[2].titleAr
            );
            fd.append(
              "possibleResults[0][titleEn]",
              this.analysisForm.possibleResults[0].titleEn
            );
            fd.append(
              "possibleResults[1][titleEn]",
              this.analysisForm.possibleResults[1].titleEn
            );
            fd.append(
              "possibleResults[2][titleEn]",
              this.analysisForm.possibleResults[2].titleEn
            );
            fd.append("descriptionAr", "تحليل");
            fd.append("descriptionEn", "analysis");
            fd.append(
              "priceAfterDiscount",
              this.analysisForm.priceAfterDiscount || ""
            );
            await this.$axios.patch(`/product/${this.$route.params.id}`, fd);
            // Reset
            this.selectedImage = null;
            this.selectedImageUrl = null;
            this.branches = [];
            this.toggleModal();
            await this.getTest();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async getAllBranches() {
      const branchesRes = await this.$axios.get("/branches");
      this.allBranches = await branchesRes.data.docs;
    },
  },
};
</script>
