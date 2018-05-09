import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.scss'

class Controller extends Component {
    static propTypes = {
        good: PropTypes.object.isRequired
    }
    quantity = this.props.good.count
    shouldComponentUpdate(nextProps){
        return this.quantity !== nextProps.good.count
    }
    componentWillUpdate(nextProps){
        this.quantity = nextProps.good.count
    }
    changeInputNum = (e)=>{
        const {good} = this.props
        let num = +(e.target.value)
        this.props.onChangeNum(good.skuId, this._checkCount(num))
    }
    _checkCount(num){
        const {good} = this.props
        num = num>=good.stock ? good.stock : num
        num = num<=1 ? 1 : num
        return num
    }
    changeCountFn = (val)=>{
        const {good} = this.props
        let {quantity} = this
        quantity = quantity + val
        this.props.onChangeNum(good.skuId, this._checkCount(quantity))
    }
    render() {
        let {good} = this.props
        return (
            <div className="controller">
                <button className={classnames('btn-oprator reduce',{'disabled':good.count<=1})} disabled={good.count<=1} onClick={this.changeCountFn.bind(this,-1)}>-</button>
                <input type="number" name="count" className="input-num" value={good.count} onChange={this.changeInputNum}/>
                <button className={classnames('btn-oprator add',{'disabled': good.count>=good.stock})} disabled={good.count>=good.stock} onClick={this.changeCountFn.bind(this,1)}>+</button>
            </div>
        )
    }
}

export default Controller