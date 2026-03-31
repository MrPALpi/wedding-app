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

    <img class="second-screen__streak img" src="../assets/icons/streak.svg?url" alt="">

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
        <nuxt-img class="second-screen__place-img img" src="listvennaya.png" alt=""/>
      </div>
    </div>

    <event-timing class="second-screen__timing"/>
    <photo-block
        class="second-screen__photo-block"
        :first-photo="{src:'we-left.png'}"
        :second-photo="{src:'we-right.png'}"
    />
    <dress-code class="second-screen__dress-code"/>
    <application-form/>
    <div class="second-screen__contacts container text-m text-center">
      <span class="caveat text-l daub-line">Вопросы</span><br>
      <span class="second-screen__contacts-container">
        Если у вас остались вопросы или желания по поздравлению, то можете связаться с нашими организаторами:
        <br>
        <a class="second-screen__contacts-link text-l caveat" href="tel:">Полина<br>&<br> Лола</a>
      </span>
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
  background: url("/flower-6.png") no-repeat 100% 100%;
  background-size: 80px;

  @include min-tablet {
    background-size: 130px;
  }
}

.second-screen__place {
  margin: 30px auto 0;
  max-width: 900px;

  background:
      url("/flower-1.png"),
      url("/flower-2.png"),
      url("/flower-3.png"),
      url("/flower-4.png");
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
  color: #839978FF;
  white-space: nowrap;
}

.second-screen__photo-block {
  background:
      url("/flower-4.png"),
      url("/flower-2.png");
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

.second-screen__contacts-link {
  @include flex-center;

  & {
    margin: 30px auto 0;
    width: max-content;
    padding: 30px;
    line-height: 85%;
    aspect-ratio: 1 / 1;
    background: var(--olive);
    border-radius: 50%;
    color: white;
    cursor: pointer;
  }
}
</style>
