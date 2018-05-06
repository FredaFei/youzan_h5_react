import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

class NavFooter extends Component{
    constructor(){
        super(...arguments)
        this.state={
            navList: [
                {name: '首页',path: '/index',icon:'icon-home'},
                {name: '分类',path: '/category',icon:'icon-category'},
                {name: '购物车',path: '/shopcart',icon:'icon-shop_cart'},
                {name: '我的',path: '/usercenter',icon:'icon-usercenter'},
            ]
        }
    }
    render(){
        const {navList} = this.state
        const navItem = navList.map(item=>{
            return (
                <NavLink className="nav-item-link" to={item.path} key={item.name} activeClassName="active"> 
                    <i className={item.icon}></i>
                    <span className="name">{item.name}</span>
                </NavLink>
            )
        })
        return (
            <div className="page-ft">
                {
                    <footer className="nav-list"> {navItem} </footer>
                }
            </div>
        )

    }
}

export default NavFooter