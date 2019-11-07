import {sendPostRequestWithoutToken, sendPostRequest, sendGetRequest, sendPutRequest} from "./api-send";

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
export function getInfoRestaurant() {
    const route = "/restaurants";
    return sendGetRequest(route)

}
export function editInfoRestaurant(id_restaurant, data) {
    const route = `/restaurants/${id_restaurant}`;
    return sendPutRequest(route, data);

}