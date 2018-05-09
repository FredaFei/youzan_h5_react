import React,{Component} from 'react'
import WithDataLoadHoc from '../withDataLoadHoc'
import ScrollBox from 'components/scrollBox/'
import CopyRight from 'components/copyRight/'

import PropTypes from 'prop-types'
import Service from 'modules/js/request/homeService'
import Title from 'components/title/'
import GoodItem from 'components/goodItem/'
import './index.scss'

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
                            {
                                data.hotGoods.map(goodItem=>{
                                    return <GoodItem good={goodItem} key={goodItem.id}/>
                                })
                            }
                        </div>
                    </div>
                    <div className="hot-goods">
                        <Title text="官方零食上架" />
                        <div className="good-list">
                            {
                                data.classGoods.map(goodItem=>{
                                    return <GoodItem good={goodItem} key={goodItem.id}/>
                                })
                            }
                        </div>
                    </div>
                    <div className="recommend-goods">
                        <Title text="饿就来一口" />
                        <div className="good-list">
                            {
                                data.recommendGoods.map(goodItem=>{
                                    return <GoodItem good={goodItem} key={goodItem.id}/>
                                })
                            }
                        </div>
                    </div>
                    <CopyRight />
                </div>    
            </ScrollBox>
        )
    }
}

export default WithDataLoadHoc(Home, Service.getHome)