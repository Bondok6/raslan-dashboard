<template>
  <section class="orders-page" v-if="!$fetchState.pending">
    <!-- Filters -->
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
          v-model="searchInput"
          type="tel"
        ></el-input>
      </div>
      <div>
        <span class="calender" @click="toggleCalender">
          <img src="@/assets/imgs/orders/calender.png" alt="calender icon" />
        </span>
        <span class="option">
          <img src="@/assets/imgs/orders/options.png" alt="options icon" />
        </span>
      </div>
    </div>

    <!-- Date Filter -->
    <UIPopupForm
      v-if="showCalender"
      :modalTrigger="showCalender"
      @update:modalTrigger="toggleCalender"
    >
      <el-form
        :rules="calenderFormRules"
        :model="calenderForm"
        ref="calenderForm"
      >
        <el-form-item label=" " prop="dateInput">
          <el-calendar v-model="calenderForm.dateInput" class="calender">
          </el-calendar>
          <button
            type="submit"
            class="secondary-btn w-50 mb-2 me-4"
            @click.prevent="dateFilter"
          >
            تأكيد
          </button>
        </el-form-item>
      </el-form>
    </UIPopupForm>

    <!-- <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
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
    </UIPopupForm> -->

    <!-- Orders -->
    <div class="cards mt-3">
      <div
        class="card-item card-item--orders my-2"
        v-for="order in filteredOrders"
        :key="order.id"
      >
        <div class="d-flex gap-4">
          <div class="date text-center">
            <div class="my-2">{{ dateFormat(order.day) }}</div>
            <div dir="ltr">{{ order.from }}</div>
          </div>
          <div>
            <div class="my-2 d-flex align-items-center gap-2">
              <h6 class="key">اسم العميل</h6>
              <h6 class="value">{{ order.username }}</h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="key">رقم الهاتف</h6>
              <h6 class="value">{{ order.phone }}</h6>
            </div>
          </div>
        </div>
        <div class="order-btn">
          <nuxt-link
            :to="`/orders/${order.id}`"
            class="secondary-btn text-decoration-none"
            >التفاصيل</nuxt-link
          >
        </div>
      </div>
    </div>

    <!-- No Orders -->
    <UIEmpty
      v-if="filteredOrders.length < 1"
      imgSrc="orders/no-orders.png"
      alt="no orders"
      caption="لا توجد حجوزات"
    />

    <!-- Pagination -->
    <el-pagination
      v-if="totalPages > 1"
      class="position-relative bottom-0 my-4"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getAllOrders"
      :total="totalPages * 10"
    >
    </el-pagination>
  </section>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      searchInput: "",
      calenderForm: {},
      calenderFormRules: {
        dateInput: [{ required: true, message: "You Should Select Date" }],
      },
      modalTrigger: false,
      showCalender: false,
      showFilter: false,
      allOrders: [],
      page: 1,
      totalPages: 1,
      date: "",
    };
  },
  async fetch() {
    await this.getAllOrders();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    toggleCalender() {
      this.showCalender = !this.showCalender;
    },
    // openFilter() {
    //   this.showCalender = false;
    //   this.showFilter = true;
    // },
    async getAllOrders() {
      let params = { page: this.page };
      const ordersRes = await this.$axios.get("/orders", { params });
      this.allOrders = await ordersRes.data.docs;
      this.totalPages = await ordersRes.data.totalPages;
      this.page = await ordersRes.data.page;
    },
    dateFormat(date) {
      const df = new Date(date);
      return df.getFullYear() + "-" + df.getMonth() + "-" + df.getDate();
    },
    dateFilter() {
      this.$refs.calenderForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            let params = { page: this.page };
            const filterRes = await this.$axios.get(
              `orders?day=${this.calenderForm.dateInput.toISOString()}`,
              { params }
            );
            this.allOrders = await filterRes.data.docs;
            this.totalPages = await filterRes.data.totalPages;
            this.page = await filterRes.data.page;
            // Reset
            this.calenderForm = {};
            this.toggleCalender();
          } catch (error) {
          } finally {
            loading.close();
          }
        }
      });
    },
  },
  computed: {
    filteredOrders() {
      return this.allOrders.filter((order) =>
        order.phone.includes(this.searchInput)
      );
    },
  },
};
</script>
