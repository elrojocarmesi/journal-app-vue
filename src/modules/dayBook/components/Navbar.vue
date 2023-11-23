<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <img src="@/assets/logo.svg" alt="vue logo" height="24" class="d-inline-block align-text-top mx-2">
            {{ userName }}
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">

                </li>
            </ul>
        </div>
        <div class="d-flex">
            <button class="btn btn-outline-info mx-2" @click="onLogout">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import useAuth from '@/modules/auth/hooks/useAuth';

export default {
    setup() {
        const router = useRouter()
        const { userName, logout } = useAuth()

        return {
            userName,
            onLogout: () => {
                router.push({ name: 'login' })
                logout()
            }
        }
    }
}
</script>