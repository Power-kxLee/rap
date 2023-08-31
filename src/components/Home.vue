<template>
  <view class="apphome">
    <nut-tabs v-model="highquality.tabValue" swipeable :title-scroll="true" >
      <template v-slot:titles>
        <div class="tabs_title_me">
          <div class="bj" :style="{background:'url('+bjImg+') #49beb7;' }" ></div>
          <div class="nut-tabs__titles-item" @click="tabsClick(item)"
            :class="{ active: highquality.tabValue == item.id }" :key="item.id" v-for="item in highquality.data">
            <div class="songSheet">
              <img class="coverImg" :src="item.coverImgUrl" >
              <span class="soverText">{{ item.name }}</span>  
            </div>
          </div>
        </div>
        
      </template>
      <nut-tab-pane  v-for="item in highquality.data" :key="item.id" :pane-key="item.id"> 
        <div class="tab-dy-content" >
          <div class="c-body">

            <h2 class="tab-dy-title">{{ item.name }}</h2> 
            <nut-divider :style="{ color: '#242424', padding: '0 16px' }">{{item.tag}}</nut-divider>  
            <p class="description" @click="showPopup(item)">{{ item.description }}</p>
            <ul class="song_list">
              <li class="song" @click="goLink(em)" v-for="(em,i) in item.tracks" :key="em.id">
                <span class="song-n">{{ i+1 }}</span>
                <div class="song-np"> 
                  <p class="song-name">{{ em.name }}</p>  
                  <p class="song-people"> {{ handleAuthor(em) }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
      </nut-tab-pane>
    </nut-tabs>
    <nut-popup :lock-scroll="false" position="bottom" :style="{ height: '30%' }" v-model:visible="popupData.v">{{ popupData.n}}</nut-popup>
  </view>
</template>
<script setup>
import axios from "@/axios";
import { reactive, ref } from 'vue';
import './style/Home.module.scss'
import Taro from '@tarojs/taro'
const highquality = reactive({
  tabValue: '',
  data: []
});
const showBottom = ref(false)
const bjImg = ref('')
const popupData = reactive({
  v: false,
  n: ''
})
const goLink = (em) => {
  console.log(em)
  const {name,id} = em
  Taro.navigateTo({
    url: `/pages/MusicDetail/index?name=${name}&id=${id}`,
  })
}
const handleAuthor = (item) => {
  const author =  item.ar.map(em => em.name)
  return author.join('/')
}
const showPopup = (item) => {
  popupData.v = true
  popupData.n = item.description
}
// 获取歌单的详情 里面包括歌曲
const getSong = async (item) => {
  const _item = reactive(item)
  const {playlist} = await axios.get({
    url: "/playlist/detail",
    data: {
      id: item.id
    }
  });
  const {tracks} = playlist 
  console.log(tracks)
  _item.tracks = tracks
}
const tabsClick = (item) => {
  highquality.tabValue = item.id
  bjImg.value = item.coverImgUrl
  if (!item.tracks) {

    getSong(item)
  }
}
const created = async () => {
  // 获取说唱的歌单
  const data = await axios.get({
    url: "/top/playlist/highquality",
    data: {
      limit: 10,
      cat: '华语'
    }
  });
  highquality.tabValue = data.playlists[0].id
  bjImg.value = data.playlists[0].coverImgUrl
  getSong(data.playlists[0])
  highquality.data = data.playlists
}
created()
</script>