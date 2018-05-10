import {fetch} from "./fetch";
import url from './api'

class Service{
    static getHome(){
        return fetch(url.homeInfo)
    }
    static category(){
        return fetch(url.category)
    }
    static shopCart(){
        return fetch(url.shopCart)
    }
    static deleteGood(goodId){
        return fetch(url.deleteGood, {goodId})
    }
    static deleteMoreGoods(goodIds){
        return fetch(url.deleteMoreGoods,{goodIds})
    }
    static removeIds(arr){
        return arr.map(item=>item.skuId)
    }
}
export default Service

