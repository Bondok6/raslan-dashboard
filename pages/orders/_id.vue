<template>
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
            <h6 class="value">{{ dateFormat(order.day) }}</h6>
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
                  :placeholder="dateFormat(order.day)"
                  disabled
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
            <h6 class="value">{{ order.gender == "male" ? "ذكر" : "انثى" }}</h6>
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
                :placeholder="order.timeAttendance"
                disabled
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
            <h6 class="key">نوع الخدمة</h6>
            <h6 class="value">باقات</h6>
          </div>
        </div>
        <div>
          <div class="my-2 d-flex align-items-center gap-2">
            <h6 class="key">الفحص</h6>
            <h6 class="value">تساقظ الشعر</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      visitDate: "",
      visitTime: "",
    };
  },
  async fetch() {
    await this.getOrder();
  },
  methods: {
    async getOrder() {
      const order = await this.$axios.get(`/orders/${this.$route.params.id}`);
      this.order = await order.data;
    },
    dateFormat(date) {
      const df = new Date(date);
      return df.getFullYear() + "-" + df.getMonth() + "-" + df.getDate();
    },
  },
};
</script>

<style></style>
