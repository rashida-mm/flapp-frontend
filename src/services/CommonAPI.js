//structure of api call
import axios from 'axios'

export const commonAPI = async (httpRequest,url, reqBody, reqHeaders) => {
    //request config
    const reqConfig = {
        method: httpRequest, //get,put
        url, //localhost:3000
        data: reqBody, //name,email
        headers: reqHeaders ? reqHeaders : { "Content-Type": "application/json" } //images
    }

    //create axios instance if data
    return await axios(reqConfig).then((response) => {
        return response
    })
        .catch((err) => {
            return err
        })
}
