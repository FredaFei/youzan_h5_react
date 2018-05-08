import React, {Component} from 'react';
import Loading from 'components/loading/'

export default (WrappedComponent,requestData)=>{
    return class extends Component{
        state = {
            data: null
        }
        componentWillMount(){
            requestData().then(res=>{
                this.setState({
                    data: res.data
                })
            })
        }
        render(){
            let {data} = this.state
            if(!data){
                return <Loading />
            }
            return <WrappedComponent data={data} {...this.props} />
        }
    }
}