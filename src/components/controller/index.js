import React,{Component} from 'react'
import './index.scss'

class Controller extends Component{
    changeCountFn =(goods,flag)=>{
        this.props.onChangeNum(goods,flag)
    }
    render (){
        let {goods} = this.props
        return (
            <div className="controller">
                <button className="btn-oprator reduce" onClick={this.changeCountFn(goods,-1)}>-</button>
                <input type="text" className="input-num" value={goods.count} />
                <button className="btn-oprator add" onClick={this.changeCountFn.bind(this,1)}>+</button>
            </div>
        )
    }
}
export default Controller