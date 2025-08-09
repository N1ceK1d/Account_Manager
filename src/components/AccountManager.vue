<template>
  <v-container width="1200px" class="mt-10 mx-auto">
    <v-form class="col-12">
      <v-row class="my-1 align-center">
        <label class="font-weight-bold">Учётные записи</label>
        <v-btn variant="outlined" @click="addAccount" class="ml-2">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
      
      <v-row class="my-1">
        <v-icon color="grey" class="mr-2">mdi-help-circle</v-icon>
        <v-label>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</v-label>
      </v-row>
      
      <v-row class="my-1 mb-5">
        <v-col cols="3"><v-label>Метка</v-label></v-col>
        <v-col cols="2"><v-label>Тип записи</v-label></v-col>
        <v-col><v-label>Логин</v-label></v-col>
        <v-col cols="2"><v-label>Пароль</v-label></v-col>
        <v-col cols="3"></v-col>
      </v-row>
      
      <Account 
        v-for="account in accounts" 
        :key="account.id"
        :account="account"
        @update="updateAccount"
        @delete="removeAccount"
      />
    </v-form>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAccountsStore } from '@/store/accounts'
import Account from '@/components/Account.vue'

const store = useAccountsStore()
const { accounts } = storeToRefs(store)

store.load()

const addAccount = () => store.addAccount()
const updateAccount = (account) => store.updateAccount(account)
const removeAccount = (id) => store.removeAccount(id)
</script>