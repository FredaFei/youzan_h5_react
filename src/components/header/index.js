import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.css'

class Header extends Component{
    constructor(){
        super(...arguments)
        this.state={
            isToggleNav: false
        }
    }
    handleToggleNav = ()=>{
        this.setState(prevState=>({isToggleNav: !prevState.isToggleNav}))
    }
    render(){
        const {isToggleNav} = this.state
        return (
            <div className="wrap">
                <header className="flex-ct">
                    <div className="flex-item icon-menu" onClick={this.handleToggleNav}>menu</div>
                    <div className="flex-item home">首页</div>
                    <div className="flex-item icon-record">记录</div>
                    <ReactCSSTransitionGroup transitionName="slide"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                        {
                            isToggleNav && <aside key='nav-slide' className="nav-slide-list" onClick={this.handleToggleNav}>
                                <NavLink className="nav-link" to="/">Home</NavLink>
                                <NavLink className="nav-link" to="/balance">balance</NavLink>
                                <NavLink className="nav-link" to="/helpCenter">help</NavLink>
                            </aside>
                        }
                    </ReactCSSTransitionGroup>
                </header>
            </div>
        )

    }
}

export default Header