import {sendGetRequest} from "./api-send";
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