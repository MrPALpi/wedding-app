<script lang="ts" setup>
useSeoMeta({
  robots: "noindex, nofollow",
  title: "Вход",
});

const { authenticated } = await $fetch("/api/login");

if (authenticated) navigateTo("/admin");

async function onSubmit(event: SubmitEvent): Promise<void> {
  const form = Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement));

  const success = await $fetch("/api/login", {
    method: "POST",
    body: form,
  })
    .then(res=>res.success)
    .catch(()=>false);

  if (success) navigateTo("/admin");
}
</script>

<template>
  <div class="login-page">
    <form class="login-page__form" @submit.prevent="onSubmit">
      <input class="form__input" name="login" type="text" required>
      <input class="form__input" name="password" type="password"  required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style lang="scss">
.login-page {
  height: 100dvh;
}

.login-page,
.login-page__form {
  @include flex-center;
}

.login-page__form {
  flex-direction: column;
  gap: 16px;
}
</style>
