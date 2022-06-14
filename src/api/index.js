import {get,post} from'./ajax'
// 歌曲song
export const getLyric=(id)=>get('/lyric',{id:id});

export const getSongDetail=(id)=>get('/song/detail',{ids:id});
// 测试用 拿一部分的歌曲列表做播放的前后续测试
export const getSonglist=(id,limit)=>get('/artist/songs',{id:id,limit:limit});
// 获取专辑
export const getalbum=(id)=>get('/album',{id:id});



// discovery里面的api

// 获取轮播图的数据
export const getBanner=()=>get('/banner?type=0');
// 获取推荐歌单
export const getdiscoveryplaylist=(limit)=>get('/personalized',{limit:limit});
// 获取最新音乐
export const getNewsongs=(limit)=>get('/personalized/newsong',{limit:limit});
// 获取最新MV   
export const getNewMVs=()=>get('/personalized/mv');

// top音乐，就是最新音乐那一列的东西
export const getTopSongs=(type)=>get('/top/song',{type:type});

// mvs
export const getallMvs=(param)=>get('/mv/all',{'area':param.area,'type':param.type,'order':param.order,'offset':param.offset,'limit':param.limit});

// 获取mv的详情
export const getMVdetail=(id)=>get('/mv/detail',{mvid:id});
// 获取mv url
export const getMVURL=(id)=>get('/mv/url',{id:id});
// 获取作者的信息 （这里主要的是要作者的头像）
export const getsingerinfo=(id)=>get('/artist/detail',{id:id});
// 获取相似的mv
export const getsimilarmvs=(id)=>get('/simi/mv',{mvid:id});


// 搜索
export const getSearch = (keywords,type,page,limit) =>get('/cloudsearch',{keywords:keywords,type:type,offset:(page-1)*limit,limit:limit})
export const getSearch2 = (keywords,type,page,limit) =>get('/search',{keywords:keywords,type:type,offset:(page-1)*limit,limit:limit})
// 热门搜索列表
export const Searchhot = () =>get('/search/hot')
// 普通的搜索 单词的出 单曲和歌单
export const Searchdetail = (keywords,type) =>get('/cloudsearch',{keywords:keywords,type:type})


// 登录部分的
export const loginkey = (time) =>get('/login/qr/key',{time:time})
// 生成base64二维码图片
export const loginbase64 = (key,qrimg) =>get('/login/qr/create',{key:key,qrimg:qrimg})
// 检测扫码状态接口
export const logincheck = (key,time) =>get('/login/qr/check',{key:key,time:time})
// 获取用户信息
export const getinfo = () =>get('/user/account')
// 获取用户的歌单
export const getuserlist = (id) =>get('/user/playlist',{uid:id})    
// 获取歌单详情
export const getlistdetail = (id) =>get('/playlist/detail',{id:id})


// 首页歌单的相关操作
// 获取歌单的tag的分类
export const getlisttag = () =>get('/playlist/hot')
// 获取实际的歌单   
export const gettoplist = (cat,page) =>get('/top/playlist',{cat:cat,offset:(page-1)*50,limit:50})
// 获取歌单内的所有歌曲 /playlist/track/all?id=24381616&limit=10&offset=1
export const getlistsongs = (id) =>get('/playlist/track/all',{id:id})
// 获取歌单详情 /playlist/detail?id=24381616

