import React,{Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import BScroll from 'better-scroll';
import './index.scss'

class ScrollBox extends Component {
    static propTypes = {
        showTop: PropTypes.bool,
        showBottom: PropTypes.bool
    }
    state = {
        upReady: false,
        scrollTopText: '下拉刷新'
    }

    componentDidMount(){
        this._initScroll()
    }
    _initScroll=()=>{
        this.scroll = new BScroll(this.refs.page,{
            probeType: 1,
            scrollY: true,
            click: true
        })
        this.scroll.on('scroll', (pos) => {
            if (pos.y >= 50) {
                this.upReady = true;
                this.scrollTopText = '松开刷新';
            } else {
                this.upReady = false;
                this.scrollTopText = '下拉刷新';
            }
        });
        this.scroll.on('scrollEnd', (pos) => {
            if (this.upReady && this.showTop && pos.y === 0) {
                this.upReady = false;
                this.scrollTopText = '下拉刷新';
                // this.$emit('pullUp');
            } else if (this.showBottom && (this.scroll.y <= this.scroll.maxScrollY + 50)) {
                // this.$emit('pullDown');
            }
        });
        this.scroll.on('touchEnd', (pos) => {
            // this.$emit('touchEnd', {
            //     x: pos.x,
            //     y: pos.y,
            //     height: Math.abs(this.scroll.maxScrollY)
            // });
        });
    }
    refresh = ()=> {
        this.scroll && this.scroll.refresh();
    }
    render(){
        let {upReady,scrollTopText} = this.state
        return (
            <section className="scroll-box" ref="page">
                <div className="scroll-tbody">
                    <div className={classnames('scroll-top',{'active':upReady})}><em></em>{scrollTopText}</div>
                    <div className="scroll-inner">
                        {this.props.children}
                    </div>
                </div>
            </section>
        )
    }
}
export default ScrollBox
