<template>
  <section class="orders-page">
    <div class="d-flex justify-content-end align-items-center gap-3">
      <div class="search">
        <img
          src="@/assets/imgs/orders/search.png"
          class="search__icon"
          alt="search icon"
        />
        <el-input
          class="search__input"
          placeholder="ابحث برقم الهاتف"
          v-model="input"
        ></el-input>
      </div>
      <div>
        <span
          class="calender"
          @click="
            toggleModal();
            openCalender();
          "
        >
          <img src="@/assets/imgs/orders/calender.png" alt="calender icon" />
        </span>
        <span
          class="option"
          @click="
            toggleModal();
            openFilter();
          "
        >
          <img src="@/assets/imgs/orders/options.png" alt="options icon" />
        </span>
      </div>
    </div>

    <UIEmpty
      imgSrc="orders/no-orders.png"
      alt="no orders"
      caption="لا توجد حجوزات حتى الان"
    />

    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-calendar v-if="showCalender" v-model="dateInput" class="calender">
      </el-calendar>

      <el-form v-if="showFilter" class="p-5">
        <el-form-item>
          <label class="d-block">اختر الحالة</label>
          <el-select v-model="caseInput" placeholder="اختر الحالة">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <label>مكان الحجز</label>
          <el-input v-model="input"></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <label class="d-block">اختر الفترة الزمنية</label>
          <el-time-select
            placeholder="من"
            v-model="startTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="الى"
            v-model="endTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: startTime,
            }"
          >
          </el-time-select>
        </el-form-item>
      </el-form>

      <button class="secondary-btn w-50 mb-2 me-4">تأكيد</button>
    </UIPopupForm>

    <!-- <div class="cards">
      <div class="card-item card-item--orders">
        <div class="d-flex gap-4">
          <div class="date">
            <div class="my-2">5 مايو 2021</div>
            <div>06:55 PM</div>
          </div>
          <div>
            <div class="my-2 d-flex align-items-center gap-2">
              <h6 class="key">اسم العميل</h6>
              <h6 class="value">محمد أحمد محمود</h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="key">رقم الهاتف</h6>
              <h6 class="value">01017067685</h6>
            </div>
          </div>
        </div>
        <div class="order-btn">
          <button type="button" class="secondary-btn">التفاصيل</button>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      modalTrigger: false,
      showCalender: false,
      showFilter: false,
    };
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    openCalender() {
      this.showFilter = false;
      this.showCalender = true;
    },
    openFilter() {
      this.showCalender = false;
      this.showFilter = true;
    },
  },
};
</script>
