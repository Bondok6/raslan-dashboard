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
          <span>رقم الهاتف الخاص بالعميل</span>
          <el-input
            v-model="clientsForm.phone"
            placeholder="Client phone number"
            dir="ltr"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="password">
          <span>كلمة المرور</span>
          <el-input
            v-model="clientsForm.password"
            placeholder="ادخل كلمة مرور مناسبة"
            type="password"
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

    <!-- Update Client -->
    <UIPopupForm
      v-if="editModalTrigger"
      :modalTrigger="editModalTrigger"
      @update:modalTrigger="closeEditModal"
    >
      <el-form
        class="p-5 d-flex flex-column"
        :rules="editClientFormRules"
        :model="editClientForm"
        ref="editClientForm"
      >
        <el-form-item label=" " prop="username">
          <span> اسم العميل باللغة العربية </span>
          <el-input
            v-model="editClientForm.username"
            placeholder="اكتب اسم العميل باللغة العربية"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="phone">
          <span>رقم الهاتف</span>
          <el-input
            v-model="editClientForm.phone"
            placeholder="اكتب رقم الهاتف الخاص بالعميل"
            dir="ltr"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " prop="password">
          <span>كلمة المرور</span>
          <el-input
            v-model="editClientForm.password"
            placeholder="ادخل كلمة مرور مناسبة"
            type="password"
          ></el-input>
        </el-form-item>

        <button
          type="submit"
          class="secondary-btn w-50 align-self-end"
          @click.prevent="editClient"
        >
          حفظ التغييرات
        </button>
      </el-form>
    </UIPopupForm>

    <!-- No Clients -->
    <UIEmpty
      v-if="allClients.length < 1"
      imgSrc="clients/no-clients.png"
      alt="no clients"
      caption="قم بإضافة العلاء
    التابعين للمعمل "
    />

    <!-- Clients -->
    <div class="cards">
      <div
        class="card-item d-flex justify-content-between my-2"
        v-for="client in filteredclients"
        :key="client.id"
      >
        <div>
          <div class="d-flex gap-2 align-items-center">
            <h6 class="key">اسم العميل</h6>
            <h6 class="value">{{ client.username }}</h6>
          </div>
          <div class="d-flex gap-3 align-items-center">
            <h6 class="key">رقم الهاتف</h6>
            <h6 class="value" dir="ltr">{{ client.phone }}</h6>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex justify-content-around">
            <img
              src="@/assets/imgs/edit-icon.png"
              alt="edit icon"
              role="button"
              @click="toggleEditModal(client.id)"
            />
            <img
              src="@/assets/imgs/delete-icon.png"
              alt="delete icon"
              role="button"
              @click="deleteClient(client)"
            />
          </div>
          <button
            @click="$router.push(`clients/${client.id}`)"
            type="button"
            class="btn secondary-btn mt-3"
          >
            عرض نتايج التحاليل
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <el-pagination
      v-if="totalPages > 1"
      class="position-relative bottom-0 my-4"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getAllClients"
      :total="totalPages * 10"
    >
    </el-pagination>
  </section>
</template>

<script>
export default {
  data() {
    return {
      modalTrigger: false,
      editModalTrigger: false,
      searchInput: "",
      clientsForm: {},
      clientsFormRules: {
        username: [{ required: true, message: "Username Is Required" }],
        phone: [{ required: true, message: "Phone Is Required" }],
        password: [{ required: true, message: "Password Is Required" }],
      },
      editClientForm: {},
      editClientFormRules: {},
      allClients: [],
      totalPages: 1,
      page: 1,
      targetId: null,
      searchInput: "",
    };
  },
  async fetch() {
    await this.getAllClients();
  },
  methods: {
    toggleModal() {
      this.modalTrigger = !this.modalTrigger;
    },
    closeEditModal() {
      this.editModalTrigger = !this.editModalTrigger;
    },
    async toggleEditModal(clientId) {
      const clientRes = await this.$axios.get(`/fetch/${clientId}/client`);
      this.editClientForm = { ...clientRes.data };
      this.editModalTrigger = !this.editModalTrigger;
      this.targetId = clientId;
    },
    async getAllClients() {
      let params = { page: this.page };
      const clientsRed = await this.$axios.get("/fetch/clients", { params });
      this.allClients = await clientsRed.data.docs;
      this.totalPages = await clientsRed.data.totalPages;
      this.page = await clientsRed.data.page;
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
            await this.$axios.post("/add-client", this.clientsForm);
            this.clientsForm = {};
            this.toggleModal();
            this.getAllClients();
          } catch (error) {
            if (error.response.status === 400) {
              this.$message.error("هذا الرقم متواجد بالفعل");
            } else if (error.response.status === 422) {
              this.$message.error(
                "تأكد من ان رقم الهاتف يبدأ بكود الدولة (2+)"
              );
            } else {
              this.$message.error("حدث خطأ ما");
            }
          } finally {
            loading.close();
          }
        }
      });
    },
    deleteClient(client) {
      this.$confirm(
        `هل انت متأكد من انك تريد حذف هذا العميل ${client.username}`,
        "Warning",
        {
          confirmButtonText: "تأكيد",
          cancelButtonText: "إلغاء",
          type: "warning",
        }
      )
        .then(async () => {
          this.$message({
            type: "success",
            message: "تم حذف العميل بنجاح",
          });
          await this.$axios.delete(`delete/${client.id}/client`);
          await this.getAllClients();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "تم إلغاء الحذف",
          });
        });
    },
    editClient() {
      this.$refs.editClientForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.put(
              `/update/${this.targetId}/client`,
              this.editClientForm
            );
            // Reset
            this.editClientForm = {};
            this.closeEditModal();
            await this.getAllClients();
          } catch (error) {
            console.log(error);
          } finally {
            loading.close();
          }
        }
      });
    },
  },
  computed: {
    filteredclients() {
      return this.allClients.filter((client) =>
        client.phone.includes(this.searchInput)
      );
    },
  },
};
</script>
