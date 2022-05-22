<template>
  <section v-if="!$fetchState.pending">
    <UIAddButton @click="toggleModal" buttonText="اضافة تحليل" />

    <!-- Client Info -->
    <h6 class="key">
      {{ client.username }} / <span>{{ client.phone.substring(2) }}</span>
    </h6>

    <!-- Add Result -->
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

    <!-- No Result -->
    <UIEmpty
      imgSrc="analysis/no-analysis.png"
      alt="no analysis"
      caption="لا يوجد نتايج حتى الان لهذا العميل"
    />

    <!-- Results -->
    <!-- <div class="bg-white p-2 m-2 d-flex align-items-center">
      <img src="@/assets/imgs/clients/calender.png" alt="calender" />
      <span class="fs-5 mx-2">5/2/2021</span>
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
      client: null,
    };
  },
  async fetch() {
    await this.getClient();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    async getClient() {
      const clientRed = await this.$axios.get(
        `/fetch/${this.$route.params.id}/client`
      );
      this.client = await clientRed.data;
      console.log(this.client);
    },
  },
};
</script>

<style></style>
