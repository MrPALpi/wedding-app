<template>
  <div class="wedding">
    <first-screen />
    <second-screen />
  </div>

</template>

<style lang="scss">
.wedding {
  @include flex-list-column(50px);

  @include min-tablet {
    gap: 100px;
  }
}
</style>
