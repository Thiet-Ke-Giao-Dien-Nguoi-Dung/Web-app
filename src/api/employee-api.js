import {sendGetRequest, sendPostRequest, sendDeleteRequest} from "./api-send";

export function getEmployees() {
    let id_res = localStorage.getItem("id_restaurant");
    const route=`/restaurants/${id_res}/employees`;
    return sendGetRequest(route);
}
export function addNewEmployee(data) {
    let id_res = localStorage.getItem("id_restaurant");
    const route=`/restaurants/${id_res}/employees`;
    let token =  localStorage.getItem("token");
    return sendPostRequest(route, data, {token});
}
export function deleteEmployee(id_employee) {
    let id_res = localStorage.getItem("id_restaurant");
    const route = `/restaurants/${id_res}/employees/${id_employee}`;
    return sendDeleteRequest(route);

}