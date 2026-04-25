<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const STORAGE_KEY = 'shift-report-builder-v2'

const managerName = ref('Manager')
const copied = ref(false)

const records = ref([])

const paymentForm = ref({
  name: '',
  room: '',
  bed: '',
  amount: '',
  paymentMethod: 'cash',
  period: '',
  note: '',
})

const pendingForm = ref({
  name: '',
  amount: '',
  period: '',
  note: '',
})

const saleForm = ref({
  product: '',
  quantity: 1,
  amount: '',
  paymentMethod: 'card',
})

const cashForm = ref({
  concept: 'Cash mug',
  amount: '',
  note: '',
})

const noteForm = ref({
  section: 'start',
  description: '',
})

const customMaintenance = ref('')

const maintenanceQuickActions = [
  'Lobby trash removed',
  'Kitchen trash removed',
  'Paper replaced in lobby bathroom',
  'Paper replaced in bathrooms 200',
  'Paper replaced in bathrooms 400',
  'Paper replaced in bathrooms 500',
  'Laundry done',
]

const createId = () => {
  return crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
}

const addRecord = (type, data = {}) => {
  records.value.unshift({
    id: createId(),
    type,
    createdAt: new Date().toISOString(),
    ...data,
  })
}

const removeRecord = (id) => {
  records.value = records.value.filter((item) => item.id !== id)
}

const clearAll = () => {
  if (!confirm('Clear the full shift report?')) return
  records.value = []
}

const formatMoney = (amount) => {
  const value = Number(amount || 0)
  return `€${value.toFixed(2)}`
}

const hasValue = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== ''
}

const addPayment = () => {
  if (!paymentForm.value.name || !paymentForm.value.amount) return

  addRecord('payment', {
    title: 'Payment received',
    name: paymentForm.value.name,
    room: paymentForm.value.room,
    bed: paymentForm.value.bed,
    amount: Number(paymentForm.value.amount),
    paymentMethod: paymentForm.value.paymentMethod,
    period: paymentForm.value.period,
    note: paymentForm.value.note,
  })

  paymentForm.value = {
    name: '',
    room: '',
    bed: '',
    amount: '',
    paymentMethod: 'cash',
    period: '',
    note: '',
  }
}

const addPendingPayment = () => {
  if (!pendingForm.value.name) return

  addRecord('pending_payment', {
    title: 'Pending payment',
    name: pendingForm.value.name,
    amount: hasValue(pendingForm.value.amount) ? Number(pendingForm.value.amount) : '',
    period: pendingForm.value.period,
    note: pendingForm.value.note,
  })

  pendingForm.value = {
    name: '',
    amount: '',
    period: '',
    note: '',
  }
}

const addSale = () => {
  if (!saleForm.value.product || !saleForm.value.amount) return

  addRecord('sale', {
    title: saleForm.value.product,
    quantity: Number(saleForm.value.quantity || 1),
    amount: Number(saleForm.value.amount),
    paymentMethod: saleForm.value.paymentMethod,
  })

  saleForm.value = {
    product: '',
    quantity: 1,
    amount: '',
    paymentMethod: 'card',
  }
}

const addCash = () => {
  if (!cashForm.value.concept || !hasValue(cashForm.value.amount)) return

  addRecord('cash', {
    title: cashForm.value.concept,
    amount: Number(cashForm.value.amount),
    note: cashForm.value.note,
  })

  cashForm.value = {
    concept: 'Cash mug',
    amount: '',
    note: '',
  }
}

const addMaintenance = (description) => {
  if (!description) return

  addRecord('maintenance', {
    title: 'Maintenance',
    description,
  })
}

const addCustomMaintenance = () => {
  if (!customMaintenance.value) return
  addMaintenance(customMaintenance.value)
  customMaintenance.value = ''
}

const addNote = () => {
  if (!noteForm.value.description) return

  addRecord('note', {
    title: noteForm.value.section === 'start' ? 'Start of shift' : 'End of shift',
    section: noteForm.value.section,
    description: noteForm.value.description,
  })

  noteForm.value.description = ''
}

