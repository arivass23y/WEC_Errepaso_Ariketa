<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref, computed } from "vue";

const formData = ref({
    izena: "",
    pasahitza: "",
});

const loginError = ref("");

const userStore = useUserStore();

const isFormValid = computed(() => {
    return formData.value.izena && formData.value.pasahitza;
});

function handleSubmit() {
    console.log("Formulario enviado:", formData.value);

    balidatuLogIn(formData.value.izena, formData.value.pasahitza);
}

async function balidatuLogIn(izena, pasahitza) {
    try {
        const user = await userStore.logIn(izena, pasahitza);
        loginError.value = "";
        formData.value.izena = "";
        formData.value.pasahitza = "";
        console.log("Usuario logueado:", user);
    } catch (error) {
        console.error("Error al loguear:", error);
        loginError.value = error.message;
    }
}

</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="izena">Erabiltzailea:</label>
            <input id="izena" v-model="formData.izena" type="text" />
        </div>
        <div>
            <label for="pasahitza">Pasahitza:</label>
            <input id="pasahitza" v-model="formData.pasahitza" type="password" />
        </div>
        <p>{{ loginError }}</p>

        <button type="submit" :disabled="!isFormValid">Bidali</button>
    </form>
</template>

<style scoped>
button:disabled {
    background-color: lightgray;
    cursor: not-allowed;
}

form div {
    margin-bottom: 30px;
}

p {
    color: red;
    margin-top: 20px;
}
</style>