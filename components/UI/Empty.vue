<template>
  <div class="mt-5">
    <figure class="text-center">
      <img :src="require(`@/assets/imgs/${imgSrc}`)" :alt="alt" />
      <figcaption class="p-2">{{ caption }}</figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: String,
    alt: String,
    caption: String,
  },
};
</script>
