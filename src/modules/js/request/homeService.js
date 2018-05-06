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
}
export default Service

