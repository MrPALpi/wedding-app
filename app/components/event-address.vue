<template>
  <div class="event-address ">
    <div class="event-address__container container text-m">
      <nuxt-img class="event-address__img img" src="/flower-stem-2.png" width="90" alt=""/>
      <nuxt-link class="event-address__ text-m" to="https://listvennaya96.ru/" target="_blank">
        ГЛК «Лиственная»
      </nuxt-link>
      По адресу:
      <nuxt-link class="text-m" to="https://yandex.com/maps/-/CPacZQzO" target="_blank">
        Свердловская область,<br> Берёзовский муниципальный округ,<br> ЕКАД, 23-й километр, стр. 1
      </nuxt-link>
    </div>

  </div>

</template>

<script setup lang="ts">
</script>
<style lang="scss">
.event-address {
  position: relative;
  z-index: 1;
}

.event-address__container {
  @include flex-list-column(10px, center);
  text-align: center;
}

.event-address__img {
  right: 0;
  position: absolute;
  top: -25%;
  z-index: -1;
  width: 50px;
  transform: scaleX(-1);

  @include min-tablet {
    width: 90px;
  }
}
</style>
