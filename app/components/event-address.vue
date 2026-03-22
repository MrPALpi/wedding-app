<template>
  <div class="event-address text-m">
    <img src="~/assets/icons/green-flower.svg?url" alt="" class="event-address__img">
    <nuxt-link class="event-address__ text-m" to="https://listvennaya96.ru/" target="_blank">
      ГЛК «Лиственная»
    </nuxt-link>
    По адресу:
    <nuxt-link class="text-m" to="https://yandex.com/maps/-/CPacZQzO" target="_blank">
      Свердловская область,<br> Берёзовский муниципальный округ,<br> ЕКАД, 23-й километр, стр. 1
    </nuxt-link>
  </div>

</template>

<script setup lang="ts">
</script>
<style lang="scss">
.event-address {
  @include flex-list-column(10px);

  & {
    position: relative;
    z-index: 1;
    text-align: center;
  }
}

.event-address__img {
  right: 0;
  position: absolute;
  top: -25%;
  z-index: -1;
  width: 50px;
  height: 50px;

  @include min-tablet {
    width: 90px;
    height: 90px;
  }
}
</style>
