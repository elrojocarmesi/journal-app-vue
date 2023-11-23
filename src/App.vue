<template>
  <h1 v-if="authStatus === 'authenticating'">{{ authStatus }}</h1>
  <router-view v-else></router-view>
</template>
<script >
import { RouterView } from 'vue-router'
import useAuth from './modules/auth/hooks/useAuth';

export default {
  setup() {
    const { authStatus, checkAuthStatus } = useAuth()
    checkAuthStatus()
    return {
      authStatus
    }
  }
}

</script>

<style scoped></style>
