<template>
    <span class="login100-form-title p-b-41">
        Registrar
    </span>
    <form class="login100-form validate-form p-b-33 p-t-5" @submit.prevent="onSubmit">

        <div class="wrap-input100 validate-input" data-validate="Enter user name">
            <input class="input100" type="text" placeholder="Name" required v-model="userFrm.name">
            <span class="focus-input100" data-placeholder="&#xe82a;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter email">
            <input class="input100" type="email" placeholder="Correo" required v-model="userFrm.email">
            <span class="focus-input100" data-placeholder="&#xe818;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter password">
            <input class="input100" type="password" placeholder="Contraseña" required v-model="userFrm.password">
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button type="submit" class="login100-form-btn">
                Register
            </button>

        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
        </div>
    </form>
</template>
<script>
import { ref } from 'vue';
import useAuth from '../hooks/useAuth';

export default {
    setup() {
        const { createUser } = useAuth()
        const userFrm = ref({
            name: '',
            email: '',
            password: ''
        })

        return {
            userFrm,
            onSubmit: async () => {
                // console.log(userFrm.value)
                createUser(userFrm)
            }
        }
    }
}
</script>
