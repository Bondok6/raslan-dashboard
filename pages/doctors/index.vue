<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة طبيب" />

    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input placeholder="ابحث في الفريق الطبي" v-model="input"></el-input>
    </div>

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form class="p-5 d-flex flex-column gap-2">
        <el-form-item>
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
              أضف الصورة الخاصة بدكتور المعمل او <em>اضغط للتحميل</em>
            </div>
            <div class="el-upload__tip d-inline" slot="tip">
              يجب ان يكون الملف من نوع jpg/png وحجمة اصغر من 500kb
            </div>
          </el-upload>
        </el-form-item>

        <div class="d-flex gap-2">
          <el-form-item label=" ">
            <span> اسم الطبيب باللغة العربية </span>
            <el-input
              v-model="input"
              placeholder="اكتب اسم الطبيب باللغة العربية"
            ></el-input>
          </el-form-item>

          <el-form-item label=" ">
            <span> اسم الطبيب باللغة الانجليزية </span>
            <el-input
              v-model="input"
              placeholder="اكتب اسم الطبيب باللغة الانجليزية"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label=" ">
          <span> نبذة مختصرة عن الاعلان باللغة العربية </span>
          <el-input type="textarea" :rows="2"></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <span> نبذة مختصرة عن الاعلان باللغةالانجليزية </span>
          <el-input dir="ltr" type="textarea" :rows="2"></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn w-50 align-self-end">
          اضافة طبيب
        </button>
      </el-form>
    </UIPopupForm>

    <UIEmpty
      v-else
      imgSrc="doctors/no-doctors.png"
      alt="no doctors"
      caption="قم بإضافة الفريق الطبي الخاص بالمعمل "
    />

    <!-- <div class="cards">
      <div class="card-item card-item--ads">
        <div>
          <img
            src="@/assets/imgs/random.png"
            alt="ad image"
            class="card-item--ads__img"
          />
        </div>
        <div class="card-item--ads__content">
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
          <h6>دكتور محمد رسلان</h6>
          <p>
            <img src="@/assets/imgs/doctors/member.png" alt="member" />
            عضو جمعية الباثولوجية وامراض الدم و دكتور البورد ... الامريكى لامراض
            الدم و المناعة و مدير وحدة الكيمياء الاكلينيكية
          </p>
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
      addAdsForm: {},
      addAdsFormRules: {
        textareaAr: [{ required: true, message: "This Field Is Required" }],
        textareaEn: [{ required: true, message: "This Field Is Required" }],
      },
    };
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
  },
};
</script>
