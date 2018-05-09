import React,{Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './index.scss'

class Toast extends Component{
    static propTypes = {
        title: PropTypes.string,
        showToast: PropTypes.bool,
        showTitle: PropTypes.bool,
        showFoot: PropTypes.bool
    }
    closeToastFn = ()=>{
        this.props.onClose()
    }
    confirmToastFn = ()=>{
        this.props.onConfirm()
    }
    render(){
        let {title,showToast,showTitle,showFoot,children} = this.props
        return(
            showToast &&
            <section className="toast-wrapper">
                <div className="toast-mask"></div>
                <div className="toast-content">
                    <div className="toast-hd">{title}</div>
                    <div className="toast-bd">{children}</div>    
                    <div className="toast-ft">
                        <span className="button" onClick={this.closeToastFn}>取消</span>
                        <span className="button" onClick={this.confirmToastFn}>确定</span>
                    </div>    
                </div>
            </section>
        )
    }
}

export default Toast