<template>
  <div class="popup">
    <div class="popup__inner">
      <div class="popup__exit">
        <button
          @click="$emit('update:modalTrigger')"
          type="button"
          class="exit-icon"
        >
          &times;
        </button>
      </div>
      <!-- Add The Form Here -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ["modalTrigger"],
  emits: ["update:modalTrigger"],
};
</script>
