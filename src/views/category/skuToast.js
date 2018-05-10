import React, {Component} from 'react'
import Controller from 'components/controller/'
// import {CSSTransitionGroup} from 'react-transition-group'
import './skuToast.scss';

class SkuToast extends Component {
    state = {
        checked: false
    }
    addShopcartFn = () => {
        this.props.closeSkuFn()
    }
    immediatePurchaseFn = () => {
    }

    render() {
        let {checked} = this.state
        let {goodDetail} = this.props
        return (
            <section className="sku-toast-wrapper">
                <div className="mask" onClick={this.props.closeSkuFn.bind(this, false)}></div>
                <div className="sku-content">
                    <div className="sku-head">
                        <div className="img"></div>
                        <div className="info">
                            <div className="name ellipsis">【明文脆皮】费大幅度发顺丰到付爽双方的份额哦啦啦啦肤水</div>
                            <div className="price">￥ 66.00</div>
                            <div className="icon-close close" onClick={this.props.closeSkuFn.bind(this, false)}></div>
                        </div>
                    </div>
                    <div className="sku-body">
                        <div className="cell-form">
                            <div className="cell-item">
                                <div className="left">
                                    <span>购买数量：</span>
                                    <span>剩余17件</span>
                                </div>
                                {/*<Controller />*/}
                            </div>
                        </div>
                    </div>
                    <div className="sku-foot">
                        <button className="btn" onClick={this.addShopcartFn.bind(this)}>加入购物车</button>
                        <button className="btn" onClick={this.immediatePurchaseFn.bind(this)}>立即购买</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default SkuToast