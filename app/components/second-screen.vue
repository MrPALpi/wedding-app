<template>
  <div class="second-screen">
    <div class="second-screen__container container">
      <div class="second-screen__text text-m">
        А они уже выросли и спешат сообщить
        <br>
        Вам радостную новость&nbsp;-&nbsp;<span class="second-screen__text-important">мы&nbsp;женимся!</span>
        <br>
        Этот день станет началом нашей долгой
        <br>
        и счастливой семейной жизни.
      </div>
      <event-date class="second-screen__date" />
      <img class="second-screen__streak img" src="../assets/icons/streak.svg?url" alt="">
      <div class="second-screen__invitation caveat text-l">
       <span class="second-screen__invitation-first daub-line caveat text-l">
         С нетерпением
       </span> <br> будем ждать вас
      </div>
      <event-address class="second-screen__address" />
      <nuxt-img class="second-screen__place img" src="listvennaya.png" alt=""/>
      <event-timing class="second-screen__timing" />
      <photo-block
          class="second-screen__photo-block"
          :first-photo="{src:'polaroid.png', title: 'Малыши'}"
          :second-photo="{src:'polaroid.png', title: 'Подросли'}"
      />
      <dress-code class="second-screen__dress-code" />
      <application-form  />
    </div>
  </div>
</template>
<style lang="scss">
.second-screen {
  position: relative;

  background-image: url("~/assets/icons/curve-line.svg?url");
  background-position: -10px 0;
  background-repeat: no-repeat;
  background-size: 15%;
  padding-bottom: 80px;
}

.second-screen__container {
  @include flex-list-column(50px);

  @include min-tablet {
    gap: 80px;
  }

  @include min-laptop {
    gap: 80px;
  }
}

.second-screen__place {
  margin: 30px auto 0;
  max-width: 900px;
  width: 100%;
}

.second-screen__text {
  line-height: 34px;
  text-align: center;
}

.second-screen__text-important {
  font-size: 26px;
  color: #839978FF;
  white-space: nowrap;
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

.second-screen__photo-block {
  @include flex-center-horiz;
}
</style>
