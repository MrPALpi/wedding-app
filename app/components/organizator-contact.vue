<script lang="ts" setup>
import PhoneIcon from "~/assets/icons/phone.svg";
import TelegramIcon from "~/assets/icons/telegram.svg";
import WhatsappIcon from "~/assets/icons/whatsapp.svg";

defineProps<{
  src: string;
  name: string;
  phone: string;
  telegram: string;
  whatsapp: string;
}>();
</script>

<template>
  <div class="organizer-contact">
    <nuxt-img class="organizer-contact__img img" loading="lazy" width="180" height="180" :src="src" :alt="name" />
    <div class="organizer-contact__info">
      <div class="organizer-contact__name caveat">
        {{ name }}
      </div>
      <nuxt-link class="organizer-contact__link" :to="`tel:${phone}`" target="_blank" external>
        <phone-icon class="organizer-contact__link-icon" filled />
        телефон
      </nuxt-link>
      <nuxt-link class="organizer-contact__link" :to="telegram" target="_blank" external>
        <TelegramIcon class="organizer-contact__link-icon" filled />
        telegram
      </nuxt-link>
      <nuxt-link class="organizer-contact__link" :to="whatsapp" target="_blank" external>
        <WhatsappIcon class="organizer-contact__link-icon"  filled />
        whatsapp
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
.organizer-contact,
.organizer-contact__info {
  @include flex-list-column(16px)
}

.organizer-contact__name {
  font-size: 32px;
}

.organizer-contact__img {
  max-width: 180px;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

.organizer-contact__info {
  gap: 8px;
}

.organizer-contact__link {
  @include flex-list(8px, center, center);
}

.organizer-contact__link-icon {
  display: block;
  margin: 0;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;

  &.nuxt-icon--fill, &.nuxt-icon--fill * {
    fill: initial;
  }
}
</style>
