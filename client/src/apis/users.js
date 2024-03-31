import * as axios from 'axios'

function addUser(data) {
    return axios.post('/users', data).data;
}
function getUsers(params) {
    return axios.get('/users', params).data;
}
function updateUsers(data) {
    return axios.put('/users', data).data;
}
function deleteUser(params) {
    return axios.delete('/users', params).data;
}