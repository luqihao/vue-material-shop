<template lang="html">
  <div class="">
    <h1>{{orderId}}</h1>
    <h1>{{orderTotal}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      orderTotal: 0
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId
    this.orderTotal = this.$route.query.orderTotal
  }
}
</script>

<style lang="css">
</style>
