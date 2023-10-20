import axios from "axios";

export const url = "Attachment";

export function getById(id) {
  return axios.get(`${url}/get/${id}`);
}