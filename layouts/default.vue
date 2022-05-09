<template>
  <div dir="rtl">
    <div class="d-flex">
      <sidebar />
      <div class="app-contant flex-fill px-3">
        <navbar :userName="username" :role="role" />
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/layout/Sidebar.vue";
import navbar from "@/components/layout/Navbar.vue";
export default {
  components: {
    sidebar,
    navbar,
  },
  data() {
    return {
      username: "",
      role: "",
    };
  },
  mounted() {
    console.log(this.getUser());
  },
  methods: {
    async getUser() {
      const user = await this.$axios.get("/profile");
      this.username = user.data.username;
      this.role = user.data.role;
    },
  },
};
</script>

<style lang="scss"></style>