const paymentsReceived = computed(() => records.value.filter((item) => item.type === 'payment'))
const pendingPayments = computed(() => records.value.filter((item) => item.type === 'pending_payment'))
const sales = computed(() => records.value.filter((item) => item.type === 'sale'))
const cashRecords = computed(() => records.value.filter((item) => item.type === 'cash'))
const maintenanceTasks = computed(() => records.value.filter((item) => item.type === 'maintenance'))
const startNotes = computed(() => records.value.filter((item) => item.type === 'note' && item.section === 'start'))
const endNotes = computed(() => records.value.filter((item) => item.type === 'note' && item.section === 'end'))

const totalTransactions = computed(() => {
  return records.value.reduce((total, item) => {
    if (['payment', 'sale', 'cash'].includes(item.type)) {
      return total + Number(item.amount || 0)
    }

    return total
  }, 0)
})

const recordLabel = (item) => {
  if (item.type === 'payment') return `Payment · ${item.name} · ${formatMoney(item.amount)}`
  if (item.type === 'pending_payment') return `Pending · ${item.name}`
  if (item.type === 'sale') return `Sale · ${item.quantity || 1} ${item.title}`
  if (item.type === 'cash') return `Cash · ${item.title} · ${formatMoney(item.amount)}`
  if (item.type === 'maintenance') return `Maintenance · ${item.description}`
  if (item.type === 'note') return `${item.section === 'start' ? 'Start' : 'End'} note · ${item.description}`
  return item.title || item.type
}

const reportText = computed(() => {
  const lines = []

  lines.push(`Hi ${managerName.value || 'there'},`)
  lines.push('')
  lines.push('Here is the update for my shift:')
  lines.push('')

  if (startNotes.value.length) {
    lines.push('Start of shift:')
    startNotes.value.forEach((item) => {
      lines.push(`- ${item.description}`)
    })
    lines.push('')
  }

  if (paymentsReceived.value.length) {
    lines.push('Payments received:')
    paymentsReceived.value.forEach((item) => {
      const method = item.paymentMethod ? `, ${item.paymentMethod}` : ''
      const period = item.period ? ` for ${item.period}` : ''
      const roomBed = item.room || item.bed ? ` Room ${item.room || '-'}${item.bed ? `, bed ${item.bed}` : ''}.` : ''
      const note = item.note ? ` ${item.note}` : ''

      lines.push(`- Received payment from ${item.name} (${formatMoney(item.amount)}${method})${period}.${roomBed}${note}`)
    })
    lines.push('')
  }

  if (sales.value.length) {
    lines.push('Sales:')
    sales.value.forEach((item) => {
      const quantity = item.quantity || 1
      const method = item.paymentMethod ? `, ${item.paymentMethod}` : ''
      lines.push(`- Sold ${quantity} ${item.title} (${formatMoney(item.amount)}${method}).`)
    })
    lines.push('')
  }

  if (maintenanceTasks.value.length) {
    lines.push('Maintenance:')
    maintenanceTasks.value.forEach((item) => {
      lines.push(`- ${item.description}`)
    })
    lines.push('')
  }

  if (pendingPayments.value.length) {
    lines.push('Pending:')
    pendingPayments.value.forEach((item) => {
      const amount = hasValue(item.amount) ? `${formatMoney(item.amount)} ` : ''
      const period = item.period ? `for ${item.period} ` : ''
      const note = item.note ? ` ${item.note}` : ''
      lines.push(`- ${item.name} – ${amount}${period}(payment not received).${note}`)
    })
    lines.push('')
  }

  if (cashRecords.value.length || totalTransactions.value > 0) {
    lines.push('Transactions summary:')
    cashRecords.value.forEach((item) => {
      const note = item.note ? ` (${item.note})` : ''
      lines.push(`- ${item.title}: ${formatMoney(item.amount)}${note}`)
    })
    lines.push(`- Total transactions: ${formatMoney(totalTransactions.value)}`)
    lines.push('')
  }

  if (endNotes.value.length) {
    lines.push('End of shift:')
    endNotes.value.forEach((item) => {
      lines.push(`- ${item.description}`)
    })
    lines.push('')
  }

  lines.push('Please let me know if anything else is needed.')

  return lines.join('\n')
})

