<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة عميل" />

    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input
        placeholder="ابحث برقم الهاتف على العملاء"
        v-model="input"
      ></el-input>
    </div>

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form class="p-5 d-flex flex-column">
        <el-form-item label=" ">
          <span> اسم العميل باللغة العربية </span>
          <el-input
            v-model="input"
            placeholder="اكتب اسم العميل باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <span>رقم الهاتف</span>
          <el-input
            v-model="input"
            placeholder="اكتب رقم الهاتف الخاص بالعميل"
          ></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <span>كلمة المرور</span>
          <el-input
            v-model="input"
            placeholder="ادخل كلمة مرور مناسبة"
          ></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn w-50 align-self-end">
          اضافة عميل
        </button>
      </el-form>
    </UIPopupForm>

    <UIEmpty
      v-else
      imgSrc="clients/no-clients.png"
      alt="no clients"
      caption="قم بإضافة العلاء التابعين للمعمل "
    />

    <!-- <div class="cards">
      <div class="card-item d-flex justify-content-around">
        <div>
          <div class="d-flex gap-2 align-items-center">
            <h6 class="key">اسم العميل</h6>
            <h6 class="value">احمد محمد محمود</h6>
          </div>
          <div class="d-flex gap-3 align-items-center">
            <h6 class="key">رقم الهاتف</h6>
            <h6 class="value">01017067685</h6>
          </div>
        </div>
        <div>
          <div class="options d-flex">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
          <button
            @click="$router.push('clients/5')"
            type="button"
            class="btn secondary-btn mt-3"
          >
            تحاليل
          </button>
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
