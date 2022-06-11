<template>
  <div class="login-page">
    <section class="login-page__form-container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-center">
            <img class="mw-100" src="@/assets/imgs/login-page.gif" alt="" />
          </div>

          <el-form :rules="loginFormRules" :model="loginForm" ref="loginForm">
            <el-form-item label=" " prop="phone">
              <template #label>Phone</template>
              <el-input v-model="loginForm.phone"></el-input>
            </el-form-item>

            <el-form-item label=" " prop="password">
              <template #label>Password</template>
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
          </el-form>

          <div>
            <button
              @click.prevent="submitLogin()"
              class="primary-btn btn-fill mt-1"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "full-page",
  middleware: "loggedIn",
  data() {
    return {
      loginForm: {},
      loginFormRules: {
        phone: [{ required: true, message: "Phone Is Required" }],
        password: [{ required: true, message: "Password Is Required" }],
      },
    };
  },

  methods: {
    submitLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$auth.loginWith("local", { data: this.loginForm });
            this.$router.push("/");
          } catch (error) {
            if (error.response.status === 401) {
              this.$message.error(
                "تأكد من ان رقم الهاتف يبدأ بكود الدولة (2+)"
              );
            } else {
              this.$message.error("خطأ في تسجيل الدخول");
            }
          } finally {
            loading.close();
          }
        }
      });
    },
  },
};
</script>
