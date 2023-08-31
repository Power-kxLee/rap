<template>
  <view>

    <router-view name="Header"></router-view>
    <router-view></router-view>
    <router-view name="Footer"></router-view>
  </view>

</template>

<script setup>
  import {ref, onMounted} from 'vue'
  import './index.scss'
  

  const currentHref = ref(window.location.href)

  onMounted(() => {
    window.addEventListener('popstate', () => {
      console.log('触发popstate事件')
      currentHref.value = window.location.href
    })
  })

  function showHistory(){
    console.log('history', window.history)
  }

  function showLocation(){
    console.log('location', window.location)
  }

  function clickBack(){
    window.history.back()
  }

  function clickForward(){
    window.history.forward()
  }
</script>
