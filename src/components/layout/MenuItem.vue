<template>
  <div class='menu'>
      <div class="menuitem" v-for="(item,index) in arr" :class="{activeitem:activeitem==item}" 
      :key="item" @click="clickitem(item,index)" >
        <i class="iconfont icon" :class="[iconlogo[index]]"></i>
        <span>{{item}}</span>
      </div>
      <div class="menuitem" @click="login()" v-if="showname==''"><span>登录</span></div>
      <div class="menuitem" v-else><span>{{showname}}</span></div>
      <div class="loginimg" @click="showlogin=false" v-show="showlogin">
          <img width="450" height="450" :src="base64img" alt="" srcset="">
      </div>
      <div class="menuitem" v-for="(item,index) in userlist" @click="godetail(item.id)"
      :key="item">
        <span>{{item.name}}</span>
      </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import {loginkey,loginbase64,logincheck,getinfo,getuserlist} from '../../api/index'
import {a} from '../../api/ajax'
const router = useRouter()
const route=useRoute()
var iconlogo=['icon-yinle1','icon-yinleliebiao','icon-yinle','icon-yinle1']
var arr=['发现音乐','推荐歌单','最新音乐','最新MV']
var path=['discovery','playlists','songs','mvs']
var activeitem=ref('发现音乐')
var showlogin=ref(false)
var base64img=ref('')
var timer=ref(undefined)
var showname=ref('')
var id=ref(277746139)
var userlist=reactive([])
watch(()=>route.path,()=>{
    var patharr=route.path.split('/')
    // console.log(patharr[1])
    let index=path.findIndex((Element)=>{
        return Element==patharr[1]
    })
    // console.log(index)
    if(index!=-1){
        activeitem.value=arr[index]
        console.log(activeitem.value)
    }
})

function clickitem(item,index){
    activeitem.value=item
    router.push('/'+path[index])
}
function login(){
    let now=Date.now()
    loginkey(now).then((res)=>{
        return res.data.unikey
    }).then((key)=>{
        loginbase64(key,1).then((res)=>{
            base64img.value=res.data.qrimg
            showlogin.value=true
            timer.value=setInterval(async ()=>{
                let now2=Date.now()
                logincheck(key,now2).then((res)=>{  
                    if(res.code==803){
                        showlogin.value=false
                        clearInterval(timer.value)
                        document.Cookie=res.cookie
                        a.cookie=res.cookie
                        console.log(a)
                        console.log(res,document.Cookie)
                    }
                    if(res.code==800){
                        showlogin.value=false
                        clearInterval(timer.value)
                    }
                })
            },2000)
        })
    }).then(()=>{
        getinfo().then((res)=>{
            showname.value=res.profile.nickname
            id.value=res.profile.userId
            // console.log(res.profile)
        })
    }).catch((err)=>{
        console.log(err)
    })
}
function getuserlistname(){
    getuserlist(id.value).then((res)=>{
        userlist.push(...res.playlist)
    })
}
function godetail(id){
    router.push('/playlist/'+id)
}
// 用以前的cookie找用户信息
function historyuserinfo(){
    getinfo().then((res)=>{
        showname.value=res.profile.nickname
        id.value=res.profile.userId
        // console.log(res.profile)
    }).catch((err)=>{
        console.log(err)
    })
}
onMounted(()=>{
    getuserlistname()
    historyuserinfo()
})
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
.menu{
    width: $menu-width;
    height: calc(100%);
    flex-wrap: wrap;
    background-color: $menu-blackgroundcolor;
    font-size: $menu-fontsize;
    overflow-y: scroll;
}
.menuitem{
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    padding: 20px 20px;
    cursor: pointer;
    &:hover{
        background-color: $menu-blackgroundcolor-active;
    }
}
.icon{
    margin-right: 10px;
}
.activeitem{
    color: red;
}
.loginimg{
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100vh;
    width: 100vw;
    background-color: rgba($color: gray, $alpha: 0.5);
    overflow: hidden;
}
</style>
