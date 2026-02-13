<script setup>
import { computed, ref, onMounted } from 'vue'
import { useReceiptStore } from '@/stores/receiptStore'
import { useRouter } from 'vue-router'

const store = useReceiptStore()
const router = useRouter()

const filtro = ref('')

onMounted(() => {
    store.loadReceipts()
})

const filteredReceipts = computed(() => {
    if (!filtro.value) return store.receipts
    return store.receipts.filter(r => r.mota === filtro.value)
})

function verDetalle(id) {
    router.push(`/details/${id}`)
}

function eliminar(id) {
    store.deleteReceipt(id)
}
</script>

<template>
    <div>
        <h2>Errezeten zerrenda</h2>

        <!-- FILTRO -->
        <select v-model="filtro">
            <option value="">Guztiak</option>
            <option>Lehenengo platerra</option>
            <option>Bigarrena</option>
            <option>Postrea</option>
        </select>

        <!-- TABLA -->
        <table border="1">
            <thead>
                <tr>
                    <th>Izena</th>
                    <th>Mota</th>
                    <th>Zailtasuna</th>
                    <th>Ekintzak</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="receipt in filteredReceipts" :key="receipt.id">
                    <td>{{ receipt.izena }}</td>
                    <td>{{ receipt.mota }}</td>
                    <td>{{ receipt.zailtasuna }}</td>
                    <td>
                        <button @click="verDetalle(receipt.id)">Ikusi</button>
                        <button @click="eliminar(receipt.id)">Ezabatu</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>