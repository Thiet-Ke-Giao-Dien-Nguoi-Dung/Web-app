import {sendPostRequestWithoutToken, sendPostRequest} from "./api-send";

export function login(data)
{
    let route="/login";
    return sendPostRequestWithoutToken(route, data);
}

export function register(data)
{
    let route="/register";
    return sendPostRequestWithoutToken(route, data);
}
export  function changePassword(data) {
    const route="/users/passwords";
    return sendPostRequest(route, data);

}
