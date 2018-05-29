<template>
    <div>

    </div>
</template>

<script>
export default {
  name: 'loginBlank',
  data () {
    this.$router.replace('/home')
    return {

    }
  },
  created () {
    this.$router.go(0)
  }
}
</script>

<style scoped>

</style>
