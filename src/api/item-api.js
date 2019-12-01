import {sendGetRequest, sendPutRequest, sendPostRequest} from "./api-send";

export function getItems(query) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/items?page_size=${query.page_size}&page_number=${query.page_number}`;
    if(query.id_category !== "" && query.id_category !== undefined)
        route = route + `&id_category=${query.id_category}`;
    return sendGetRequest(route);
}
export  function editItem(id_item, data) {
    let id_res = localStorage.getItem("id_restaurant");
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