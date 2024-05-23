<template>
	<form class="card" @submit.prevent>
		<h1>Вход в систему</h1>
		<div class="form-control">
			<label for="login">Логин</label>
			<input id="login" type="text" />
		</div>
		<div class="form-control">
			<label for="password">Пароль</label>
			<input id="password" type="password" />
		</div>
		<button class="btn primary" type="submit">Войти</button>
	</form>
</template>
<script>
export default {}
</script>
<style lang=""></style>
