<template>
  <section v-if="!$fetchState.pending">
    <div class="d-flex flex-row-reverse gap-2">
      <img
        src="@/assets/imgs/delete-icon.png"
        alt="delete icon"
        role="button"
        @click="deleteOrder"
      />
      <img
        src="@/assets/imgs/edit-icon.png"
        alt="edit icon"
        role="button"
        @click="editOrder"
      />
    </div>

    <div class="cards mt-3">
      <div class="card-item card-item--orders w-100 my-2">
        <div class="date d-flex">
          <div class="align-self-center text-center">تفاصيل الحجز</div>
        </div>
        <div class="d-flex flex-wrap mx-5 gap-5 w-100">
          <div>
            <div class="my-2 d-flex align-items-center gap-2">
              <h6 class="key">رقم الحجز</h6>
              <h6 class="value">{{ order.id }}</h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="key">موعد الحجز</h6>
              <h6 class="value">{{ dateFormat(order.day) }}</h6>
            </div>
          </div>
          <div>
            <div class="my-2 d-flex align-items-center gap-2">
              <h6 class="key">مكان الحجز</h6>
              <h6 class="value">
                {{ order.booking == "internal" ? "في المعمل" : "في المنزل" }}
              </h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="key">حالة الحجز</h6>
              <h6 class="value">
                <el-select
                  v-model="orderStatus"
                  placeholder="Select"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </h6>
            </div>
            <div v-if="orderStatus == 'rejected'">
              <el-input
                type="input"
                v-model="adminNotes"
                placeholder="سبب الرفض"
                required
              ></el-input>
            </div>
          </div>
        </div>
      </div>

      <div class="card-item card-item--orders w-100 my-2">
        <div class="date d-flex">
          <div class="align-self-center text-center">بيانات المعمل</div>
        </div>
        <div class="d-flex flex-wrap mx-5 gap-5 w-100">
          <div>
            <div class="my-2 d-flex align-items-center gap-2">
              <h6 class="key">اسم العميل</h6>
              <h6 class="value">{{ order.username }}</h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="key">رقم الهاتف</h6>
              <h6 class="value">{{ order.phone }}</h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="key">تاريخ الزيارة</h6>
              <h6 class="value">
                <div class="block">
                  <el-date-picker
                    v-model="visitDate"
                    type="date"
                    :disabled="disabled"
                  >
                  </el-date-picker>
                </div>
              </h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="key">مـــلاحــظــة</h6>
              <h6 class="value">{{ order.clientNotes || "لا يوجــد" }}</h6>
            </div>
          </div>
          <div>
            <div class="my-2 d-flex align-items-center gap-2">
              <h6 class="key">العنوان</h6>
              <h6 class="value">
                {{ order.booking == "internal" ? "في المعمل" : "في المنزل" }}
              </h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="key">النوع</h6>
              <h6 class="value">
                {{ order.gender == "male" ? "ذكر" : "انثى" }}
              </h6>
              <div class="d-flex align-items-center gap-2 me-4">
                <h6 class="key">السن</h6>
                <h6 class="value">{{ order.age }}</h6>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="key">وقت الزيارة</h6>
              <h6 class="value">
                <el-time-select
                  v-model="visitTime"
                  :picker-options="{
                    start: '01:00',
                    step: '00:30',
                    end: '24:00',
                  }"
                  :disabled="disabled"
                >
                </el-time-select>
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div class="card-item card-item--orders w-100 my-2">
        <div class="date d-flex">
          <div class="align-self-center text-center">تفاصيل الخدمة</div>
        </div>
        <div class="d-flex flex-wrap mx-5 gap-5 w-100">
          <div>
            <div class="my-2 d-flex align-items-center gap-2">
              <h6 class="key">الفحص</h6>
              <h6 class="value">{{ order.products[0].titleAr }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="buttons w-100 p-3 d-flex gap-2 justify-content-end"
      v-if="!disabled"
    >
      <button
        type="submit"
        class="secondary-btn w-25 align-self-end"
        @click="saveEdit"
      >
        حفظ
      </button>
      <button
        type="submit"
        class="secondary-btn w-25 align-self-end"
        @click="cancelEdit"
      >
        الغاء
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      order: {},
      visitDate: "",
      visitTime: "",
      disabled: true,
      statusOptions: [
        {
          value: "pending",
          label: "في انتظار التأكيد",
        },
        {
          value: "accepted",
          label: "تمت الموافقة",
        },
        {
          value: "rejected",
          label: "تم الرفض",
        },
        {
          value: "done",
          label: "تم التسليم",
        },
        {
          value: "inProgress",
          label: "يتم سحب العينة",
        },
      ],
      orderStatus: "",
      reason: false,
      adminNotes: "",
    };
  },
  async fetch() {
    await this.getOrder();
  },
  methods: {
    async getOrder() {
      const order = await this.$axios.get(`/orders/${this.$route.params.id}`);
      this.order = await order.data;
      this.orderStatus = await order.data.status;
      this.visitDate = await order.data.day;
      this.visitTime = await order.data.timeAttendance;
    },
    dateFormat(date) {
      const df = new Date(date);
      return df.getFullYear() + "-" + df.getMonth() + "-" + df.getDate();
    },
    deleteOrder() {
      this.$confirm(`Are you sure you want to this order`, "Warning", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "Delete completed",
          });
          await this.$axios.delete(`orders/${this.$route.params.id}`);
          this.$router.push("/orders");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    editOrder() {
      this.disabled = false;
    },
    cancelEdit() {
      this.adminNotes = "";
      this.orderStatus = this.order.status;
      this.visitDate = this.order.day;
      this.visitTime = this.order.from;
      this.disabled = true;
    },
    async saveEdit() {
      if (this.visitDate != this.order.day)
        this.visitDate = this.visitDate.toISOString();

      const editOrderForm = {
        status: this.orderStatus,
        timeAttendance: this.visitTime,
        day: this.visitDate,
        adminNotes: this.adminNotes,
      };
      await this.$axios.patch(
        `/orders/${this.$route.params.id}`,
        editOrderForm
      );
      this.disabled = true;
    },
  },
};
</script>

<style></style>
