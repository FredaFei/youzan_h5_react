import React, {Component} from 'react'
import classnames from 'classnames'
import Cell from 'components/cell/'
import Controller from 'components/controller/'
import ScrollBox from 'components/scrollBox/'
import CopyRight from 'components/copyRight/'
import Service from 'modules/js/request/homeService'
import './index.scss'

class Balance extends Component {
    state = {
        editing: false,
        shopList: []
    }
    allChecked = false
    allRemoveChecked = false
    checkedList = []
    removeCheckedList = []
    componentWillMount() {
        Service.shopCart().then(res => {
            console.log(res.data.shopcartList)
            let shopcartList = res.data.shopcartList
            shopcartList.forEach(item => {
                item.checked = false
                item.removechecked = false
            })
            this._changeCheckList(shopcartList)
            this.setState({
                shopList: shopcartList
            })
        })
    }
    _changeCheckList = (shopcartList) => {
        this.checkedList = shopcartList.filter(item => item.checked)
        this.allChecked = this.checkedList.length === shopcartList.length ? true : false;
    }
    _removeCheckedList = (shopcartList)=>{
        this.removeCheckedList = shopcartList.filter(item => item.removechecked)
        this.allRemoveChecked = this.removeCheckedList.length === shopcartList.length ? true : false;
    }
    toggleShopsFn = () => {
    }
    changeEditStatusFn =()=>{
        this.setState(prevState=>({
            editing: !prevState.editing
        }))
    }

    toggleGoodsFn = (goods) => {
        let {shopList} = this.state
        shopList.forEach(item => {
            if (item.skuId === goods.skuId) {
                item.checked = !goods.checked
            }
        })
        this._changeCheckList(shopList)
        this.setState({
            shopList: shopList
        })
    }
    deleteGoodsFn = (goods)=>{
        let {shopList} = this.state
        shopList = shopList.filter(item => {
            return item.skuId !== goods.skuId
        })
        this.setState({
            shopList: shopList
        })
    }
    toggleAllFn = (e) => {
        let {shopList} = this.state
        let checked = e.target.checked
        shopList.forEach(item => {
            item.checked = checked
        })
        this.setState({
            shopList: shopList
        })
        this.allChecked = checked
        this.checkedList = checked ? shopList : []
    }

    render() {
        let {editing, shopList} = this.state
        let editText = editing ? '完成' : '编辑'
        let delText = editing ? '删除' : '结算'
        return (
            <div className="shopcart-wrap">
                <ScrollBox>
                    {/*<div className="shopcart-wrap">*/}
                        <div className="shopcart-hd">
                            <Cell />
                        </div>

                        <div className="shopcart-bd">
                            <div className="shop-content">
                                {
                                    shopList.length === 0 &&
                                    <div className="empty-shopcart">
                                        <p className="message">购物车快饿扁了T.T</p>
                                        <p className="wish">快给我挑点宝贝</p>
                                        <button className="go">去逛逛</button>
                                    </div>
                                }
                                {
                                    shopList.length > 0 &&
                                    <section className="shop">
                                        <div className="shop-name">
                                            <div className="left">
                                                <div className="checkbox">
                                                    <label className={this.allChecked ? 'active' : ''}>
                                                        <input type="checkbox" checked={this.allChecked} onChange={this.toggleAllFn}/>
                                                    </label>
                                                </div>
                                                <i className="icon-category"></i>
                                                <span className="name">shop namesfdf</span>
                                            </div>
                                            <span className="oprator" onClick={this.changeEditStatusFn}>{editText}</span>
                                        </div>

                                        {
                                            shopList.map((goods, index) => {
                                                return (
                                                    <div className="shopcart-list" key={index}>
                                                        <div className="checkbox">
                                                            <label className={goods.checked ? 'active' : ''}>
                                                                <input type="checkbox"
                                                                    onChange={this.toggleGoodsFn.bind(this, goods)}/>
                                                            </label>
                                                        </div>
                                                        <img src={goods.imgUrl}
                                                            alt=""/>
                                                        {/*正常状态*/}
                                                        <div className="info">
                                                            {editing ? <Controller/> : <div className="name">{goods.skuDesc}</div>}
                                                            <div className="sku-text">{goods.skuText}</div>
                                                            <div className="sku">
                                                                <div className="price">￥{goods.price}</div>
                                                                <div className="quantity">x{goods.count}</div>
                                                            </div>
                                                        </div>
                                                        {/*编辑状态*/}
                                                        {editing && <div className="del-btn" onClick={this.deleteGoodsFn.bind(this,goods)}>删除</div>}
                                                    </div>
                                                )
                                            })
                                        }
                                    </section>

                                }
                            </div>
                            <div className="copy">
                                <CopyRight />
                            </div>
                            
                        </div>
                    {/*</div>*/}
                </ScrollBox>
                <div className="shopcart-ft page-ft clearfix">
                    <div className="left">
                        <div className="checkbox">
                            <label className={this.allChecked ? 'active' : ''}>
                                <input type="checkbox" checked={this.allChecked} onChange={this.toggleAllFn}/>
                            </label>
                        </div>
                        <label>全选</label>
                    </div>
                    {
                        !editing &&
                        <div className="right">
                            <div className="sum-price">合计：￥55.23<p>不含运费</p></div>
                        </div>
                    }
                    <button className={classnames('pay-btn',{'active': this.checkedList.length!==0})}>{delText}</button>
                </div>
            </div>     
        );

    }
}

export default Balance
