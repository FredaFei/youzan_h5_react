import React,{Component} from 'react'
import PropTypes from 'prop-types'

import WithDataLoadHoc from '../withDataLoadHoc'
import ScrollBox from 'components/scrollBox/'
import CopyRight from 'components/copyRight/'

import Title from 'components/title/'
import Service from 'modules/js/request/homeService'
import './index.scss'


const GoodItem = (props)=>{
    let {good} = props
    return (
        <div className="goods-item">
            <div className="left"><img src={good.imgUrl} alt=""/></div>
            <div className="right">
                <div className="desc">{good.title}</div>
                <div className="sale">{good.saleText}<br/><button className="price">{good.price}元</button></div>
                <div className="tip">{good.tip}</div>
            </div>
        </div>
    )
}
const withLoadList = (data)=>data.map(goodItem=><GoodItem good={goodItem} key={goodItem.id}/>)
class Home extends Component{
    // PropTypes
    render(){
        let {data} = this.props
        return (
            <ScrollBox>
                <div className="home-container" ref="homeContainer">
                    <div className="swiper-wrapper"><img src="" alt=""/></div>
                    <div className="search padding-s_2"><i className="icon-usercenter"></i><input type="text" placeholder="搜索商品"/></div>
                    <div className="discount-list padding-m_2">
                        <div className="discount-item"></div>
                    </div>
                    <div className="new-goods">
                        <Title text="官方好物上新" />
                        <div className="good-list">
                            { withLoadList(data.hotGoods) }
                        </div>
                    </div>
                    <div className="hot-goods">
                        <Title text="官方零食上架" />
                        <div className="good-list">
                            { withLoadList(data.classGoods) }
                        </div>
                    </div>
                    <div className="recommend-goods">
                        <Title text="饿就来一口" />
                        <div className="good-list">
                            { withLoadList(data.recommendGoods) }
                        </div>
                    </div>
                    <CopyRight />
                </div>    
            </ScrollBox>
        )
    }
}

export default WithDataLoadHoc(Home, Service.getHome)