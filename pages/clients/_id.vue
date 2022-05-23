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
      <el-form
        class="p-5 d-flex flex-column"
        :rules="resultFormRules"
        :model="resultForm"
        ref="resultForm"
      >
        <el-form-item label=" " prop="titleAr">
          <span> اسم التحليل باللغة العربية </span>
          <el-input
            v-model="resultForm.titleAr"
            placeholder="اكتب اسم التحليل باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="titleEn">
          <span>اسم التحليل باللغة الانجليزية</span>
          <el-input
            v-model="resultForm.titleEn"
            placeholder="اكتب اسم التحليل باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="attachment">
          <label for="formFile" class="form-label">اختر نتيجة التحليل</label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="onFileSelected"
            accept=""
          />
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="addResult"
        >
          اضافة نتيجة
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
      resultForm: {
        attachment: null,
      },
      resultFormRules: {
        titleAr: [{ required: true, message: "This Field Is Required" }],
        titleEn: [{ required: true, message: "This Field Is Required" }],
        attachment: [{ required: true, message: "This Field Is Required" }],
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
    onFileSelected(e) {
      if (e.target.files.length > 0) {
        this.resultForm.attachment = e.target.files[0];
      }
    },
    async getClient() {
      const clientRed = await this.$axios.get(
        `/fetch/${this.$route.params.id}/client`
      );
      this.client = await clientRed.data;
      console.log(this.client);
    },
    addResult() {
      this.$refs.resultForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            const formData = new FormData();
            formData.append("pdf", this.resultForm.attachment);
            const fileRes = await this.$axios.post("/images", formData);
            const attachment = await fileRes.data;

            const fd = new FormData();
            fd.append("titleAr", this.resultForm.titleAr);
            fd.append("titleEn", this.resultForm.titleEn);
            fd.append("attachment", attachment);
            fd.append("subject", this.$route.params.id);
            fd.append("subjectType", "user");

            await this.$axios.post("/results", fd);

            // Reset
            this.resultForm = {};
            this.toggleModal();
            // await this.fetchOneClient();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
  },
};
</script>

<style></style>
