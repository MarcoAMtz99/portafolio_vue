<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const reportName = ref('Manager')

const records = ref([])

const newEntry = ref({
  name: '',
  amount: '',
  note: ''
})

// -------- Helpers --------
const addRecord = (type, data = {}) => {
  records.value.push({
    id: crypto.randomUUID(),
    type,
    createdAt: new Date().toISOString(),
    ...data
  })
}

const removeRecord = (id) => {
  records.value = records.value.filter(r => r.id !== id)
}

const clearAll = () => {
  records.value = []
}

// -------- Quick actions --------
const addPayment = () => {
  if (!newEntry.value.name) return
  addRecord('payment', {
    name: newEntry.value.name,
    amount: newEntry.value.amount,
    note: newEntry.value.note
  })
  resetInput()
}

const addPending = () => {
  addRecord('pending', {
    name: newEntry.value.name,
    note: newEntry.value.note
  })
  resetInput()
}

const addSale = () => {
  addRecord('sale', {
    name: newEntry.value.name,
    amount: newEntry.value.amount
  })
  resetInput()
}

const addMaintenance = (text) => {
  addRecord('maintenance', { note: text })
}

const resetInput = () => {
  newEntry.value = { name: '', amount: '', note: '' }
}

// -------- Computed text --------
const reportText = computed(() => {
  const payments = records.value.filter(r => r.type === 'payment')
  const pending = records.value.filter(r => r.type === 'pending')
  const sales = records.value.filter(r => r.type === 'sale')
  const maintenance = records.value.filter(r => r.type === 'maintenance')

  return `
Hi ${reportName.value},

Here is the update for my shift:

Payments received:
${payments.map(p => `- ${p.name} (€${p.amount})`).join('\n')}

Sales:
${sales.map(s => `- ${s.name} (€${s.amount})`).join('\n')}

Maintenance:
${maintenance.map(m => `- ${m.note}`).join('\n')}

Pending:
${pending.map(p => `- ${p.name} (pending)`).join('\n')}

Please let me know if anything else is needed.
  `.trim()
})

// -------- Clipboard --------
const copyReport = async () => {
  await navigator.clipboard.writeText(reportText.value)
}

// -------- Persistencia --------
watch(records, () => {
  localStorage.setItem('shift-report', JSON.stringify(records.value))
}, { deep: true })

onMounted(() => {
  const saved = localStorage.getItem('shift-report')
  if (saved) records.value = JSON.parse(saved)
})
</script>

<template>
  <div class="shift-builder">

    <!-- LEFT PANEL -->
    <div class="panel left">
      <h3>Quick Add</h3>

      <input v-model="newEntry.name" placeholder="Name / Item" />
      <input v-model="newEntry.amount" placeholder="Amount €" />
      <input v-model="newEntry.note" placeholder="Note" />

      <div class="buttons">
        <button @click="addPayment">+ Payment</button>
        <button @click="addPending">+ Pending</button>
        <button @click="addSale">+ Sale</button>
      </div>

      <h4>Maintenance</h4>

      <button @click="addMaintenance('Lobby trash removed')">
        Lobby trash
      </button>

      <button @click="addMaintenance('Kitchen trash removed')">
        Kitchen trash
      </button>

      <button @click="addMaintenance('Laundry done')">
        Laundry
      </button>
    </div>

    <!-- RIGHT PANEL -->
    <div class="panel right">
      <h3>Entries</h3>

      <div v-for="item in records" :key="item.id" class="entry">
        <span>{{ item.type }} - {{ item.name || item.note }}</span>
        <button @click="removeRecord(item.id)">x</button>
      </div>
    </div>

    <!-- OUTPUT -->
    <div class="panel output">
      <h3>Generated Report</h3>
      <textarea :value="reportText" readonly />

      <div class="actions">
        <button @click="copyReport">Copy</button>
        <button @click="clearAll">Clear</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.shift-builder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.panel {
  background: var(--panel-bg);
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 12px;
}

.left input {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 8px;
}

.buttons {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.entry {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.output {
  grid-column: span 2;
}

textarea {
  width: 100%;
  height: 200px;
  background: transparent;
  color: var(--text-primary);
}

button {
  cursor: pointer;
  padding: 6px 10px;
}
</style>