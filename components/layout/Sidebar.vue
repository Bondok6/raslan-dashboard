<template>
  <div>
    <div class="sidebar">
      <div class="sidebar__logo-container">
        <img src="@/assets/imgs/logo.svg" class="sidebar__logo-img" alt="" />
      </div>

      <section class="sidebar__list-items">
        <nuxt-link
          exact-active-class="active-sideitem"
          class="sidebar-item"
          tag="div"
          :to="'/'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/stats.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">الإحصائيات و التقيمات</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          class="sidebar-item"
          tag="div"
          :to="'/ads'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/ads.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">الاعلانات</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/orders'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/orders.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">الحجوزات والطلبات</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/categories'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/categories.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">إضافة فئات</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/analysis'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/analysis.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">التحاليل الطبية</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/packages'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/packages.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">الباقات</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/branches'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/branchs.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">الفروع</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/cities'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/branchs.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">المحافظات</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          class="sidebar-item"
          tag="div"
          :to="'/areas'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/branchs.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">المناطق</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          class="sidebar-item"
          tag="div"
          :to="'/articles'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/articles.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">المقالات</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/instructions'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/instructions.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">تعليمات سحب العينة</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/doctors'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/doctors.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">الفريق الطبي</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/clients'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/add-clients.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">إضافة عميل</h6>
        </nuxt-link>

        <nuxt-link
          exact-active-class="active-sideitem"
          tag="div"
          class="sidebar-item"
          :to="'/about-us'"
        >
          <img
            class="sidebar-item__icon"
            src="@/assets/imgs/sidebar/about.svg"
            alt=""
          />
          <h6 class="sidebar-item__label">من نحن</h6>
        </nuxt-link>
      </section>
    </div>
    <div class="mobile-open-sidebar">hi</div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
