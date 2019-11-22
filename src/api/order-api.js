import {sendGetRequest} from "./api-send";

export function getListOrder(status_order) {
    let id_res = localStorage.getItem("id_restaurant");
    let route = `/restaurants/${id_res}/orders?status=${status_order}&time=2019/11/15`;
    return sendGetRequest(route);
}