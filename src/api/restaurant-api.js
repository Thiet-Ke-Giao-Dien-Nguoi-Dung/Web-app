import {sendGetRequest, sendPutRequest} from "./api-send";

export function getInfoRestaurant() {
    const route = "/restaurants";
    return sendGetRequest(route)

}
export function editInfoRestaurant(data) {
    let id_res = localStorage.getItem("id_restaurant");
    const route = `/restaurants/${id_res}`;
    return sendPutRequest(route, data);
}