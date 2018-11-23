import axios from 'axios';
import qs from 'qs';

const apiUrl = process.env.REACT_APP_API_URL;
const url = `${apiUrl}/`;

export function fetch(pathService, filter) {
  return axios.get(`${url}${pathService}?${qs.stringify(filter)}`).then(res => res.data);
}

export function fetchPaged(pathService, { search, limit, offset }) {
  return axios.get(`${url}${pathService}?search=${search}&limit=${limit}&offset=${offset}`)
    .then(res => res.data);
}

export function create(pathService, record) {
  return axios.post(`${url}${pathService}`, record).then(res => res.data);
}

export function update(pathService, id, record) {
  return axios.patch(`${url}${pathService}/${id}`, record).then(res => res.data);
}

export function remove(pathService, id) {
  return axios.delete(`${url}${pathService}/${id}`).then(res => res.data);
}
