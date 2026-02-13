import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReceiptStore = defineStore('receipt', () => {

    const receipts = ref([])

    async function loadReceipts() {
        if (!receipts.value.length) {
            const response = await fetch('/data/errezetak.json')
            receipts.value = await response.json()
        }
    }

    function addReceipt(receipt) {
        receipts.value.push(receipt)
    }

    function deleteReceipt(id) {
        receipts.value = receipts.value.filter(r => r.id !== id)
    }

    function getReceiptById(id) {
        return receipts.value.find(r => r.id === Number(id))
    }

    return {
        receipts,
        loadReceipts,
        addReceipt,
        deleteReceipt,
        getReceiptById
    }
})
