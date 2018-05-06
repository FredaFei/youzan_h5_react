import axios from 'axios'

export const fetch = (url,data)=>{
    return new Promise((resolve,reject)=>{
        axios.post(url,data)
            .then(res=>{
                let {success,message} = res.data
                if(success === true){
                    resolve(res.data)
                }
                console.log(message)
                reject(res)
            })
            .catch(error=>reject(error))
    })
}