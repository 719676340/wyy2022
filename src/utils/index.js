import { getalbum } from "../api";

export async function getsongimg(id,albumId){
    // if(albumId==null||albumId==undefined){
    //     throw new Error('need albumId')
    // }
    
    let imgurl;
    await getalbum(albumId).then((res)=>{
        let songs=res.songs
        let song=songs.find((Element)=>{
            return Element.id==id
        })
        imgurl=song.al.picUrl
    })
    return imgurl
}
