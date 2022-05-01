<template>
  <div dir="rtl">
    <div class="d-flex">
      <sidebar />
      <div class="app-contant flex-fill px-3">
        <navbar />
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
};
</script>

<style lang="scss">
</style>