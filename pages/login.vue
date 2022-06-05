<template>
  <div class="login-page">
    <section class="login-page__form-container">
      <div class="alert alert-danger" role="alert" v-if="errorMsg">
        Wrong Data, Please try again!
      </div>

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

          <div class="text-center mb-3">
            <nuxt-link to="/signup" class="orange-text"
              >انشاء حساب جديد</nuxt-link
            >
          </div>

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
      errorMsg: false,
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
            this.errorMsg = true;
          } finally {
            loading.close();
          }
        }
      });
    },
  },
};
</script>

<style></style>
