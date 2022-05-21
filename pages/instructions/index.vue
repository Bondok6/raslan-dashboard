<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة تعليمات" />

    <!-- Search -->
    <div class="search w-75 mt-2">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input
        placeholder="ابحث في تعليمات سحب العينة"
        v-model="input"
      ></el-input>
    </div>

    <!-- Add Instruction -->
    <div class="mt-3" v-if="modalTrigger">
      <el-form ref="form" :model="form">
        <div class="row">
          <el-form-item label=" " class="col-lg-6 col-md-12">
            <span>اسم العينة باللغة العربية</span>
            <el-input
              v-model="input"
              placeholder="اكتب اسم العينة باللغة العربية"
            ></el-input>
          </el-form-item>

          <el-form-item label=" " class="col-lg-6 col-md-12">
            <span>اسم العينة باللغة الانجليزية</span>
            <el-input
              v-model="input"
              placeholder="كتب اسم العينة باللغة الانجليزية"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <span>التعليمات الازمة باللغة العربية</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="اكتب اسم التعليم الازم اتباعه باللغة العربية"
            v-model="textarea"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <span>التعليمات الازمة باللغة الانجليزية</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="اكتب اسم التعليم الازم اتباعه باللغة الانجليزية"
            v-model="textarea"
          >
          </el-input>
        </el-form-item>

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

    <!-- No Instructions -->
    <UIEmpty
      v-if="allInstructions.length < 1"
      imgSrc="instruction/no-instruction.png"
      alt="no instruction"
      caption="قم بإضافة تعليمات لسحب العينة"
    />

    <!-- Instructions -->
    <div class="cards">
      <div
        class="card-item d-flex align-items-center justify-content-between gap-4 my-2"
        v-for="instruction in allInstructions"
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
          />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            role="button"
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
      editorConfig: {
        simpleUpload: {
          uploadUrl: "path_to_image_controller",
          headers: {
            Authorization: "optional_token",
          },
        },
      },
      contentHolderAr: "",
      contentHolderEn: "",
      input: "",
      page: 1,
      totalPages: 1,
      allInstructions: [],
    };
  },
  async fetch() {
    await this.getAllInstructions();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    async getAllInstructions() {
      let params = { page: this.page };
      const instructionRes = await this.$axios.get("/instructions", { params });
      this.allInstructions = await instructionRes.data.docs;
      this.totalPages = await instructionRes.data.totalPages;
      this.page = await instructionRes.data.page;
    },
  },
};
</script>
