<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة باقة" />

    <!-- Search -->
    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input placeholder="ابحث في الباقات" v-model="searchInput"></el-input>
    </div>

    <!-- Add Package -->
    <div class="mt-3" v-if="modalTrigger">
      <el-form ref="form" :model="form">
        <div class="row">
          <el-form-item class="col-lg-4 col-md-12">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                أضف الصورة الخاصة بالباقة او
                <em>اضغط للتحميل</em>
              </div>
            </el-upload>
          </el-form-item>

          <div class="col-lg-8 row">
            <el-form-item label=" " class="col-lg-6 col-md-12">
              <span>اسم الباقة باللغة العربية</span>
              <el-input
                v-model="input"
                placeholder="اكتب اسم الباقة باللغة العربية"
              ></el-input>
            </el-form-item>

            <el-form-item label=" " class="col-lg-6 col-md-12">
              <span>اسم الباقة باللغة الانجليزية</span>
              <el-input
                v-model="input"
                placeholder="كتب اسم الباقة باللغة الانجليزية"
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
          <el-form-item label=" " class="col-lg-4 col-md-12">
            <span>السعر النهائي</span>
            <el-input v-model="input" placeholder="اكتب السعر"></el-input>
          </el-form-item>

          <el-form-item label=" " class="col-lg-4 col-md-12">
            <span>السعر قبل الخصم</span>
            <el-input v-model="input" placeholder="اكتب السعر"></el-input>
          </el-form-item>

          <el-form-item class="col-lg-4 col-md-12">
            <span>مكان الحجز</span>
            <el-select
              v-model="caseInput"
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
          <el-form-item class="col-lg-12">
            <span>التحاليل التي تتكون منهاالباقة</span>
            <el-select
              v-model="caseInput"
              placeholder="اختر التحاليل المناسبة"
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
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
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
      searchInput: "",
      input: "",
      packages: [],
      page: 1,
      totalPages: 1,
    };
  },
  async fetch() {
    await this.getPackages();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    async getPackages() {
      let params = { page: this.page };
      const packagesRes = await this.$axios.get("/packages", { params });
      this.packages = await packagesRes.data.docs;
      this.totalPages = await packagesRes.data.totalPages;
      this.page = await packagesRes.data.page;
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