const copyReport = async () => {
  await navigator.clipboard.writeText(reportText.value)
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 1600)
}

watch(
  [records, managerName],
  () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        managerName: managerName.value,
        records: records.value,
      }),
    )
  },
  { deep: true },
)

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) return

  try {
    const parsed = JSON.parse(saved)
    managerName.value = parsed.managerName || 'Manager'
    records.value = parsed.records || []
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
})
</script>

<template>
  <main class="shift-report-page">
    <section class="tool-hero">
      <div>
        <p class="eyebrow">/shift-review</p>
        <h1>Shift Report Builder</h1>
        <p>
          Build a clean shift update in English and copy it directly to WhatsApp.
        </p>
      </div>

      <div class="hero-card">
        <span>Total transactions</span>
        <strong>{{ formatMoney(totalTransactions) }}</strong>
      </div>
    </section>

    <section class="builder-layout">
      <aside class="builder-panel input-panel">
        <div class="panel-header">
          <h2>Add entries</h2>
          <span>{{ records.length }} items</span>
        </div>

        <label class="field">
          <span>Manager name</span>
          <input v-model="managerName" type="text" placeholder="Manager" />
        </label>

        <details open class="form-card">
          <summary>Payment received</summary>

          <div class="form-grid">
            <input v-model="paymentForm.name" placeholder="Name" />
            <input v-model="paymentForm.amount" type="number" placeholder="Amount €" />
            <input v-model="paymentForm.room" placeholder="Room" />
            <input v-model="paymentForm.bed" placeholder="Bed" />
            <select v-model="paymentForm.paymentMethod">
              <option value="cash">cash</option>
              <option value="card">card</option>
              <option value="bank transfer">bank transfer</option>
            </select>
            <input v-model="paymentForm.period" placeholder="Period e.g. 2 weeks" />
          </div>

          <input v-model="paymentForm.note" placeholder="Optional note" />

          <button class="primary-action" @click="addPayment">
            Add payment
          </button>
        </details>

        <details class="form-card">
          <summary>Pending payment</summary>

          <div class="form-grid">
            <input v-model="pendingForm.name" placeholder="Name" />
            <input v-model="pendingForm.amount" type="number" placeholder="Amount € optional" />
          </div>

          <input v-model="pendingForm.period" placeholder="Period e.g. 1 week" />
          <input v-model="pendingForm.note" placeholder="Optional note" />

          <button class="primary-action" @click="addPendingPayment">
            Add pending
          </button>
        </details>

        <details class="form-card">
          <summary>Sale</summary>

          <div class="form-grid">
            <input v-model="saleForm.product" placeholder="Product" />
            <input v-model="saleForm.amount" type="number" placeholder="Amount €" />
            <input v-model="saleForm.quantity" type="number" placeholder="Quantity" />
            <select v-model="saleForm.paymentMethod">
              <option value="cash">cash</option>
              <option value="card">card</option>
              <option value="bank transfer">bank transfer</option>
            </select>
          </div>

          <button class="primary-action" @click="addSale">
            Add sale
          </button>
        </details>

        <details class="form-card">
          <summary>Cash / safe</summary>

          <select v-model="cashForm.concept">
            <option value="Cash mug">Cash mug</option>
            <option value="Cash in safe">Cash in safe</option>
            <option value="Money added to safe">Money added to safe</option>
          </select>

          <input v-model="cashForm.amount" type="number" placeholder="Amount €" />
          <input v-model="cashForm.note" placeholder="Optional note" />

          <button class="primary-action" @click="addCash">
            Add cash record
          </button>
        </details>

        <details class="form-card">
          <summary>Maintenance</summary>

          <div class="quick-actions">
            <button
              v-for="action in maintenanceQuickActions"
              :key="action"
              @click="addMaintenance(action)"
            >
              {{ action }}
            </button>
          </div>

          <input v-model="customMaintenance" placeholder="Custom maintenance task" />

          <button class="primary-action" @click="addCustomMaintenance">
            Add custom task
          </button>
        </details>

        <details class="form-card">
          <summary>Shift notes</summary>

          <select v-model="noteForm.section">
            <option value="start">Start of shift</option>
            <option value="end">End of shift</option>
          </select>

          <textarea
            v-model="noteForm.description"
            placeholder="Write a note..."
            rows="3"
          />

          <button class="primary-action" @click="addNote">
            Add note
          </button>
        </details>
      </aside>

      <section class="builder-panel list-panel">
        <div class="panel-header">
          <h2>Added records</h2>
          <button class="ghost-action danger" @click="clearAll">
            Clear all
          </button>
        </div>

        <div v-if="!records.length" class="empty-state">
          No records yet. Add payments, sales, maintenance or notes.
        </div>

        <div v-else class="record-list">
          <article
            v-for="item in records"
            :key="item.id"
            class="record-item"
          >
            <div>
              <span class="record-type">{{ item.type.replace('_', ' ') }}</span>
              <p>{{ recordLabel(item) }}</p>
            </div>

            <button @click="removeRecord(item.id)">
              Remove
            </button>
          </article>
        </div>
      </section>

      <section class="builder-panel preview-panel">
        <div class="panel-header">
          <h2>Report preview</h2>
          <button class="primary-action" @click="copyReport">
            {{ copied ? 'Copied!' : 'Copy report' }}
          </button>
        </div>

        <textarea :value="reportText" readonly />
      </section>
    </section>
  </main>
