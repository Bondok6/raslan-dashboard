<template>
  <section v-if="!$fetchState.pending">
    <!-- Flash Messages -->
    <div class="alert alert-danger" role="alert" v-if="errorMsg">
      بيانات مفقودة! من فضلك تأكد من ادخال جميع البيانات بشكل صحيح.
    </div>
    <div class="alert alert-success" role="alert" v-if="successMsg">
      تم تعديل الحجز بنجاح .
    </div>

    <!-- Options - icons -->
    <div class="d-flex flex-row-reverse gap-3">
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
        @click="disabled = false"
      />
      <img
        src="@/assets/imgs/orders/file-icon.png"
        alt="upload-file icon"
        role="button"
        @click="toggleModal"
      />
    </div>

    <!-- Order Details -->
    <div class="cards mt-3">
      <!-- تفاصيل الحجز -->
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
                  v-model="order.status"
                  placeholder="Select"
                  :disabled="disabled"
                  required
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
            <div v-if="order.status == 'rejected'">
              <el-input
                type="input"
                v-model="order.whyRejected"
                placeholder="سبب الرفض"
                required
                :disabled="disabled"
              ></el-input>
            </div>
          </div>
        </div>
      </div>

      <!-- بيانات المعمل -->
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
                    v-model="order.day"
                    type="date"
                    :disabled="disabled || order.status != 'accepted'"
                    required
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
                  v-model="order.timeAttendance"
                  :picker-options="{
                    start: '01:00',
                    step: '00:30',
                    end: '24:00',
                  }"
                  :disabled="disabled || order.status != 'accepted'"
                >
                </el-time-select>
              </h6>
            </div>
            <div
              class="d-flex align-items-center gap-2"
              v-if="order.booking == 'external'"
            >
              <h6 class="key">من</h6>
              <h6 class="value">
                <el-time-select v-model="order.from" disabled> </el-time-select>
              </h6>
              <h6 class="key">الي</h6>
              <h6 class="value">
                <el-time-select v-model="order.to" disabled> </el-time-select>
              </h6>
            </div>
          </div>
        </div>
      </div>

      <!-- تفاصيل الخدمة -->
      <div class="card-item card-item--orders w-100 my-2">
        <div class="date d-flex">
          <div class="align-self-center text-center">تفاصيل الخدمة</div>
        </div>
        <div
          class="d-flex flex-wrap mx-5 gap-5 w-100"
          v-if="order.products.length > 0"
        >
          <div
            class="my-2 d-flex align-items-center gap-2"
            v-for="product of order.products"
            :key="product.id"
          >
            <h6 class="key">الفحص</h6>
            <h6 class="value">{{ product.titleAr }}</h6>
          </div>
        </div>
        <div
          class="d-flex flex-wrap mx-5 gap-5 w-100"
          v-if="order.images.length > 0"
        >
          <div
            class="my-2 d-flex align-items-center gap-2"
            v-for="(image, index) in order.images"
            :key="index"
          >
            <img :src="image" alt="client image" width="150" height="150" />
          </div>
        </div>
      </div>

      <!-- نتيجة التحليل -->
      <div class="card-item card-item--orders w-100 my-2">
        <div class="date d-flex">
          <div class="align-self-center text-center">نتيجة التحليل</div>
        </div>
        <div class="d-flex flex-wrap mx-5 gap-5 w-100" v-if="results">
          <div
            class="my-2 d-flex align-items-center gap-2"
            v-for="(result, index) in results"
            :key="index"
          >
            <a :href="result.attachment" target="_blank">
              <img src="@/assets/imgs/clients/pdf.png" alt="pdf incon" />
            </a>
          </div>
        </div>
        <div v-else class="m-5 w-100 align-middle">
          لا توجد نتيجة مضافة حتي الان
        </div>
      </div>
    </div>

    <!-- Save&Cancel buttons -->
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

    <!-- Add Result -->
    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form
        class="p-5 d-flex flex-column"
        :rules="resultFormRules"
        :model="resultForm"
        ref="resultForm"
      >
        <el-form-item label=" " prop="titleAr">
          <span> اسم التحليل باللغة العربية </span>
          <el-input
            v-model="resultForm.titleAr"
            placeholder="اكتب اسم التحليل باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="titleEn">
          <span>اسم التحليل باللغة الانجليزية</span>
          <el-input
            v-model="resultForm.titleEn"
            placeholder="اكتب اسم التحليل باللغة الانجليزية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="attachment">
          <label for="formFile" class="form-label">اختر نتيجة التحليل</label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="onFileSelected"
            accept=""
          />
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="addResult"
        >
          اضافة نتيجة
        </button>
      </el-form>
    </UIPopupForm>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      order: {},
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
      reason: false,
      errorMsg: false,
      successMsg: false,
      modalTrigger: false,
      editModalTrigger: false,
      resultForm: { attachment: null },
      resultFormRules: {
        titleAr: [{ required: true, message: "This Field Is Required" }],
        titleEn: [{ required: true, message: "This Field Is Required" }],
        attachment: [{ required: true, message: "This Field Is Required" }],
      },
      results: null,
    };
  },
  async fetch() {
    await this.getOrder();
    await this.getResult();
  },
  methods: {
    async getOrder() {
      const order = await this.$axios.get(`/orders/${this.$route.params.id}`);
      this.order = await order.data;
      console.log(this.order);
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
    cancelEdit() {
      this.adminNotes = "";
      this.orderStatus = this.order.status;
      this.visitDate = this.order.day;
      this.visitTime = this.order.from;
      this.disabled = true;
      this.errorMsg = false;
    },
    async saveEdit() {
      try {
        await this.$axios.patch(`/orders/${this.$route.params.id}`, this.order);
        this.disabled = true;
        this.errorMsg = false;
        this.successMsg = true;
      } catch (error) {
        this.errorMsg = true;
      }
    },
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    onFileSelected(e) {
      if (e.target.files.length > 0) {
        this.resultForm.attachment = e.target.files[0];
      }
    },
    addResult() {
      this.$refs.resultForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            const formData = new FormData();
            formData.append("pdf", this.resultForm.attachment);
            const fileRes = await this.$axios.post("/images", formData);
            const attachment = await fileRes.data;

            const fd = new FormData();
            fd.append("titleAr", this.resultForm.titleAr);
            fd.append("titleEn", this.resultForm.titleEn);
            fd.append("attachment", attachment);
            fd.append("subject", this.$route.params.id);
            fd.append("subjectType", "order");

            await this.$axios.post("/results", fd);

            // Reset
            this.resultForm = {};
            this.toggleModal();
            await this.getResult();
            this.successMsg = true;
            this.errorMsg = false;
          } catch (error) {
            this.errorMsg = true;
          } finally {
            loading.close();
          }
        }
      });
    },
    async getResult() {
      const resultRes = await this.$axios.get(
        `/results?order=${this.$route.params.id}`
      );
      if (resultRes.data.length > 0) {
        this.results = resultRes.data[0].docs;
      }
    },
  },
};
</script>
