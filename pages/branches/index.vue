<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة فرع" />

    <UIEmpty
      imgSrc="branches/no-branches.png"
      alt="no branches"
      caption="قم بإضافة الفروع الخاصة بالمعمل"
    />

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form action="" class="p-5 d-flex flex-column gap-2">
        <div class="d-flex gap-3">
          <div class="d-flex flex-column">
            <span>اختر المحافظة</span>
            <el-select v-model="value" placeholder="اختر المحافظة">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div class="d-flex flex-column">
            <span>اختر المنطقة</span>
            <el-select v-model="value" placeholder="اختر المنطقة">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="d-flex gap-3">
          <div class="d-flex flex-column">
            <span> العنوان</span>
            <el-input placeholder="العنوان" v-model="input"></el-input>
          </div>

          <div class="d-flex flex-column">
            <span>العنوان باللغة الانجليزية</span>
            <el-input placeholder="العنوان" v-model="input"></el-input>
          </div>
        </div>

        <div class="div">
          <span>رابط الموقع على الخريطة</span>
          <el-input
            placeholder="ادخل رابط الموقع على الخريطة"
            v-model="input"
          ></el-input>
        </div>

        <button type="submit" class="secondary-btn w-50 align-self-end">
          اضافة فرع
        </button>
      </el-form>
    </UIPopupForm>

    <!-- <div class="cards">
      <div class="card-item card-item--branch">
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">المحافظة</h6>
            <h6 class="value">القاهرة</h6>
          </div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">المنطقة</h6>
            <h6 class="value">الشيخ زايد</h6>
          </div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">العنوان</h6>
            <h6 class="value">مول 4 ميكس - بيفرلي هيلز</h6>
          </div>
          <div class="d-flex align-items-center gap-2">
            <h6 class="key">الموقع</h6>
            <a class="value" href="https://goo.gl/maps/jgpy6eWRVjhgnBdXA"
              >اضغط هنا</a
            >
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
    };
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
  },
};
</script>
