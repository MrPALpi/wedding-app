<template>
  <div class="second-screen">

    <div class="second-screen__text">
      <div class="second-screen__text-container container text-m">
        А они уже выросли и спешат сообщить
        <br>
        Вам радостную новость&nbsp;-&nbsp;<span class="second-screen__text-important">мы&nbsp;женимся!</span>
        <br>
        Этот день станет началом нашей долгой
        <br>
        и счастливой семейной жизни.
      </div>
    </div>
    <event-date class="second-screen__date"/>

    <img class="second-screen__streak img" loading="lazy" src="../assets/icons/streak.svg?url" alt="">

    <div class="second-screen__invitation">
      <div class="second-screen__invitation-container container caveat text-l">
        <span class="second-screen__invitation-first daub-line caveat text-l">
         С нетерпением
       </span> <br> будем ждать вас
      </div>
    </div>

    <event-address class="second-screen__address"/>

    <div class="second-screen__place">
      <div class="second-screen__place-container container">
        <nuxt-img class="second-screen__place-img img" loading="lazy" src="listvennaya.webp" alt=""/>
      </div>
    </div>

    <event-timing class="second-screen__timing"/>
    <photo-block
        class="second-screen__photo-block"
        :first-photo="{
          src:'we-left.webp',
          width:416, height: 486,
          fetchpriority: 'auto',
          loading: 'lazy',
          placeholder: true
        }"
        :second-photo="{
          src:'we-right.webp',
          width: 416,
          height:508,
          fetchpriority: 'auto',
          loading: 'lazy',
          placeholder: true
      }"
    />
    <dress-code class="second-screen__dress-code"/>

    <div class="second-screen__note container text-center">
      <span class="second-screen__note-title caveat text-l daub-line">Примечание</span><br>
      <span class="second-screen__note-text text-m">
        Мы решили пригласить все семейные пары без детей,
        чтобы у Вас была возможность расслабиться и насладиться нашим днём.
        По возможности просим Вас заранее позаботиться с кем оставить своих детей
      </span>
    </div>
    <client-only>
      <application-form/>
    </client-only>
    <div class="second-screen__contacts container text-center">
      <span class="caveat text-l daub-line">Вопросы</span><br>
      <span class="second-screen__contacts-container  text-m">
        Если у вас остались вопросы или желания по поздравлению, то можете связаться с нашими организаторами:
        <br>
      </span>
      <div class="second-screen__contacts-list">
        <organizator-contact
            src="/polina.webp"
            name="Полина"
            phone="8 (950) 630-24-44"
            telegram="https://t.me/+79506302444"
            whatsapp="https://wa.me/+79506302444"
        />
        <organizator-contact
            src="/lolita.webp"
            name="Лолита"
            phone="8 (912) 662-38-88"
            telegram="https://t.me/+79126623888"
            whatsapp="https://wa.me/+79126623888"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
.second-screen {
  @include flex-list-column(50px);

  @include min-tablet {
    gap: 80px;
  }

  @include min-laptop {
    gap: 80px;
  }
}

.second-screen__text {
  background: url("/flower-6.webp") no-repeat 100% 100%;
  background-size: 80px;

  @include min-tablet {
    background-size: 130px;
  }
}

.second-screen__place {
  margin: 30px auto 0;
  max-width: 900px;

  background-image: url("/flower-1.webp"),
  url("/flower-2.webp"),
  url("/flower-3.webp"),
  url("/flower-4.webp");
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  background-repeat: no-repeat;
  background-size: 80px, 100px, 100px 80px;

  @include min-tablet {
    background-size: 120px, 200px, 150px, 120px;
  }
}

.second-screen__place-img {
  width: 100%;
}

.second-screen__text-container {
  line-height: 34px;
  text-align: center;
}

.second-screen__text-important {
  font-size: 26px;
  color: var(--olive);
  white-space: nowrap;
}

.second-screen__photo-block {
  background-image: url("/flower-4.webp"),
  url("/flower-2.webp");
  background-repeat: no-repeat;
  background-size: 80px;
  background-position: 0 100%, 100% 0;

  @include min-tablet {
    background-position: 30% 100%, 70% 0;
    background-size: 100px;
  }
}

.second-screen__streak {
  margin: 0 auto;
  width: 50%;
  max-width: 360px;
  min-width: 200px;
}

.second-screen__invitation {
  text-align: center;
}

.second-screen__note {
  padding-top: 30px;
  max-width: 900px;
}

.second-screen__contacts {
  max-width: 900px;
}

.second-screen__contacts-list {
  @include flex-list-wrap(16px, center, space-evenly);

  & {
    margin-top: 32px;
  }
}
</style>
