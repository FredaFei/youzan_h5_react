import React from 'react'
import './index.scss'

export default ()=>{
    return (
        <div className="controller">
            <button className="btn-oprator reduce">-</button>
            <input type="text" className="input-num" defaultValue="10"/>
            <button className="btn-oprator add">+</button>
        </div>
    )
}