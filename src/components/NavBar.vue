<script setup>
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/list">List</RouterLink>
        <RouterLink to="/details">Details</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <p class="user">{{ userStore.nombreUsuario }}</p>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
}
.user {
  margin-left: auto;
  font-weight: bold;
}
</style>
