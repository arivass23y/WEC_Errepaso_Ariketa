import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

// Usando la sintaxis de Composition API (recomendado para Vue 3)
export const useUserStore = defineStore('user', () => {

    // Estado reactivo
    const usuario = ref(null);
    const usuarios = ref([]);

    // Getters (computadas)
    const nombreUsuario = computed(() => usuario.value ? usuario.value.izena : "Gonbidatua");

    // Acciones (métodos)
    async function logIn(erabiltzailea, pasahitza) {
        if (!usuarios.value.length) {
            await getUsers();
        }

        const user = usuarios.value.find(u => u.izena === erabiltzailea && u.pasahitza === pasahitza);

        if (user) {
            setUsuario(user);
            return user;
        } else {
            throw new Error("Erabiltzailea edo pasahitza ez dira zuzenak");
        }
    }

    async function getUsers() {
        const response = await fetch('/src/data/erabiltzaileak.json');
        usuarios.value = await response.json();
    }

    function setUsuario(user) {
        usuario.value = user;
    }

    function logOut() {
        usuario.value = null;
    }

    return {
        // Estado
        usuario,
        usuarios,

        // Getters
        nombreUsuario,

        // Acciones
        logIn,
        getUsers,
        setUsuario,
        logOut
    }
})
