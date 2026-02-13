<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReceiptStore } from '@/stores/receiptStore'

const route = useRoute()
const router = useRouter()
const store = useReceiptStore()

const editMode = ref(false)

const receiptOriginal = computed(() =>
    store.getReceiptById(route.params.id)
)

// copia editable
const receipt = ref({ ...receiptOriginal.value })

function volver() {
    router.push('/list')
}

function toggleEdit() {
    if (editMode.value) {
        // Guardar cambios
        store.updateReceipt(receipt.value)
    }
    editMode.value = !editMode.value
}
</script>

<template>
    <div v-if="receipt">

        <h1>Errezetaren xehetasunak</h1>

        <!-- ID -->
        <p><strong>ID:</strong> {{ receipt.id }}</p>

        <!-- IZENA -->
        <div>
            <strong>Izena:</strong>
            <span v-if="!editMode">{{ receipt.izena }}</span>
            <input v-else v-model="receipt.izena" />
        </div>

        <!-- MOTA -->
        <div>
            <strong>Mota:</strong>
            <span v-if="!editMode">{{ receipt.mota }}</span>
            <input v-else v-model="receipt.mota" />
        </div>

        <!-- ZAILTASUNA -->
        <div>
            <strong>Zailtasuna:</strong>
            <span v-if="!editMode">{{ receipt.zailtasuna }}</span>
            <input v-else v-model="receipt.zailtasuna" />
        </div>

        <!-- DENBORA -->
        <div>
            <strong>Denbora:</strong>
            <span v-if="!editMode">{{ receipt.denbora }} min</span>
            <input v-else type="number" v-model="receipt.denbora" />
        </div>

        <!-- OSAGAIAK (ARRAY) -->
        <div>
            <strong>Osagaiak:</strong>

            <ul v-if="!editMode">
                <li v-for="(item, index) in receipt.osagaiak" :key="index">
                    {{ item }}
                </li>
            </ul>

            <div v-else>
                <div v-for="(item, index) in receipt.osagaiak" :key="index">
                    <input v-model="receipt.osagaiak[index]" />
                </div>
                <button @click="receipt.osagaiak.push('')">
                    + Osagaia gehitu
                </button>
            </div>
        </div>

        <!-- PROZEDURA (ARRAY) -->
        <div>
            <strong>Prozedimendua:</strong>

            <ol v-if="!editMode">
                <li v-for="(step, index) in receipt.prozedimendua" :key="index">
                    {{ step }}
                </li>
            </ol>

            <div v-else>
                <div v-for="(step, index) in receipt.prozedimendua" :key="index">
                    <input v-model="receipt.prozedimendua[index]" />
                </div>
                <button @click="receipt.prozedimendua.push('')">
                    + Pausoa gehitu
                </button>
            </div>
        </div>

        <br />

        <!-- BOTONES -->
        <button @click="volver">Itzuli</button>

        <button @click="toggleEdit">
            {{ editMode ? "Gorde" : "Editatu" }}
        </button>

    </div>
</template>

<style scoped></style>