import {sendGetRequest, sendPostRequest, sendDeleteRequest, sendPutRequest} from "./api-send";

export function getCategories() {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/categories`;
    return sendGetRequest(route);
}
export function createCategory(data) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/categories`;
    let token =  localStorage.getItem("token");
    return sendPostRequest(route, data, {token});
}
export function editCategory(id_category, data) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/categories/${id_category}`;
    return sendPutRequest(route,data);
}
export function deleteCategory(id_category) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/categories/${id_category}`;
    return sendDeleteRequest(route);
}