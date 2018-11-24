<template>
  <router-view></router-view>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('loadUsers');            
    },    
    computed: {
      user: function () {
        return this.$store.getters.user
      },
      userConfig: function () {
        return this.$store.getters.userConfig
      }
    },
    watch: {
      user (value) {
        if (value !== null) {
          this.$store.dispatch('loadNotifications')
        }
      }
    },
  }
</script>