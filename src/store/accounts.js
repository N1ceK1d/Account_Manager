import { defineStore } from 'pinia'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: []
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now(),
        marks: [],
        type: false,
        login: '',
        password: ''
      })
      this.save()
      console.log(this.accounts);
    },
    removeAccount(id) {
      this.accounts = this.accounts.filter(account => account.id !== id)
      console.log(this.accounts);
      this.save()
    },
    updateAccount(updatedAccount) {
      const index = this.accounts.findIndex(a => a.id === updatedAccount.id)
      if (index !== -1) {
        this.accounts[index] = updatedAccount
        this.save()
      }
      console.log(this.accounts);
    },
    save() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
      console.log(this.accounts);
    },
    load() {
      const saved = localStorage.getItem('accounts')
      if (saved) {
        this.accounts = JSON.parse(saved)
      }
    }
  }
})