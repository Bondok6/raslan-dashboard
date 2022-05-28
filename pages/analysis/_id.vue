<template>
  <section v-if="!$fetchState.pending">
    <div
      class="card-item d-flex align-items-center justify-content-between my-2 py-2 bg-white"
    >
      <div class="d-flex gap-2 align-items-center">
        <div class="icon" role="button">
          <img :src="test.icon" alt="icon" width="100" height="100" />
        </div>
        <div class="content mx-2" role="button">
          <h6>
            {{ test.titleAr }}
          </h6>
          <div class="d-flex pt-2" v-if="test.availableAt == 'both'">
            <figure class="ms-2">
              <img src="@/assets/imgs/analysis/heal.png" alt="heal" />
              <figcaption class="d-inline">زيارة منزلية</figcaption>
            </figure>
            <figure>
              <img src="@/assets/imgs/analysis/check.png" alt="check" />
              <figcaption class="d-inline">حجز خارجي</figcaption>
            </figure>
          </div>
          <div class="d-flex pt-2" v-else-if="test.availableAt == 'home'">
            <figure class="ms-2">
              <img src="@/assets/imgs/analysis/heal.png" alt="heal" />
              <figcaption class="d-inline">زيارة منزلية</figcaption>
            </figure>
          </div>
          <div class="d-flex pt-2" v-else>
            <figure>
              <img src="@/assets/imgs/analysis/check.png" alt="check" />
              <figcaption class="d-inline">حجز خارجي</figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row-reverse gap-5">
        <div class="options">
          <img src="@/assets/imgs/edit-icon.png" alt="edit icon" />
          <img
            src="@/assets/imgs/delete-icon.png"
            alt="delete icon"
            @click="deleteTest(test)"
          />
        </div>
        <div class="mt-1" v-if="test.priceAfterDiscount">
          <div class="orange-text fw-bold">
            {{ test.priceAfterDiscount }}EGP
          </div>
          <del>{{ test.price }}EGP</del>
        </div>
      </div>
    </div>

    <div class="bg-white d-flex flex-column p-3 gap-3">
      <div>
        <h5 class="purple-text py-2">الفروع التي ينتمي اليها</h5>
        <ul class="list-inline" v-for="branch in branches" :key="branch.id">
          <li class="key">{{ branch.titleAr }}, {{ branch.region.nameAr }}</li>
        </ul>
      </div>
      <div>
        <h5 class="purple-text py-2">النتايج المحتملة</h5>
        <ul
          class="px-3"
          v-for="(result, index) in possibleResults"
          :key="index"
        >
          <li>
            <h6>{{ result.titleAr }}</h6>
            <p class="key">{{ result.descriptionAr }}</p>
          </li>
        </ul>
      </div>
      <div>
        <h5 class="purple-text py-2">الاجراءات الازمة</h5>
        <p class="key">{{ test.measuresAr }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      test: null,
      possibleResults: [],
      branches: [],
    };
  },
  async fetch() {
    await this.getTest();
  },
  methods: {
    async getTest() {
      const testRes = await this.$axios.get(
        `/product/${this.$route.params.id}`
      );
      this.test = await testRes.data;
      this.possibleResults = await testRes.data.possibleResults;
      console.log(this.possibleResults);
      if (this.test.branches.length < 1) return;
      for (let i = 0; i < this.test.branches.length; i++) {
        let branch = await this.$axios.get(`/branch/${this.test.branches[i]}`);
        this.branches.push(await branch.data);
      }
    },
    deleteTest(test) {
      this.$confirm(
        `Are you sure you want to delete test ${test.titleAr}`,
        "Warning",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          this.$message({
            type: "success",
            message: "Delete completed",
          });
          await this.$axios.delete(`product/${test.id}`);
          this.$router.push("/analysis");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
};
</script>

<style></style>
