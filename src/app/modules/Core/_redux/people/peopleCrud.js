import axios from "axios";
import { func } from "prop-types";
export const PEOPLE_URL = "Person";
// CREATE = add a new people to the server
export function createPerson(people) {
  return axios.post(`${PEOPLE_URL}/post`, people);
}
// READ
export function getAllpeople() {
  return axios.get(`${PEOPLE_URL}/get`);
}
export function getPersonById(peopleId) {
  return axios.get(`${PEOPLE_URL}/${peopleId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findpeople(queryParams) {
  return axios.post(`${PEOPLE_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updatePerson(people) {
  return axios.put(`${PEOPLE_URL}`, people);
}
// UPDATE Status
export function updateStatusForpeople(ids, status) {
  return axios.post(`${PEOPLE_URL}/updateStatusForpeople`, {
    ids,
    status,
  });
}
// DELETE = the people from the server
export function deletePerson(peopleId) {
  return axios.delete(`${PEOPLE_URL}/${peopleId}`);
}
// DELETE people by ids
export function deletepeople(ids) {
  return axios.post(`${PEOPLE_URL}/deletepeople`, ids);
}

// SUGGESION PERSON
export function suggestPerson(query) {
  return axios.post(`${PEOPLE_URL}/get`, {
    Filters: [{ Property: "FullNameFa", Operation: 7, Values: [query] }],
    OrderBy: "FullNameFa asc",
    PageNumber: 1,
    PageSize: 10,
  });
}

// GET DEFAULT PERSON
export function defaultPerson() {
  return axios.get(`${PEOPLE_URL}/GetDefault`);
}
