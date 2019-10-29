import axios from "axios";
const URL_BASE=process.env.REACT_APP_API_URL;

function handleResult(res)
{
    console.log(res.data)
    if(res.data.success)
    {
        return res.data.data;
    }
    else
        console.log("error")
}
export function sendGetRequest(route, accessToken)
{
    let url = `${URL_BASE}${route}`;
    let headers={
        token: accessToken
    };
    return axios.get(url,headers).then(handleResult);
}
export function sendPostRequest(route, payload, accessToken)
{
    let url = `${URL_BASE}${route}`;
    let headers={
        token: accessToken
    };
    return axios.post(url,payload,headers).then(handleResult);
}


export function sendPostRequestWithoutToken(route, payload)
{
    console.log(process.env);
    let url = `${URL_BASE}${route}`;
    return axios.post(url,payload).then(handleResult);
}
