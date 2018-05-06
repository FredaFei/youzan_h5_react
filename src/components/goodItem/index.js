import React from 'react';
import './index.scss'

export default (props)=>{
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