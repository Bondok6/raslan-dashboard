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

          <el-form
            :rules="signupFormRules"
            :model="signupForm"
            ref="signupForm"
          >
            <el-form-item label=" " prop="username">
              <template #label>Username</template>
              <el-input v-model="signupForm.username"></el-input>
            </el-form-item>

            <el-form-item label=" " prop="phone">
              <template #label>Phone</template>
              <el-input v-model="signupForm.phone"></el-input>
            </el-form-item>

            <el-form-item label=" " prop="password">
              <template #label>Password</template>
              <el-input
                type="password"
                v-model="signupForm.password"
              ></el-input>
            </el-form-item>
          </el-form>

          <div>
            <button
              @click.prevent="submitSignup()"
              class="primary-btn btn-fill mt-1"
            >
              Signup
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
  auth: false,
  data() {
    return {
      errorMsg: false,
      signupForm: {},
      signupFormRules: {
        username: [{ required: true, message: "Username Is Required" }],
        phone: [{ required: true, message: "Phone Is Required" }],
        password: [{ required: true, message: "Password Is Required" }],
      },
    };
  },

  methods: {
    submitSignup() {
      this.$refs.signupForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            await this.$axios.post("/signup", this.signupForm);
            this.$router.push("/login");
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
