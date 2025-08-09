<template>
  <v-row>
    <v-col cols="3">
      <v-text-field
        v-model="marks"
        type="text"
        variant="outlined"
        density="compact"
      ></v-text-field>
    </v-col>
    
    <v-col cols="2">
      <v-select 
        v-model="selected_type"
        :items="account_types"
        item-title="title"
        item-value="value"
        variant="outlined"
        density="compact"
      ></v-select>
    </v-col>

    <v-col :cols="selected_type ? 2 : 4">
      <v-text-field
        v-model="login"
        type="text"
        variant="outlined"
        density="compact"
        required
      ></v-text-field>
    </v-col>
    
    <v-col cols="2" v-show="selected_type">
      <v-text-field
        v-model="password"
        type="password"
        variant="outlined"
        density="compact"
        required
      ></v-text-field>
    </v-col>
    
    <v-col cols="3" class="d-flex align-center">
      <v-btn 
        class="mt--5"
        variant="text"
        density="compact"
        icon="mdi-delete" 
        color="grey"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';

const marks = ref('')
const selected_type = ref(false)
const login = ref('')
const password = selected_type ? ref('') : null;

const emit = defineEmits(['update:modelValue', 'remove']);

const account_types = ref([
  {title: 'LDAP', value: false},
  {title: 'Локальная', value: true}
]);

const show_password = ref(false);

</script>