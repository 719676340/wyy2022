import { defineStore } from "pinia";


export const useMusicStore=defineStore({
    id:'music',
    state:()=>({
        currentSong: {},
        // 当前歌曲的图片url
        currentSongimg:'',
        // 当前播放时长
        currentTime: 0,
        // 播放状态
        playing: false,
        // 播放模式  sequence loop random
        playMode: 'sequence',
        // 播放列表显示
        isPlaylistShow: false,
        // 播放提示显示
        isPlaylistPromptShow: false,
        // 歌曲详情页显示
        isPlayerShow: false,
        // 播放列表数据
        playlist: [],
        // 播放历史数据   搜索的历史用localstrong 或者sessionstrong来存就好了 storage相当于是一个快捷键去方便访问的
        // playHistory: storage.get(PLAY_HISTORY_KEY, []),
        // 菜单显示
        isMenuShow: true,
    }),
    getters: {
        // 获取当前歌曲在playlist中的index
        currentSongIndex:(state)=>{
            return state.playlist.findIndex((Element)=>Element.id==state.currentSong.id)
        },
        SongIndex:(state)=>{
            return (id)=>state.playlist.findIndex((Element)=>Element.id==id)
        },
        // 获取下一首歌曲配合按键中的next
        nextsong:(state)=>{
            let map={
                'sequence':getSequenceNextIndex,
                'loop':getLoopNextIndex,
                'random':getRandomNextIndex
            }
            var type=map[state.playMode]
            var index=type()
            return state.playlist[index]
            function getSequenceNextIndex(){
                let nextindex=state.playlist.findIndex((Element)=>Element.id==state.currentSong.id)+1
                if(nextindex>=state.playlist.length){
                    nextindex=0
                }
                return nextindex
            }
            function getLoopNextIndex(){
                return state.playlist.findIndex((Element)=>Element.id==state.currentSong.id)
            }
            function getRandomNextIndex(){
                return getRandomIndex(state.playlist,state.playlist.findIndex((Element)=>Element.id==state.currentSong.id))
            }
        },
        prevsong:(state)=>{
            let map={
                'sequence':getSequencePrevIndex,
                'loop':getLoopPrevIndex,
                'random':getRandomPrevIndex
            }
            var type=map[state.playMode]
            var index=type()
            return state.playlist[index]
            function getSequencePrevIndex(){
                let previndex=state.playlist.findIndex((Element)=>Element.id==state.currentSong.id)-1
                if(previndex<0){
                    previndex=state.playlist.length-1
                }
                return previndex
            }
            function getLoopPrevIndex(){
                return state.playlist.findIndex((Element)=>Element.id==state.currentSong.id)
            }
            function getRandomPrevIndex(){
                return getRandomIndex(state.playlist,state.playlist.findIndex((Element)=>Element.id==state.currentSong.id))
            }          
        }

    },
    actions: {
        setCurrentSong(song){
            this.currentSong=song   
        },
        setPlaying(play){
            this.playing=play
        },
        addplaylist(list){
            for(let i=0;i<list.length;i++){
                let index=this.playlist.findIndex((Element)=>{
                    return Element.id==list[i].id
                })
                if(index==-1){
                    this.playlist.push(list[i])
                }
            }
            // this.playlist.push(...list)
        },
        setplayMode(Mode){
            this.playMode=Mode
        },
        setPlaylistShow(play){
            this.isPlaylistShow=play
        },
        setPlayerShow(play){
            this.isPlayerShow=play
        },
        setcurrentSongimg(img){
            this.currentSongimg=img
        },
        setcurrentTime(time){
            this.currentTime=time
        },
        clearplaylist(){
            this.playlist.splice(0,this.playlist.length)
        }
    }

})
function getRandomIndex(playlist, currentIndex) {
    // 防止无限循环
    if (playlist.length === 1) {
      return currentIndex
    }
    let index = Math.round(Math.random() * (playlist.length - 1))
    if (index === currentIndex) {
      index = getRandomIndex(playlist, currentIndex)
    }
    return index
  }