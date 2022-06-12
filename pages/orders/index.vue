<template>
  <section class="orders-page" @keyup.enter="phoneFilter()">
    <!-- Phone Filters -->
    <div class="d-flex justify-content-end align-items-center gap-3">
      <div class="search">
        <img
          src="@/assets/imgs/orders/search.png"
          class="search__icon"
          alt="search icon"
          @click="phoneFilter()"
          role="button"
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
      </div>
      <div role="button" @click="clearFilter">
        <img src="@/assets/imgs/reload.svg" width="25" />
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

    <!-- Status Filter -->
    <el-form class="col-lg-4 col-sm-8">
      <el-form-item>
        <el-select
          v-model="statusFilter"
          @change="filterByStatus"
          placeholder="حدد الطلبات باختيار الحالة المناسبة لها"
          class="w-100"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            class="text-center"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- Orders -->
    <div class="cards mt-3">
      <div
        class="card-item card-item--orders my-2"
        v-for="order in allOrders"
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
      v-if="allOrders.length < 1"
      imgSrc="orders/no-orders.png"
      alt="no orders"
      caption="لا توجد حجوزات"
    />

    <!-- Pagination -->
    <el-pagination
      v-if="totalPages > 1 && filter == ''"
      class="position-relative bottom-0 my-4"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getAllOrders()"
      :total="totalPages * 10"
    >
    </el-pagination>

    <!-- Date Pagination -->
    <el-pagination
      v-if="totalPages > 1 && filter == 'date'"
      class="position-relative bottom-0 my-4"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="filterByDate()"
      :total="totalPages * 10"
    >
    </el-pagination>

    <!-- Phone Pagination -->
    <el-pagination
      v-if="totalPages > 1 && filter == 'phone'"
      class="position-relative bottom-0 my-4"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="phoneFilter()"
      :total="totalPages * 10"
    >
    </el-pagination>

    <!-- Status Pagination -->
    <el-pagination
      v-if="totalPages > 1 && filter == 'status'"
      class="position-relative bottom-0 my-4"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="filterByStatus()"
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
      statusOptions: [
        { value: "all", label: "كل الطلبات" },
        { value: "pending", label: "في انتظار التأكيد" },
        { value: "accepted", label: "تمت الموافقة" },
        { value: "rejected", label: "تم الرفض" },
        { value: "done", label: "تم التسليم" },
        { value: "inProgress", label: "يتم سحب العينة" },
      ],
      statusFilter: "",
      modalTrigger: false,
      showCalender: false,
      showFilter: false,
      allOrders: [],
      page: 1,
      totalPages: 1,
      date: "",
      filter: "",
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
    async getAllOrders() {
      let params = { page: this.page };
      const ordersRes = await this.$axios.get("/orders", { params });
      this.allOrders = await ordersRes.data.docs;
      this.totalPages = await ordersRes.data.totalPages;
      this.page = await ordersRes.data.page;
    },
    async filterByDate() {
      let params = { page: this.page };
      const filterRes = await this.$axios.get(
        `orders?day=${this.calenderForm.dateInput.toISOString()}`,
        { params }
      );
      this.allOrders = await filterRes.data.docs;
      this.totalPages = await filterRes.data.totalPages;
      this.page = await filterRes.data.page;
      this.filter = "date";
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
            await this.filterByDate();
            this.toggleCalender();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
    async phoneFilter() {
      if (!this.searchInput) return;
      try {
        let params = { page: this.page };
        const filterRes = await this.$axios.get(
          `orders?phone=${this.searchInput}`,
          { params }
        );
        this.allOrders = await filterRes.data.docs;
        this.totalPages = await filterRes.data.totalPages;
        this.page = await filterRes.data.page;
        this.filter = "phone";
      } catch (error) {
        console.log(error);
      }
    },
    clearFilter() {
      this.filter = false;
      window.location.reload();
    },
    async filterByStatus() {
      this.filter = "status";
      if (this.statusFilter === "all") {
        await this.getAllOrders();
        return;
      }
      let params = { page: this.page };
      const ordersRes = await this.$axios.get(
        `/orders?status=${this.statusFilter}`,
        { params }
      );
      this.allOrders = await ordersRes.data.docs;
      this.totalPages = await ordersRes.data.totalPages;
      this.page = await ordersRes.data.page;
    },
  },
};
</script>
