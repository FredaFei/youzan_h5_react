import React, {Component} from 'react'
import classnames from 'classnames'
import Cell from 'components/cell/'
import Controller from 'components/controller/'
import ScrollBox from 'components/scrollBox/'
import CopyRight from 'components/copyRight/'
import Toast from 'components/toast/'
import Service from 'modules/js/request/homeService'
import './index.scss'

class Balance extends Component {
    state = {
        editing: false,
        shopList: [],
        showToast: false,
        text: '确定删除该商品吗？',
        removeData: null
    }
    allChecked = false
    allRemoveChecked = false
    checkedList = []
    removeCheckedList = []
    total = 0

    componentWillMount() {
        Service.shopCart().then(res => {
            let shopcartList = res.data.shopcartList
            shopcartList.forEach(item => {
                item.checked = false
                item.removechecked = false
            })
            this.setState({
                shopList: shopcartList
            })
        })
    }

    _changeCheckList = (shopcartList) => {
        this.checkedList = shopcartList.filter(item => item.checked)
        this.allChecked = this.checkedList.length === shopcartList.length ? true : false;
        this.total = this.checkedList.map(item => item.price * item.count).reduce((prev, current) => prev + current, 0)
        console.log(this.total)
    }
    _removeCheckedList = (shopcartList) => {
        this.removeCheckedList = shopcartList.filter(item => item.removechecked)
        this.allRemoveChecked = this.removeCheckedList.length === shopcartList.length ? true : false;
    }
    changeEditStatusFn = () => {
        this.setState(prevState => ({
            editing: !prevState.editing
        }))
    }
    toggleGoodsFn = (goods) => {
        let {shopList, editing} = this.state
        let attr = editing ? 'removechecked' : 'checked'
        shopList.forEach(item => {
            if (item.skuId === goods.skuId) {
                item[attr] = !goods[attr]
            }
        })
        editing ? this._removeCheckedList(shopList) : this._changeCheckList(shopList)
        this.setState({
            shopList: shopList
        })

    }
    toggleAllFn = (e) => {
        let {shopList, editing} = this.state
        let value = e.target.checked
        let attr = editing ? 'removechecked' : 'checked'
        shopList.forEach(item => {
            item[attr] = value
        })
        this.setState({
            shopList: shopList
        })
        if (editing) {
            this.allRemoveChecked = value
            this.removeCheckedList = value ? shopList : []
            this._removeCheckedList(shopList)
        } else {
            this.allChecked = value
            this.checkedList = value ? shopList : []
            this._changeCheckList(shopList)
        }
    }
    deleteGoodsFn = (goods, goodIndex) => {
        this.setState({
            text: '确定删除该商品吗？'
        })
        let removeData = {goods,goodIndex}
        this.setState({
            removeData
        })
        this.setState({
            showToast: true
        })
    }
    _deleteRemoveList = () => {
        console.log('removeCheckedList')
        this.setState({
            text: `确定将这${this.removeCheckedList.length}个商品删除吗？`
        })
        this.setState({
            showToast: true
        })
    }
    _goPayCheckedList = () => {
        this.setState({text: `选中的产品有${this.checkedList.length}个`})
        this.setState({showToast: true})
    }
    goPayOrDeleteFn = () => {
        let {editing} = this.state
        if (editing) {
            this._deleteRemoveList()
        } else {
            this._goPayCheckedList()
        }
    }
    changeNumFn = (id, num) => {
        let {shopList, editing} = this.state
        if (editing) {
            this.setState({
                shopList: shopList.map(item => {
                    return item.skuId === id ? {...item, count: num} : item
                })
            })
        }

    };
    confrimDeleteFn = () => {
        let {text, shopList} = this.state
        if (text === '确定删除该商品吗？') {
            let {removeData} = this.state
            let {goods, goodIndex} = removeData
            Service.deleteGood(goods.skuId).then(res=>{
                shopList = shopList.filter(item => {
                    return item.skuId !== goods.skuId
                })
                this.setState({
                    shopList: shopList
                })
                this.setState({
                    showToast: false
                })
            })
        }else{
            let goodIds = Service.removeIds(this.removeCheckedList)
            Service.deleteMoreGoods(goodIds).then(res=>{
                let temp = []
                this.state.shopList.forEach(good=>{
                    let index = this.removeCheckedList.findIndex(item=>{
                        return good.skuId === item.skuId
                    })
                    if(index===-1){
                        temp.push(good)
                    }
                    this.setState({shopList: temp.length ? temp : []})
                    this.setState({
                        showToast: false
                    })
                    this.setState({
                        editing: false
                    })
                })
                
            })
        }
    }
    cancelFn = () => {
        this.setState({
            showToast: false
        })
    }

