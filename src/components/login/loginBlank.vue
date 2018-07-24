<template>
    <div>

    </div>
</template>

<script>

export default {
  name: 'loginBlank',
  data () {
    return {
    }
  },
  created () {
    this.$router.go(0)
    this.$router.replace('/home')
  }
}
</script>

<style scoped>

</style>
