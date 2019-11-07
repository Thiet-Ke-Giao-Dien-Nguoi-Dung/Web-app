import axios from "axios";
const URL_BASE = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("token")
function handleResult(res)
{
   return res.data;
}
export function sendGetRequest(route)
{
    let url = `${URL_BASE}${route}`;
    let headers={
        token: accessToken
    };
    return axios.get(url,{headers}).then(handleResult);
}
export function sendPostRequest(route, payload)
{
    let url = `${URL_BASE}${route}`;
    let headers={
        token: accessToken
    };
    return axios.post(url,payload,{headers}).then(handleResult);
}
export function sendPutRequest(route, payload) {
    let url = `${URL_BASE}${route}`;
    let headers={
        token: accessToken
    };
    return axios.put(url,payload,{headers}).then(handleResult);
}
export function sendDeleteRequest(route) {
    let url = `${URL_BASE}${route}`;
    let headers={
        token: accessToken
    };
    return axios.delete(url,{headers}).then(handleResult);
}

export function sendPostRequestWithoutToken(route, payload)
{
    let url = `${URL_BASE}${route}`;
    return axios.post(url,payload).then(handleResult);
}
