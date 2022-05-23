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

    <!-- Update Result -->
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="editModalTrigger"
      @update:modalTrigger="toggleEditModal"
    >
      <el-form
        class="p-5 d-flex flex-column"
        :rules="editResultFormRules"
        :model="editResultForm"
        ref="editResultForm"
      >
        <el-form-item label=" " prop="titleAr">
          <span> اسم التحليل باللغة العربية </span>
          <el-input
            v-model="editResultForm.titleAr"
            placeholder="اكتب اسم التحليل باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="titleEn">
          <span>اسم التحليل باللغة الانجليزية</span>
          <el-input
            v-model="editResultForm.titleEn"
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
          @click.prevent="editResult"
        >
          حفظ التغييرات
        </button>
      </el-form>
    </UIPopupForm>

    <!-- No Result -->
    <UIEmpty
      v-if="results.length < 1"
      imgSrc="analysis/no-analysis.png"
      alt="no analysis"
      caption="لا يوجد نتايج حتى الان لهذا العميل"
    />

    <!-- Results -->
    <div
      class="cards d-flex flex-column"
      v-for="result in results"
      :key="result._id"
    >
      <div class="bg-white p-2 m-2 d-flex align-items-center">
        <img src="@/assets/imgs/clients/calender.png" alt="calender" />
        <span class="fs-5 mx-2">{{ result._id }}</span>
      </div>
      <div class="d-flex flex-wrap justify-content-between">
        <div
          class="p-3 card-item d-flex align-items-center justify-content-between bg-white my-2"
          v-for="data in result.docs"
          :key="data.id"
        >
          <div class="d-flex flex-column">
            <h6 class="mb-3">{{ data.titleAr }}</h6>
            <a :href="data.attachment">
              <img src="@/assets/imgs/clients/pdf.png" alt="pdf incon" />
            </a>
          </div>
          <div class="align-self-start d-flex gap-3">
            <img
              src="@/assets/imgs/edit-icon.png"
              alt="edit icon"
              role="button"
              @click="toggleEditModal(data.id)"
            />
            <img
              src="@/assets/imgs/delete-icon.png"
              alt="delete icon"
              role="button"
              @click="deleteResult(data)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      modalTrigger: false,
      editModalTrigger: false,
      editResultForm: { attachment: null },
      resultForm: { attachment: null },
      resultFormRules: {
        titleAr: [{ required: true, message: "This Field Is Required" }],
        titleEn: [{ required: true, message: "This Field Is Required" }],
        attachment: [{ required: true, message: "This Field Is Required" }],
      },
      editResultFormRules: {
        titleAr: [{ required: true, message: "This Field Is Required" }],
        titleEn: [{ required: true, message: "This Field Is Required" }],
        attachment: [{ required: true, message: "This Field Is Required" }],
      },
      client: null,
      results: null,
      targetId: null,
    };
  },
  async fetch() {
    await this.getClient();
    await this.getResult();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    toggleEditModal(id) {
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = id;
    },
    onFileSelected(e) {
      if (e.target.files.length > 0) {
        this.resultForm.attachment = e.target.files[0];
        this.editResultForm.attachment = e.target.files[0];
      }
    },
    async getClient() {
      const clientRes = await this.$axios.get(
        `/fetch/${this.$route.params.id}/client`
      );
      this.client = await clientRes.data;
    },
    async getResult() {
      const resultRes = await this.$axios.get(
        `/results?client=${this.$route.params.id}`
      );
      this.results = await resultRes.data;
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
            await this.getResult();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    deleteResult(result) {
      this.$confirm(
        `Are you sure you want to delete ${result.titleAr}`,
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
          await this.$axios.delete(`results/${result.id}`);
          await this.getResult();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    editResult() {
      this.$refs.editResultForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            const formData = new FormData();
            formData.append("pdf", this.editResultForm.attachment);
            const fileRes = await this.$axios.post("/images", formData);
            const attachment = await fileRes.data[0];

            const fd = new FormData();
            fd.append("titleAr", this.editResultForm.titleAr);
            fd.append("titleEn", this.editResultForm.titleEn);
            fd.append("attachment", attachment);

            await this.$axios.patch(`/result/${this.targetId}`, fd);

            // Reset
            this.editResultForm = {};
            this.toggleEditModal();
            await this.getResult();
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
