import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/n3/',
        // timeout: 1000
    })
    // axios拦截器
    instance.interceptors.request.use(config => {
        return config
    }), err => {

    }
    instance.interceptors.response.use(res => {
        return res.data
    }), err => {
       console.log(err);
    }
    return instance(config)

}