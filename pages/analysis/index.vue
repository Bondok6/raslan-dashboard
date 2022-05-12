<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة تحليل" />
    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input placeholder="ابحث في التحاليل" v-model="input"></el-input>
    </div>

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
                اضف الصورة الخاصة بالتحليل او
                <em>اضغط للتحميل</em>
              </div>
            </el-upload>
          </el-form-item>

          <div class="col-lg-8 row">
            <el-form-item label=" " class="col-lg-6 col-md-12">
              <span>اسم التحليل باللغة العربية</span>
              <el-input
                v-model="input"
                placeholder="اكتب اسم التحليل باللغة العربية"
              ></el-input>
            </el-form-item>

            <el-form-item label=" " class="col-lg-6 col-md-12">
              <span>اسم التحليل باللغة الانجليزية</span>
              <el-input
                v-model="input"
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

    <UIEmpty
      v-else
      imgSrc="analysis/no-analysis.png"
      alt="no analysis"
      caption="قم بإضافة التحاليل التابعة للمعمل"
    />

    <!-- <div class="cards">
      <div class="card-item d-flex align-items-center justify-content-around">
        <div class="icon">
          <img src="@/assets/imgs/analysis/analysis-icon.png" alt="icon" />
        </div>
        <div class="content mx-2">
          <h6>تحليل فيتامين د</h6>
          <div class="d-flex pt-2">
            <figure class="ms-2">
              <img src="@/assets/imgs/analysis/heal.png" alt="heal" />
              <figcaption class="d-inline">زيارة منزلية</figcaption>
            </figure>
            <figure>
              <img src="@/assets/imgs/analysis/check.png" alt="check" />
              <figcaption class="d-inline">حجز خارجي</figcaption>
            </figure>
          </div>
        </div>
        <div>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
          <div class="mt-1">
            <div class="price">100EGP</div>
            <del>150EGP</del>
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      modalTrigger: false,
      input: "",
    };
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
  },
};
</script>
