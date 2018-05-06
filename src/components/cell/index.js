import React,{Component} from 'react'
import './index.scss'

class Cell extends Component{
    render(){
        return (
            <div className="cell-wrapper">
                <div className="left">
                    <i className="icon-Phone"></i>
                    <span className="text">hahahhahahah</span>
                </div>
                <button className="plain-btn">立即绑定</button>
            </div>
        )
    }
}

export default Cell
