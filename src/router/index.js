import React,{Component} from 'react'
import {BrowserRouter, Route,Switch,Redirect} from 'react-router-dom'

import Home from '@/views/home/'
import Category from '@/views/category/'
import ShopCart from '@/views/shopCart/'
import Usercenter from '@/views/usercenter'
import NavFooter from 'components/footer/'

export default class RouterConfig extends Component{
    render(){
        return(
            <BrowserRouter>
                <div className="page-wrapper">
                    <div className="page-bd">
                        <Switch>
                            <Route path='/index' exact component={Home}/>
                            <Route path='/category' component={Category} />
                            <Route path='/shopcart' component={ShopCart} />
                            <Route path='/usercenter' component={Usercenter} />
                            <Redirect from="*" to='/index' />
                        </Switch>
                    </div>
                    <NavFooter />
                </div>
            </BrowserRouter>
        )
    }
}