import {sendGetRequest, sendPutRequest, sendPostRequest} from "./api-send";
import {stringify} from "query-string";

export function getItems(id_category) {
    let id_res = localStorage.getItem("id_restaurant");
    let route;
    if(id_category !== "")
        route = `/restaurants/${id_res}/items?${stringify({id_category})}`;
    else
        route = `/restaurants/${id_res}/items`;
    return sendGetRequest(route);
}
export  function editItem(id_item, data) {
    let id_res = localStorage.getItem("id_restaurant");
    console.log(id_res);
    console.log(id_item)
    let route = `/restaurants/${id_res}/items/${id_item}`;
    return sendPutRequest(route, data)
}
export function addNewItem(data) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/items`;
    let headers = {
            token: localStorage.getItem("token"),
            'content-type': 'multipart/form-data'
        };
    return sendPostRequest(route, data, headers);
}