<template>
  <view class="musicDetail">
    <text>{{ msg }}</text>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { ref } from 'vue'
import axios from "@/axios";
definePageConfig({
    navigationBarTitleText: '音乐世界',
})
const $instance = Taro.getCurrentInstance()
const {name,id} = $instance.router.params
const msg = ref()
const innerAudioContext = Taro.createInnerAudioContext()

innerAudioContext.onPlay(() => {
  console.log('开始播放')
  console.log('音频长度',innerAudioContext.duration)
})
innerAudioContext.onTimeUpdate(() => {
  console.log('播放位置',innerAudioContext.currentTime)
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})
const created = async () => {

  const {data} = await axios.get({
    url: "/song/url",
    data: {
      id: id
    }
  });
  const {url}  = data[0]
  innerAudioContext.src = url
  innerAudioContext.play()
}
created()
</script>
