import React, {Component} from 'react'
import classnames from 'classnames'
import BScroll from 'better-scroll'
import Loading from 'components/loading/'
import SkuToast from './skuToast.js'
import Service from 'modules/js/request/homeService'
import withDataLoadHoc from '../withDataLoadHoc.js'
import './index.scss'

const GoodItem = (props)=>{
    return (
    <li className="goods-cell" >
        <div className="img"><img src={props.image} alt=""/></div>
        <div className="desc">
            <div className="info">{props.name}</div>
            <div className="price">￥{props.price}</div>
            <div className="control" onClick={props.skuToastFn}>+</div>
        </div>
    </li>
    )
}
const GoodList = ({goodList,skuToastFn})=>{
    return (
            <ul>
                {
                    goodList.map((good, goodIndex) => {
                        return (
                            <GoodItem key={goodIndex} {...good} skuToastFn={skuToastFn}></GoodItem>
                        )
                    })
                }
            </ul>
        )
}
const SquareLoading = ()=> <div className="square-wrapper"><div className="loading-box">loading ...</div> </div>

class CategoryList extends Component{
    state = {
        menuIndex: 0,
        showSkuToast: false,
        goodDetail: null,
        showLoading: false
    }
    goodsHeightList = [0]

    componentDidMount() {
        this.initScroll()
        setTimeout(() => {
            this.calculateHeight()
        }, 0)
    }

    initScroll = () => {
        this.menuScroll = new BScroll(this.refs.menuWrapper, {click: true})
        this.goodsScroll = new BScroll(this.refs.goodsWrapper, {
            click: true,
            probeType: 3
        })
        this.goodsScroll.on('scroll', pos => {
            if (!pos.y) {
                return
            }
            this.scrollY = Math.abs(Math.round(pos.y))
            const index = this.calculateCurrentIndex()
            if (this.state.menuIndex !== index) {
                this.setState({
                    menuIndex: index
                })
            }
        })
    }
    calculateHeight = () => {
        let aGoodList = [...this.refs.goodsWrapper.querySelectorAll('.category-goods-item')]
        let tempHeight = 0
        aGoodList.forEach(item => {
            tempHeight += item.clientHeight
            this.goodsHeightList.push(tempHeight)
        });
    }
    calculateCurrentIndex = () => {
        for (let i = 0; i < this.goodsHeightList.length; i++) {
            let height1 = this.goodsHeightList[i]
            let height2 = this.goodsHeightList[i + 1]
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                return i
            }
        }
        return 0
    }
    selectMenu = (index) => {
        if (this.state.menuIndex !== index) {
            let aGoodList = this.refs.goodsWrapper.querySelectorAll('.category-goods-item')
            this.goodsScroll.scrollToElement(aGoodList[index], 100)
        }
    }
    skuToastFn = () => {
        this.setState({
            showLoading: true 
        })
        Service.category().then(res=>{
            this.setState({
                goodDetail: res.data.goodDetail
            })
            this.setState(prevState=>({
                showSkuToast: !prevState.showSkuToast
            }))
            this.setState({
                showLoading: false 
            })
        })
        
    }
    closeSkuFn = (bool)=>{
        this.setState({
            showSkuToast: bool
        })
    }
    render() {
        let {menuIndex, showSkuToast,goodDetail,showLoading} = this.state
        let {data} = this.props
        let menuItem = data.goods.map((item, index) => {
            return <li className={classnames('category-menu-item', {'active': menuIndex === index})}
                       onClick={this.selectMenu.bind(this, index)}
                       key={index}>{item.name}</li>
        })
        let goodsItem = data.goods.map((item, index) => {
            return (
                <li className="category-goods-item" key={index}>
                    <h1 className="category-title">{item.name}</h1>
                    {<GoodList goodList={item.goodList} skuToastFn={this.skuToastFn}></GoodList>}
                </li>
            );
        })
        return (
            <div className="page-wrapper">
                <div className="category-container page-bd">
                    <div className="menu-wrapper" ref="menuWrapper">
                        <ul className="menu-list">{menuItem}</ul>
                    </div>
                    <div className="goods-wrapper" ref="goodsWrapper">
                        <ul className="goods-list">{goodsItem}</ul>
                    </div>
                </div>
                {
                    showSkuToast &&<SkuToast 
                        showSkuToast={showSkuToast}
                        goodDetail={goodDetail} 
                        closeSkuFn={this.closeSkuFn}/>
                }
                {
                    showLoading && <SquareLoading />
                }
            </div>

        )

    }
}

export default withDataLoadHoc(CategoryList, Service.category)