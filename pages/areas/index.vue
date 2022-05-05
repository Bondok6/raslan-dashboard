<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة منطقة" />

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form class="p-5 d-flex flex-column gap-2">
        <el-form-item>
          <span class="d-block">اختر المحافظة</span>
          <el-select v-model="value" placeholder="المحافظة">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <span>المنطقة</span>
          <el-input
            v-model="input"
            placeholder="اكتب اسم المنطقة باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <span>المنطقة باللغة الانجليزية</span>
          <el-input
            v-model="input"
            placeholder="اكتب اسم المنطقة باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <button type="submit" class="secondary-btn">اضافة منطقة</button>
      </el-form>
    </UIPopupForm>

    <UIEmpty
      v-else
      imgSrc="cities/no-cities.png"
      alt="no cities"
      caption="قم بإضافة المناطق التابعة للمعمل"
    />

    <!-- <div class="cards">
      <div class="card-item card-item--branch w-50 my-2">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">المحافظة</h6>
            <h6 class="value">القاهرة</h6>
          </div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">المنطقة</h6>
            <h6 class="value">الشيخ زايد</h6>
          </div>
        </div>
        <div class="options">
          <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
          <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
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
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      value: "",
    };
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
  },
};
</script>
