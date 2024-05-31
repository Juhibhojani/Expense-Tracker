<template>
  <div>
    <h4>Your Balance</h4>
    <h1 id="balance"> ₹ {{totalBalance}}</h1>
  </div>
</template>

<script>
export default {
    name:"BalanceComponent",
    props:['totalBalance']

}
</script>

<style>

</style>