    render() {
        let {editing, shopList, showToast, text} = this.state
        let editText = editing ? '完成' : '编辑'
        let delText = editing ? '删除' : '结算'
        if (shopList.length === 0) {
            return <EmptyCart/>
        }
        return (
            <div className="shopcart-wrap">
                <ScrollBox>
                    <div className="shopcart-hd">
                        <Cell/>
                    </div>
                    <div className="shopcart-bd">
                        <div className="shop-content">
                            <section className="shop">
                                <div className="shop-name">
                                    <div className="left">
                                        <div className="checkbox">
                                            <label
                                                className={classnames({'active': editing ? this.allRemoveChecked : this.allChecked})}>
                                                <input type="checkbox"
                                                       checked={editing ? this.allRemoveChecked : this.allChecked}
                                                       onChange={this.toggleAllFn}/>
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
                                                    <label className={classnames({
                                                        'active': editing ? goods.removechecked : goods.checked
                                                    })}>
                                                        <input type="checkbox"
                                                               onChange={this.toggleGoodsFn.bind(this, goods)}/>
                                                    </label>
                                                </div>
                                                <img src={goods.imgUrl} alt=""/>
                                                {/*正常状态*/}
                                                <div className="info">
                                                    {
                                                        editing ?
                                                            <Controller good={goods} onChangeNum={this.changeNumFn}
                                                                        disabledStyle={this.changeButtonStyle}/> :
                                                            <div className="name">{goods.skuDesc}</div>
                                                    }
                                                    <div className="sku-text">{goods.skuText}</div>
                                                    <div className="sku">
                                                        <div className="price">￥{goods.price}</div>
                                                        <div className="quantity">x{goods.count}</div>
                                                    </div>
                                                </div>
                                                {/*编辑状态*/}
                                                {editing && <div className="del-btn"
                                                                 onClick={this.deleteGoodsFn.bind(this, goods, index)}>删除</div>}
                                            </div>
                                        )
                                    })
                                }
                            </section>

                        </div>
                        <div className="copy">
                            <CopyRight/>
                        </div>
                    </div>
                </ScrollBox>
                <div className="shopcart-ft page-ft clearfix">
                    <div className="left">
                        <div className="checkbox">
                            <label
                                className={classnames({'active': editing ? this.allRemoveChecked : this.allChecked})}>
                                <input type="checkbox" checked={editing ? this.allRemoveChecked : this.allChecked}
                                       onChange={this.toggleAllFn}/>
                            </label>
                        </div>
                        <label>全选</label>
                    </div>
                    {
                        !editing &&
                        <div className="right">
                            <div className="sum-price">合计：￥{this.total.toFixed(2)}<p>不含运费</p></div>
                        </div>
                    }
                    <button
                        className={classnames('pay-btn', {
                            'active': editing ? this.removeCheckedList.length !== 0 : this.checkedList.length !== 0
                        })} onClick={this.goPayOrDeleteFn}>{delText}</button>
                </div>
                <Toast showToast={showToast} title={text} onConfirm={this.confrimDeleteFn} onClose={this.cancelFn}/>
            </div>
        );

    }
}

const EmptyCart = () => {
    return (
        <div className="empty-shopcart">
            <p className="message">购物车快饿扁了T.T</p>
            <p className="wish">快给我挑点宝贝</p>
            <button className="go">去逛逛</button>
        </div>
    )

}

function withShopcartEmpty() {

}
const withLoadingIndicator = (Component) => ({ isLoadingTodos, ...others }) =>
  isLoadingTodos
    ? <div><p>Loading todos ...</p></div>
    : <Component { ...others } />

export default Balance
