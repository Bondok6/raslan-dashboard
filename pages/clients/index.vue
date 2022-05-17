<template>
  <section>
    <UIAddButton @click="toggleModal" buttonText="اضافة عميل" />

    <!-- Search -->
    <div class="search w-50">
      <img
        src="@/assets/imgs/orders/search.png"
        alt="search icon"
        class="search__icon"
      />
      <el-input
        placeholder="ابحث برقم الهاتف على العملاء"
        v-model="searchInput"
      ></el-input>
    </div>

    <!-- Add Client -->
    <UIPopupForm
      v-if="modalTrigger"
      :modalTrigger="modalTrigger"
      @update:modalTrigger="toggleModal"
    >
      <el-form
        class="p-5 d-flex flex-column"
        :rules="clientsFormRules"
        :model="clientsForm"
        ref="clientsForm"
      >
        <el-form-item label=" " prop="username">
          <span> اسم العميل باللغة العربية </span>
          <el-input
            v-model="clientsForm.username"
            placeholder="اكتب اسم العميل باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="phone">
          <span>رقم الهاتف</span>
          <el-input
            v-model="clientsForm.phone"
            placeholder="اكتب رقم الهاتف الخاص بالعميل"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="password">
          <span>كلمة المرور</span>
          <el-input
            v-model="clientsForm.password"
            placeholder="ادخل كلمة مرور مناسبة"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="addClient"
        >
          اضافة عميل
        </button>
      </el-form>
    </UIPopupForm>

    <!-- No Clients -->
    <UIEmpty
      v-if="!clients"
      imgSrc="clients/no-clients.png"
      alt="no clients"
      caption="قم بإضافة العلاء التابعين للمعمل "
    />

    <!-- Clients -->
    <div class="cards">
      <div
        class="card-item d-flex justify-content-around"
        v-for="client in clients"
        :key="client.id"
      >
        <div>
          <div class="d-flex gap-2 align-items-center">
            <h6 class="key">اسم العميل</h6>
            <h6 class="value">{{ client.username }}</h6>
          </div>
          <div class="d-flex gap-3 align-items-center">
            <h6 class="key">رقم الهاتف</h6>
            <h6 class="value">{{ client.phone }}</h6>
          </div>
        </div>
        <div>
          <div class="options d-flex">
            <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
            <img src="@/assets/imgs/delete-icon.png" alt="delete icon" />
          </div>
          <button
            @click="$router.push('clients/5')"
            type="button"
            class="btn secondary-btn mt-3"
          >
            تحاليل
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      modalTrigger: false,
      searchInput: "",
      clientsForm: {},
      clientsFormRules: {
        username: [{ required: true, message: "Username Is Required" }],
        phone: [{ required: true, message: "Phone Is Required" }],
        password: [{ required: true, message: "Password Is Required" }],
      },
      clients: [],
    };
  },
  mounted() {
    console.log(this.clients);
  },
  async fetch() {
    console.log(this.clients);
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    addClient() {
      this.$refs.clientsForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            const clientRes = await this.$axios.post(
              "/add-client",
              this.clientsForm
            );
            this.clients.push(clientRes.data);
            Reset;
            this.clientsForm = {};
            this.toggleModal();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
  },
};
</script>
