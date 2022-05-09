<template>
  <div class="navbar">
    <div class="d-flex justify-content-between w-100 align-items-center">
      <div class="user-info">
        <h6 class="user-info__name">{{ $auth.user.username }}</h6>
        <span class="user-info__role">{{ $auth.user.role }}</span>
      </div>

      <div class="navbar-actions d-flex justify-content-between gap-3">
        <div class="d-flex gap-2">
          <div>
            <img src="@/assets/imgs/navbar/search.svg" alt="search" />
          </div>

          <div>
            <img
              src="@/assets/imgs/navbar/notificatios.svg"
              alt="notifications"
            />
          </div>
        </div>

        <div>Arabic</div>

        <div>
          <img
            src="@/assets/imgs/navbar/logout.svg"
            alt="logout"
            @click="logout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>
