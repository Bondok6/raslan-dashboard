<template>
  <div class="d-flex justify-content-end">
    <button v-on="$listeners" type="button" class="secondary-btn">
      <b> + </b>{{ buttonText }}
    </button>
  </div>
</template>
<script>
export default {
  props: {
    buttonText: String,
  },
};
</script>
