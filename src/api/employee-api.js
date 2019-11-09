import {sendGetRequest, sendPostRequest, sendDeleteRequest} from "./api-send";
const id_res = localStorage.getItem("id_restaurant");

export function getEmployees() {

    const route=`/restaurants/${id_res}/employees`;
    return sendGetRequest(route);
}
export function addNewEmployee(data) {
    const route=`/restaurants/${id_res}/employees`;
    return sendPostRequest(route, data);
}
export function deleteEmployee(id_employee) {
    const route = `/restaurants/${id_res}/employees/${id_employee}`;
    return sendDeleteRequest(route);

}