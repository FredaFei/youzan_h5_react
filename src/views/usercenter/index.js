import React,{Component} from 'react'
import ScrollBox from 'components/scrollBox/'
import { Link } from 'react-router-dom'
import Cell from 'components/cell/'
import './index.scss'

class HelpCenter extends Component{
    state = {
        orderMenus: [
            {name: '待付款',path: '/index',icon:'icon-nopay'},
            {name: '待发货',path: '/category',icon:'icon-to-ship'},
            {name: '已发货',path: '/shopcart',icon:'icon-carriage'},
            {name: '已完成',path: '/usercenter',icon:'icon-complated'},
        ],
        cellForms: [
            {name: '我的会员卡',path: '/index',icon:'icon-arrowright'},
            {name: '我的积分',path: '/index',icon:'icon-arrowright'},
            {name: '我的优惠券',path: '/index',icon:'icon-arrowright'},
            {name: '我的优惠码',path: '/index',icon:'icon-arrowright'},
            {name: '我购买的专栏、内容',path: '/index',icon:'icon-arrowright'},
        ]
    }
    render(){
        let {orderMenus,cellForms} = this.state
        let orderMenusLinks = orderMenus.map(item=>{
            return (
                <Link className="myorder-list-item" to={item.path} key={item.name}>
                    <i className={item.icon}></i>
                    <span className="name">{item.name}</span>
                </Link>
            )
        })
        let cellFormsLink = cellForms.map(item=> {
            return (
                <Link className="cell-form-item" to={item.path} key={item.name}>
                    <span className="name">{item.name}</span><i className={item.icon}></i>
                </Link>
            )
        })
        return (
            <ScrollBox>
                <div className="help-wrap">
                    <section className="avator"><img src="https://img.yzcdn.cn/upload_files/2017/07/04/Fl2o1OPjr2J1Ueyv6QsvVopnufBp.jpg?imageView2/2/w/200/h/200/q/75/format/webp" alt=""/>
                    </section>
                    <Cell />
                    <section className="myorder">
                        <div className="myorder-title flex-between">
                            <span className="name">我的订单</span>
                            <span>查看全部订单<i className='icon-arrowright'></i></span>
                        </div>
                        <ul className="myorder-list">{orderMenusLinks}</ul>
                    </section>
                    <section className="help-bd">
                        <div className="cart">
                            <div className="flex-between">
                                <span className="name">购物车</span><i className='icon-arrowright'></i>
                            </div>
                        </div>
                        <div className="cell-form">{cellFormsLink}</div>
                    </section>
                </div>
            </ScrollBox>
        )
    }
}

export default HelpCenter