import {sendGetRequest, sendPutRequest} from "./api-send";

export function getListOrder(status_order) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/orders?status=${status_order}`;
    return sendGetRequest(route);
}
export function updateStatusOrder(data, id_order) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/orders/${id_order}/status`;
    return sendPutRequest(route, data);
}
export function getOderById(id_order) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/orders/${id_order}`;
    return sendGetRequest(route);
}
export function getPrintBill(id_order) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/orders/${id_order}/print`;
    return sendGetRequest(route);
}