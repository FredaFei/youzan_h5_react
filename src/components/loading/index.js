import React from 'react'
import './index.scss'

const Loading = ({loadMsg,loadAnimation})=>{
    return(
        <div className="loading-wrapper">
            <div className={'data-load data-load-' + loadAnimation}></div>
            <div className="msg">{loadMsg}</div>
        </div>
    )
}
Loading.defaultProps = {
    loadAnimation: true, //默认显示加载动画
    loadMsg: '正在加载中'
}

export default Loading