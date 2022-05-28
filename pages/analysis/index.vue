<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة تحليل" />

    <!-- Search -->
    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input placeholder="ابحث في التحاليل" v-model="searchInput"></el-input>
    </div>

    <!-- Add Analysis -->
    <div class="mt-3" v-if="modalTrigger">
      <el-form
        :rules="analysisFormRules"
        :model="analysisForm"
        ref="analysisForm"
      >
        <div class="row">
          <el-form-item label=" " prop="image" class="col-lg-4 col-md-12">
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
              <el-select v-model="caseInput" placeholder="الفروع" class="w-100">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label=" " class="col-lg-4 col-md-12">
            <span>النسبة المرتفعة</span>
            <el-input
              v-model="input"
              placeholder="اكتب النسبة المناسبة"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " class="col-lg-4 col-md-12">
            <span>النسبة المتوسطة</span>
            <el-input
              v-model="input"
              placeholder="اكتب النسبة المناسبة"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " class="col-lg-4 col-md-12">
            <span>النسبة المنخفضة</span>
            <el-input
              v-model="input"
              placeholder="اكتب النسبة المناسبة"
            ></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label=" " class="col-lg-4 col-md-12">
            <span>الإجراءات الازمة باللغة العربية</span>
            <el-input
              v-model="input"
              placeholder="اكتب الإجراءات الازمة باللغة العربية"
            ></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label=" " class="col-lg-4 col-md-12">
            <span>الإجراءات الازمة باللغة الانجليزية</span>
            <el-input
              v-model="input"
              placeholder="اكتب الإجراءات الازمة باللغة الانجليزية"
            ></el-input>
          </el-form-item>
        </div>
        <div class="buttons w-100 p-3 d-flex gap-2 justify-content-end">
          <button type="submit" class="secondary-btn w-25 align-self-end">
            حفظ
          </button>
          <button type="submit" class="secondary-btn w-25 align-self-end">
            الغاء
          </button>
        </div>
      </el-form>
    </div>

    <!-- No Analysis -->
    <UIEmpty
      v-if="tests.length < 1"
      imgSrc="analysis/no-analysis.png"
      alt="no analysis"
      caption="قم بإضافة التحاليل التابعة للمعمل"
    />

    <!-- Analysis -->
    <div class="cards" v-if="!modalTrigger">
      <div
        class="card-item d-flex align-items-center justify-content-around my-2"
        v-for="test in filteredTests"
        :key="test.id"
      >
        <div
          class="icon"
          @click="$router.push(`/analysis/${test.id}`)"
          role="button"
        >
          <img :src="test.icon" alt="icon" width="100" height="100" />
        </div>
        <div
          class="content mx-2"
          @click="$router.push(`/analysis/${test.id}`)"
          role="button"
        >
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
        <div>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img
              src="@/assets/imgs/delete-icon.png"
              alt="delete icon"
              @click="deleteTest(test)"
            />
          </div>
          <div class="mt-1" v-if="test.priceAfterDiscount">
            <div class="price">{{ test.priceAfterDiscount }}EGP</div>
            <del>{{ test.price }}EGP</del>
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
      @current-change="getTests"
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
      input: "",
      searchInput: "",
      selectedImage: null,
      selectedImageUrl: null,
      analysisForm: {
        image: null,
      },
      analysisFormRules: {
        titleAr: [{ required: true, message: "Arabic title Is Required" }],
        titleEn: [{ required: true, message: "English title Is Required" }],
      },
      page: 1,
      totalPages: 1,
      tests: [],
    };
  },
  async fetch() {
    await this.getTests();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    async getTests() {
      let params = { page: this.page };
      const testsRes = await this.$axios.get("/tests", { params });
      this.tests = await testsRes.data.docs;
      this.totalPages = await testsRes.data.totalPages;
      this.page = await testsRes.data.page;
    },
    deleteTest(test) {
      this.$confirm(
        `Are you sure you want to delete test ${test.titleAr}`,
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
          await this.$axios.delete(`product/${test.id}`);
          await this.getTests();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
  computed: {
    filteredTests() {
      return this.tests.filter((test) =>
        test.titleAr.includes(this.searchInput)
      );
    },
  },
};
</script>
