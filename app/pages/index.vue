<template>
  <div class="wedding">
    <first-screen />
    <second-screen />
    <hero-timer/>
  </div>

</template>

<script setup lang="ts">
</script>
<style lang="scss">
.wedding {
  @include flex-list-column(50px);

  @include min-tablet {
    gap: 100px;
  }
}
</style>
