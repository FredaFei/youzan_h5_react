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
        shopList: [],
        // allChecked: false,
        // allRemoveChecked: false,
        // checkedList: [],
        // removeCheckedList: [],
        // total: 0
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
            // let checkedList = shopcartList.filter(item => item.checked)
            // let allChecked = checkedList.length === shopcartList.length ? true : false;
            // let removeCheckedList = shopcartList.filter(item => item.removechecked)
            // let allRemoveChecked = removeCheckedList.length === shopcartList.length ? true : false;
            // let total = checkedList.map(item=>item.price*item.count).reduce((prev,current)=>prev+current,0)
            // this.setState({ checkedList })
            // this.setState({ allChecked  })
            // this.setState({ removeCheckedList })
            // this.setState({ allRemoveChecked  })
            // this.setState({ total  })
            this.setState({
                shopList: shopcartList
            })
        })
    }

    _changeCheckList = (shopcartList) => {
        this.checkedList = shopcartList.filter(item => item.checked)
        this.allChecked = this.checkedList.length === shopcartList.length ? true : false;
        this.total = this.checkedList.map(item=>item.price*item.count).reduce((prev,current)=>prev+current,0)
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
    deleteGoodsFn = (goods) => {
        let {shopList} = this.state
        shopList = shopList.filter(item => {
            return item.skuId !== goods.skuId
        })
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
        if(editing){
            this.allRemoveChecked = value
            this.removeCheckedList = value ? shopList : []
            this._removeCheckedList(shopList)
        }else{
            this.allChecked = value
            this.checkedList = value ? shopList : []
            this._changeCheckList(shopList)
        }
    }
    deleteSelectedGoodsFn = ()=>{
        console.log(123)
        console.log(this.checkedList)
    }
    _deleteRemoveList = ()=>{
        console.log('removeCheckedList')
        this.removeCheckedList.forEach(item=>{
            console.log(item.skuId)
        })
    }
    _goPayCheckedList = ()=>{
        console.log('checkedList')
        this.checkedList.forEach(item=>{
            console.log(item.skuId)
        })
    }
    goPayOrDeleteFn = ()=>{
        let {editing} = this.state
        if(editing){
            this._deleteRemoveList()
        }else{
            this._goPayCheckedList()
        }
    }
    changeNumFn=(good,flag)=>{
        console.log(good,flag)
        let {shopList} = this.state
        // this.setState({})
    }
    render() {
        let {editing, shopList} = this.state
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
                                            <label className={classnames({'active': editing ? this.allRemoveChecked : this.allChecked})}>
                                                <input type="checkbox" checked={editing ? this.allRemoveChecked : this.allChecked}
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
                                                        editing ? <Controller goods={goods} onChangeNum={this.changeNumFn} /> :
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
                                                                 onClick={this.deleteGoodsFn.bind(this, goods)}>删除</div>}
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
                            <label className={classnames({'active': editing ? this.allRemoveChecked : this.allChecked})}>
                                <input type="checkbox" checked={editing ? this.allRemoveChecked : this.allChecked} onChange={this.toggleAllFn}/>
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
                            'active': editing ? this.removeCheckedList.length !== 0 : this.checkedList.length !==0
                        })} onClick={this.goPayOrDeleteFn}>{delText}</button>
                </div>
            </div>
        );

    }
}

const EmptyCart = ()=>{
    return (
        <div className="empty-shopcart">
            <p className="message">购物车快饿扁了T.T</p>
            <p className="wish">快给我挑点宝贝</p>
            <button className="go">去逛逛</button>
        </div>
    )

}
function withSubscription() {

}


export default Balance
