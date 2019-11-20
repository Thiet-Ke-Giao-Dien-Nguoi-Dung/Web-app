import {sendGetRequest} from "./api-send";

export function getRevenues(query) {
    let id_res = localStorage.getItem("id_restaurant");
    const route = `/restaurants/${id_res}/revenues?from=${query.startDate}&to=${query.endDate}`;
    return sendGetRequest(route);
}