</template>

<style scoped>
.shift-report-page {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 20px 80px;
}

.tool-hero {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.tool-hero h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.6rem);
  color: var(--text-primary);
}

.tool-hero p {
  max-width: 680px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.hero-card {
  min-width: 220px;
  border: 1px solid var(--panel-border);
  background: var(--panel-bg);
  border-radius: var(--panel-radius);
  padding: 22px;
  display: grid;
  align-content: center;
}

.hero-card span {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.hero-card strong {
  margin-top: 8px;
  color: var(--text-primary);
  font-size: 2rem;
}

.builder-layout {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 18px;
  align-items: start;
}

.builder-panel {
  border: 1px solid var(--panel-border);
  background: var(--panel-bg);
  border-radius: var(--panel-radius);
  box-shadow: var(--panel-shadow);
  padding: 18px;
}

.input-panel {
  grid-row: span 2;
}

.preview-panel {
  grid-column: 2;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1rem;
  color: var(--text-primary);
}

.panel-header span {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.field {
  display: grid;
  gap: 6px;
  margin-bottom: 14px;
}

.field span {
  color: var(--text-secondary);
  font-size: 0.82rem;
}

.form-card {
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.025);
}

.form-card summary {
  cursor: pointer;
  color: var(--text-primary);
  font-weight: 700;
  margin-bottom: 12px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.045);
  color: var(--text-primary);
  border-radius: 10px;
  padding: 11px 12px;
  outline: none;
  margin-bottom: 10px;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.preview-panel textarea {
  min-height: 520px;
  font-family: inherit;
  line-height: 1.7;
}

input::placeholder,
textarea::placeholder {
  color: color-mix(in srgb, var(--text-secondary) 70%, transparent);
}

button {
  border: 0;
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 700;
}

.primary-action {
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
}

.ghost-action {
  border: 1px solid var(--button-secondary-border);
  background: var(--button-secondary-bg);
  color: var(--button-secondary-text);
}

.danger {
  color: #f87171;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.quick-actions button {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-weight: 600;
}

.record-list {
  display: grid;
  gap: 10px;
}

.record-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.025);
}

.record-type {
  display: inline-block;
  margin-bottom: 4px;
  color: var(--accent);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.record-item p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.record-item button {
  align-self: flex-start;
  background: transparent;
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.25);
}

.empty-state {
  border: 1px dashed var(--border);
  border-radius: 14px;
  padding: 18px;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 980px) {
  .tool-hero {
    flex-direction: column;
  }

  .hero-card {
    min-width: unset;
  }

  .builder-layout {
    grid-template-columns: 1fr;
  }

  .input-panel,
  .preview-panel {
    grid-row: auto;
    grid-column: auto;
  }

  .preview-panel textarea {
    min-height: 380px;
  }
}

@media (max-width: 620px) {
  .shift-report-page {
    padding: 24px 14px 64px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .panel-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .record-item {
    flex-direction: column;
  }
}
</style>