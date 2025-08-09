<template>
  <v-row class="mb-4">
    <v-col cols="3">
      <v-text-field
        v-model="marksInput"
        variant="outlined"
        density="compact"
        :error-messages="marksError"
        @blur="updateAccountData"
      ></v-text-field>
    </v-col>
    
    <v-col cols="2">
      <v-select
        v-model="localAccount.type"
        :items="accountTypes"
        item-title="title"
        item-value="value"
        variant="outlined"
        density="compact"
        @update:modelValue="updateAccountData"
      ></v-select>
    </v-col>

    <v-col :cols="localAccount.type ? 2 : 4">
      <v-text-field
        v-model="localAccount.login"
        variant="outlined"
        density="compact"
        :error-messages="loginError"
        @blur="updateAccountData"
        required
      ></v-text-field>
    </v-col>
    
    <v-col cols="2" v-if="localAccount.type">
      <v-text-field
        v-model="localAccount.password"
        type="password"
        variant="outlined"
        density="compact"
        :error-messages="passwordError"
        @blur="updateAccountData"
        required
      ></v-text-field>
    </v-col>
    
    <v-col cols="3" class="d-flex align-center">
      <v-btn
        variant="text"
        icon="mdi-delete"
        color="error"
        @click="$emit('delete', localAccount.id)"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  account: {
    type: Object,
    default: () => ({
      id: Date.now(),
      marks: [],
      type: false,
      login: '',
      password: ''
    })
  }
})

const emit = defineEmits(['update', 'delete'])

const localAccount = ref({...props.account})
const marksInput = ref('')

onMounted(() => {
  marksInput.value = props.account.marks?.map(m => m.text).join(';') || ''
})

const accountTypes = [
  { title: 'LDAP', value: false },
  { title: 'Локальная', value: true }
]

const marksError = computed(() => 
  processMarks(marksInput.value).length ? '' : 'Укажите хотя бы одну метку'
)

const loginError = computed(() => 
  localAccount.value.login ? '' : 'Логин обязателен'
)

const passwordError = computed(() => 
  !localAccount.value.type || localAccount.value.password ? '' : 'Пароль обязателен'
)

const processMarks = (marksStr) => {
  if (!marksStr) return []
  return marksStr.split(';')
    .filter(m => m.trim())
    .map(m => ({ text: m.trim() }))
}

const updateAccountData = () => {
  localAccount.value.marks = processMarks(marksInput.value)
  
  if (localAccount.value.login && 
      (!localAccount.value.type || localAccount.value.password) &&
      localAccount.value.marks.length) {
    emit('update', localAccount.value)
  }
}
</script>