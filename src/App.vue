<template>
    <div>
      <HeaderComponent />
      <div class="container">
        <BalanceComponent :totalBalance="total"/>
        <IncomeExpense :income="income" :expense="expense"/>
        <TransactionList :transactions="transactions" @deleteTransaction="handleDeleteTransaction"/>
        <AddTranscation @transactionSubmitted="handleTransaction"/>
      </div>
    </div>
</template>

<script>
import {ref,computed,onMounted} from 'vue'
import { useToast } from 'vue-toastification';
import AddTranscation from './components/AddTranscation.vue'
import BalanceComponent from './components/BalanceComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import IncomeExpense from './components/IncomeExpense.vue'
import TransactionList from './components/TransactionList.vue'


export default {
  name: 'App',
  setup(){
    const transactions =  ref([])

    const total = computed(function totalBalance(){
      let sum = 0
      for(let transaction of transactions.value){
        sum += transaction.amount
      }
      return sum.toFixed(2)
    })

    const income = computed(()=>{
      let total = 0
      for(let transaction of transactions.value){
        if(transaction.amount>=0){
          total += transaction.amount
        }
      }
      return total.toFixed(2)
    })

    const expense = computed(()=>{
      let total = 0
      for(let transaction of transactions.value){
        if(transaction.amount<0){
          total += transaction.amount
        }
      }
      return total.toFixed(2)
    })

    const toast = useToast();
    
    function handleTransaction(transactionData){
      console.log(transactionData)
      let len = transactions.value.length
      transactions.value.push({
        id:len+1,
        text:transactionData.text,
        amount:transactionData.amount
      })
      saveTransactionToLocalStorage();
      toast.success("Transaction Added!")
    }
    
    function handleDeleteTransaction(id){
      console.log(id)
      transactions.value = transactions.value.filter((transactions)=>transactions.id!=id)
      saveTransactionToLocalStorage();
      toast.success("Transaction successfully deleted")
    }
    onMounted(() => {
    const savedTranscations =JSON.parse(localStorage.getItem('transactions'));
    if(savedTranscations){
      this.transactions.value = savedTranscations
    }  
    })

    //save to local storage
    const saveTransactionToLocalStorage = () =>{
      localStorage.setItem('transactions',JSON.stringify(transactions.value))
    }

    return{
      transactions,
      total,
      income,
      expense,
      handleTransaction,
      handleDeleteTransaction
    }
  },
  components:{
    HeaderComponent,
    BalanceComponent,
    IncomeExpense,
    TransactionList,
    AddTranscation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
