import React from 'react'
import './index.scss'

export default (props)=>{
    let {text} = props || '标题一'
    return (
        <div className="title">
            <div className="line"></div>
            <div className="text">{text}</div>
            <div className="line"></div>
        </div>
    )
}