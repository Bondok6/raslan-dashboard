<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة تعليمات" />

    <!-- Search -->
    <div
      class="search w-75 mt-2"
      v-show="!modalTrigger"
      v-if="!editModalTrigger"
    >
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input
        placeholder="ابحث في تعليمات سحب العينة"
        v-model="searchInput"
      ></el-input>
    </div>

    <!-- Add Instruction -->
    <div class="mt-3" v-if="modalTrigger">
      <el-form
        :rules="instructionFormRules"
        :model="instructionForm"
        ref="instructionForm"
      >
        <div class="row">
          <el-form-item label="" class="col-lg-6 col-md-12" prop="titleAr">
            <span>اسم العينة باللغة العربية</span>
            <el-input
              v-model="instructionForm.titleAr"
              placeholder="اكتب اسم العينة باللغة العربية"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " class="col-lg-6 col-md-12" prop="titleEn">
            <span>اسم العينة باللغة الانجليزية</span>
            <el-input
              v-model="instructionForm.titleEn"
              placeholder="Enter the sample name in English"
              dir="ltr"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label=" " class="col-lg-8 col-md-12" prop="detailsAr">
          <span>التعليمات الازمة باللغة العربية</span>
          <div class="d-flex gap-3">
            <el-input
              v-model="detailAr"
              placeholder="اكتب الإجراء اللازم باللغة العربية ثم اضغط علي زر (اضافة) وقم بكتابه اجراء اخر اذا وجد"
            ></el-input>
            <button
              type="button"
              @click="addDetailsAr(detailAr)"
              class="primary-btn px-3 d-flex gap-2"
            >
              اضافة
              <span class="badge bg-white purple-text">{{
                this.instructionForm.detailsAr.length
              }}</span>
            </button>
          </div>
        </el-form-item>

        <el-form-item label=" " class="col-lg-8" prop="detailsEn">
          <span>الإجراءات الازمة باللغة الانجليزية</span>
          <div class="d-flex gap-3">
            <el-input
              v-model="detailEn"
              placeholder="Write the necessary instructions in English, then press the (Add) button and write another instruction"
              dir="ltr"
            ></el-input>
            <button
              type="button"
              @click="addDetailsEn(detailEn)"
              class="primary-btn px-3 d-flex gap-2"
            >
              اضافة
              <span class="badge bg-white purple-text">{{
                this.instructionForm.detailsEn.length
              }}</span>
            </button>
          </div>
        </el-form-item>

        <div class="buttons w-100 p-3 d-flex gap-2 justify-content-end">
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="addInstruction"
          >
            حفظ
          </button>
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="cancelInstruction"
          >
            الغاء
          </button>
        </div>
      </el-form>
    </div>

    <!-- Update Instruction -->
    <div class="mt-3" v-if="editModalTrigger">
      <el-form
        :rules="instructionFormRules"
        :model="editInstructionForm"
        ref="instructionForm"
      >
        <div class="row">
          <el-form-item label="" class="col-lg-6 col-md-12" prop="titleAr">
            <span>اسم العينة الجديد باللغة العربية</span>
            <el-input
              v-model="editInstructionForm.titleAr"
              placeholder="اكتب اسم العينة الجديد باللغة العربية"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " class="col-lg-6 col-md-12" prop="titleEn">
            <span>اسم العينة الجديد باللغة الانجليزية</span>
            <el-input
              v-model="editInstructionForm.titleEn"
              placeholder="Enter the new sample name in English"
              dir="ltr"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label=" " class="col-lg-12" prop="detailsAr">
          <span>التعليمات الازمة باللغة العربية</span>
          <div class="d-flex gap-3">
            <el-input
              v-model="EditDetailAr"
              placeholder="اكتب الإجراء اللازم باللغة العربية ثم اضغط علي زر (اضافة) وقم بكتابه اجراء اخر اذا وجد"
            ></el-input>
            <button
              type="button"
              @click="addEditDetailsAr(EditDetailAr)"
              class="primary-btn px-3 d-flex gap-2"
            >
              اضافة
              <span class="badge bg-white purple-text">{{
                this.editInstructionForm.detailsAr.length
              }}</span>
            </button>
            <button
              type="button"
              @click="deleteDetailsAr()"
              class="primary-btn px-3 d-flex gap-2"
            >
              حذف جميع التعليمات السابقة
            </button>
          </div>
        </el-form-item>

        <el-form-item label=" " class="col-lg-12" prop="detailsEn">
          <span>الإجراءات الازمة باللغة الانجليزية</span>
          <div class="d-flex gap-3">
            <el-input
              v-model="EditDetailEn"
              placeholder="Write the necessary instructions in English, then press the (Add) button and write another instruction"
              dir="ltr"
            ></el-input>
            <button
              type="button"
              @click="addEditDetailsEn(EditDetailEn)"
              class="primary-btn px-3 d-flex gap-2"
            >
              اضافة
              <span class="badge bg-white purple-text">{{
                this.editInstructionForm.detailsEn.length
              }}</span>
            </button>
            <button
              type="button"
              @click="deleteDetailsEn()"
              class="primary-btn px-3 d-flex gap-2"
            >
              Delete all previous Instructions
            </button>
          </div>
        </el-form-item>

        <div class="buttons w-100 p-3 d-flex gap-2 justify-content-end">
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="editInstruction"
          >
            حفظ التغييرات
          </button>
          <button
            type="submit"
            class="secondary-btn w-25 align-self-end"
            @click.prevent="cancelInstruction"
          >
            الغاء
          </button>
        </div>
      </el-form>
    </div>

    <!-- No Instructions -->
    <UIEmpty
      v-if="allInstructions.length < 1 && !modalTrigger"
      imgSrc="instruction/no-instruction.png"
      alt="no instruction"
      caption="قم بإضافة تعليمات لسحب العينة"
    />

    <!-- Instructions -->
    <div class="cards" v-show="!modalTrigger" v-if="!editModalTrigger">
      <div
        class="card-item d-flex align-items-center justify-content-between gap-4 my-2"
        v-for="instruction in filteredInstructions"
        :key="instruction.id"
      >
        <h6 class="key text-center w-10">{{ instruction.titleAr }}</h6>

        <ul class="value d-flex flex-column px-3 w-75">
          <li v-for="(detail, index) in instruction.detailsAr" :key="index">
            {{ detail }}
          </li>
        </ul>

        <div class="d-flex gap-3">
          <img
            src="@/assets/imgs/edit-icon.png"
            alt="edit icon"
            role="button"
            @click="toggleEditModal(instruction.id)"
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            role="button"
            @click="deleteInstruction(instruction)"
          />
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <el-pagination
      v-if="totalPages > 1"
      class="position-relative bottom-0 my-4"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getAllInstructions"
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
      editModalTrigger: false,
      searchInput: "",
      page: 1,
      totalPages: 1,
      allInstructions: [],
      instructionForm: { detailsAr: [], detailsEn: [] },
      editInstructionForm: {},
      instructionFormRules: {
        titleAr: [{ required: true, message: "Arabic title Is Required" }],
        titleEn: [{ required: true, message: "English title Is Required" }],
        detailsAr: [{ required: true, message: "Arabic details Is Required" }],
        detailsEn: [{ required: true, message: "English details Is Required" }],
      },
      targetId: null,
      detailAr: "",
      detailEn: "",
      EditDetailAr: "",
      EditDetailEn: "",
    };
  },
  async fetch() {
    await this.getAllInstructions();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    async toggleEditModal(id) {
      const instructionRes = await this.$axios.get(`/instruction/${id}`);
      this.editInstructionForm = { ...instructionRes.data };
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = id;
    },
    async getAllInstructions() {
      let params = { page: this.page };
      const instructionRes = await this.$axios.get("/instructions", { params });
      this.allInstructions = await instructionRes.data.docs;
      this.totalPages = await instructionRes.data.totalPages;
      this.page = await instructionRes.data.page;
    },
    addInstruction() {
      this.$refs.instructionForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.post("/instruction", this.instructionForm);
            // Reset
            this.instructionForm = {};
            this.toggleModal();
            await this.getAllInstructions();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    editInstruction() {
      this.$refs.instructionForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.patch(
              `/instruction/${this.targetId}`,
              this.editInstructionForm
            );
            // Reset
            this.editInstructionForm = {};
            this.cancelInstruction();
            await this.getAllInstructions();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    cancelInstruction() {
      this.instructionForm = { detailsAr: [], detailsEn: [] };
      this.editInstructionForm = {};
      this.modalTrigger = false;
      this.editModalTrigger = false;
    },
    deleteInstruction(instruction) {
      this.$confirm(
        `هل انت متأكد من انك تريد حذف ${instruction.titleAr}`,
        "Warning",
        {
          confirmButtonText: "تأكيد",
          cancelButtonText: "إلغاء",
          type: "warning",
        }
      )
        .then(async () => {
          this.$message({
            type: "success",
            message: "تم حذف التعليم",
          });
          await this.$axios.delete(`instruction/${instruction.id}`);
          await this.getAllInstructions();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "تم إلغاء الأمر",
          });
        });
    },
    addDetailsAr(detail) {
      if (!detail) return;
      this.instructionForm.detailsAr.push(detail);
      this.detailAr = "";
    },
    addDetailsEn(detail) {
      if (!detail) return;
      this.instructionForm.detailsEn.push(detail);
      this.detailEn = "";
    },
    deleteDetailsAr() {
      this.editInstructionForm.detailsAr = [];
    },
    deleteDetailsEn() {
      this.editInstructionForm.detailsEn = [];
    },
    addEditDetailsAr(detail) {
      if (!detail) return;
      this.editInstructionForm.detailsAr.push(detail);
      this.EditDetailAr = "";
    },
    addEditDetailsEn(detail) {
      if (!detail) return;
      this.editInstructionForm.detailsEn.push(detail);
      this.EditDetailEn = "";
    },
  },
  computed: {
    filteredInstructions() {
      return this.allInstructions.filter((instruction) =>
        instruction.titleAr
          .toLowerCase()
          .includes(this.searchInput.toLowerCase())
      );
    },
  },
};
</script>
