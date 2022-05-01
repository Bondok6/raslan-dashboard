<template>
  <section class="ads-page">
    <UIAddButton @click="toggleModal" buttonText="اضافة محافظة" />

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form class="p-5 d-flex flex-column gap-2">
        <el-form-item label=" ">
          <span>المحافظة</span>
          <el-input
            v-model="input"
            placeholder="اكتب اسم المحافظة باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <span>المحافظة باللغة الانجليزية</span>
          <el-input
            v-model="input"
            placeholder="اكتب اسم المحافظة باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn">اضافة محافظة</button>
      </el-form>
    </UIPopupForm>

    <UIEmpty
      v-else
      imgSrc="cities/no-cities.png"
      alt="no cities"
      caption="قم بإضافة المحافظات التابعة للمعمل"
    />

    <!-- <div>
      <div class="row my-2">
        <div
          class="col d-flex justify-content-between bg-white p-2 mx-2 rounded"
        >
          <h6>القاهرة</h6>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
        </div>
        <div
          class="col d-flex justify-content-between bg-white p-2 mx-2 rounded"
        >
          <h6>القاهرة</h6>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
        </div>
        <div
          class="col d-flex justify-content-between bg-white p-2 mx-2 rounded"
        >
          <h6>القاهرة</h6>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
        </div>
      </div>
      <div class="row my-2">
        <div
          class="col d-flex justify-content-between bg-white p-2 mx-2 rounded"
        >
          <h6>القاهرة</h6>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
        </div>
        <div
          class="col d-flex justify-content-between bg-white p-2 mx-2 rounded"
        >
          <h6>القاهرة</h6>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
        </div>
        <div
          class="col d-flex justify-content-between bg-white p-2 mx-2 rounded"
        >
          <h6>القاهرة</h6>
          <div class="options">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
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
    };
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
  },
};
</script>
