<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة تحليل" />

    <div class="content">احمد محمد محمود / 01017067685</div>

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form class="p-5 d-flex flex-column">
        <el-form-item label=" ">
          <span> اسم التحليل باللغة العربية </span>
          <el-input
            v-model="input"
            placeholder="اكتب اسم التحليل باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <span>اسم التحليل باللغة الانجليزية</span>
          <el-input
            v-model="input"
            placeholder="اكتب اسم التحليل باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <span>اختر التحليل</span>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button size="small" type="primary" class="secondary-btn"
              >Click to upload</el-button
            >
          </el-upload>
        </el-form-item>

        <button type="submit" class="secondary-btn w-50 align-self-end">
          اضافة عميل
        </button>
      </el-form>
    </UIPopupForm>

    <div class="bg-white p-2 m-2 d-flex align-items-center">
      <img src="@/assets/imgs/clients/calender.png" alt="calender" />
      <span class="fs-5 mx-2">5/2/2021</span>
    </div>
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

<style></style>
