import React,{Component} from 'react'
import BScroll from 'better-scroll'
import Loading from 'components/loading/'
import ScrollBox from 'components/scrollBox/'
import CopyRight from 'components/copyRight/'

// import PropTypes from 'prop-types'
import Service from 'modules/js/request/homeService'
import Title from 'components/title/'
import GoodItem from 'components/goodItem/'
import './index.scss'

class Home extends Component{
    componentDidMount(){
        // this.initScroll()
    }

    initScroll = () => {
        this.homeContainer = new BScroll(this.refs.homeContainer, {
            click: true,
            probeType: 3
        })
        this.homeContainer.on('scroll', pos => {
            if (!pos.y) {
                return
            }
            this.scrollY = Math.abs(Math.round(pos.y))
        })
    }
    render(){
        let {homeList} = this.props
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
                                homeList.hotGoods.map(goodItem=>{
                                    return <GoodItem good={goodItem} key={goodItem.id}/>
                                })
                            }
                        </div>
                    </div>
                    <div className="hot-goods">
                        <Title text="官方零食上架" />
                        <div className="good-list">
                            {
                                homeList.classGoods.map(goodItem=>{
                                    return <GoodItem good={goodItem} key={goodItem.id}/>
                                })
                            }
                        </div>
                    </div>
                    <div className="recommend-goods">
                        <Title text="饿就来一口" />
                        <div className="good-list">
                            {
                                homeList.recommendGoods.map(goodItem=>{
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

class Product extends Component{
    static propTypes = {
    }
    state = {
        homeList: null
    }
    componentWillMount (){
        Service.getHome().then((res)=>{
            this.setState({
                homeList: res.data
            })
        })
    }
    render(){
        let {homeList} = this.state
        let home = null
        if(!homeList){
            home = <Loading />
        }else{
            home = <Home homeList={homeList}/>
        }
        return home

    }
}

export default Product