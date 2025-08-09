<template>
  <v-container width="1200px" class="mt-10 mx-auto">
    <v-form class="col-12">
      <v-row class="my-1 align-center">
        <label class="font-weight-bold">Учётные записи</label>
        <v-btn variant="outlined" @click="add_account" class="ml-2">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
      
      <v-row class="my-1">
        <v-icon color="grey" class="mr-2">mdi-help-circle</v-icon>
        <v-label>
          Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
        </v-label>
      </v-row>
      
      <v-row class="my-1 mb-5">
        <v-col cols="3">
          <v-label class="d-block">Метка</v-label>
        </v-col>
        <v-col cols="2">
          <v-label class="d-block">Тип записи</v-label>
        </v-col>
        <v-col>
          <v-label class="d-block">Логин</v-label>
        </v-col>
        <v-col cols="2">
          <v-label class="d-block">Пароль</v-label>
        </v-col>
        <v-col cols="3">
        </v-col>
      </v-row>
      
      <div v-for="(item, index) in accounts_list" :key="index">
        <component :is="item.component" v-model="item.data" @remove="removeAccount(index)"/>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Account from '@/components/Account.vue';

const accounts_list = ref([]);

function add_account() {
  accounts_list.value.push({
    component: Account,
    data: {
      marks: '',
      selected_type: false,
      login: '',
      password: ''
    }
  });
}

function removeAccount(index) {
  accounts_list.value.splice(index, 1);
}
</script>