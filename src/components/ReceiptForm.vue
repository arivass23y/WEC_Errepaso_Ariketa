<script setup>
import { ref } from 'vue'
import { useReceiptStore } from '@/stores/receiptStore'

const store = useReceiptStore()

const form = ref({
    id: Date.now(),
    izena: '',
    mota: '',
    zailtasuna: '',
    denbora: ''
})

function saveReceipt() {
    store.addReceipt({ ...form.value, id: Date.now() })
    resetForm()
}

function resetForm() {
    form.value = {
        id: Date.now(),
        izena: '',
        mota: '',
        zailtasuna: '',
        denbora: ''
    }
}
</script>

<template>
    <div>
        <h2>Errezeta berria</h2>

        <input v-model="form.izena" placeholder="Izena" />

        <select v-model="form.mota">
            <option disabled value="">Aukeratu mota</option>
            <option>Lehenengo platerra</option>
            <option>Bigarrena</option>
            <option>Postrea</option>
        </select>

        <select v-model="form.zailtasuna">
            <option disabled value="">Zailtasuna</option>
            <option>Erreza</option>
            <option>Normala</option>
            <option>Zaila</option>
        </select>

        <input v-model="form.denbora" type="number" placeholder="Denbora (min)" />

        <button @click="saveReceipt">Gorde</button>
        <button @click="resetForm">Hustu</button>
    </div>
</template>

<style scoped></style>