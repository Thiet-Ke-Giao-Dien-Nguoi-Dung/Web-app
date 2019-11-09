import {sendGetRequest, sendPostRequest, sendDeleteRequest, sendPutRequest} from "./api-send";

const id_res = localStorage.getItem("id_restaurant");

export function getCategories() {
    let route = `/restaurants/${id_res}/categories`;
    return sendGetRequest(route);
}
export function createCategory(data) {
    let route = `/restaurants/${id_res}/categories`;
    return sendPostRequest(route, data);
}
export function editCategory(id_category, data) {
    let route = `/restaurants/${id_res}/categories/${id_category}`;
    return sendPutRequest(route,data);
}
export function deleteCategory(id_category) {
    let route = `/restaurants/${id_res}/categories/${id_category}`;
    return sendDeleteRequest(route);
}