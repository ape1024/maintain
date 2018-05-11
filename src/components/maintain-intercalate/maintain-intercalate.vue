<template>
  <div>
    <ul>
      <router-link to="/intercalate/department"><li>1</li></router-link>
      <router-link to="/intercalate/structure"><li>2</li></router-link>
      <router-link to="/intercalate/karakters"><li>3</li></router-link>
      <router-link to="/intercalate/consumer"><li>4</li></router-link>
      <router-link to="/intercalate/project"><li>5</li></router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'maintain-intercalate'
}
</script>

<style scoped>

</style>
