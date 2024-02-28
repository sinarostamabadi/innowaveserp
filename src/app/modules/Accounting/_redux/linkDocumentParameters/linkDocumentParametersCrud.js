import axios from "axios";
export const LINKDOCUMENTPARAMETERS_URL = "LinkDocumentParameter";
// CREATE = add a new linkDocumentParameters to the server
export function createLinkDocumentParameter(linkDocumentParameters) {
  return axios.post(
    `${LINKDOCUMENTPARAMETERS_URL}/post`,
    linkDocumentParameters
  );
}
// READ
export function getAllLinkDocumentParameters() {
  return axios.get(`${LINKDOCUMENTPARAMETERS_URL}/get`);
}
export function getLinkDocumentParameterById(linkDocumentParametersId) {
  return axios.get(
    `${LINKDOCUMENTPARAMETERS_URL}/get/${linkDocumentParametersId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findLinkDocumentParameters(queryParams) {
  return axios.post(`${LINKDOCUMENTPARAMETERS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateLinkDocumentParameter(id, linkDocumentParameters) {
  return axios.put(
    `${LINKDOCUMENTPARAMETERS_URL}/put/${id}`,
    linkDocumentParameters
  );
}
// UPDATE Status
export function updateStatusForLinkDocumentParameters(ids, status) {
  return axios.post(
    `${LINKDOCUMENTPARAMETERS_URL}/updateStatusForLinkDocumentParameters`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the linkDocumentParameters from the server
export function deleteLinkDocumentParameter(linkDocumentParametersId) {
  return axios.delete(
    `${LINKDOCUMENTPARAMETERS_URL}/delete/${linkDocumentParametersId}`
  );
}
// DELETE LinkDocumentParameters by ids
export function deleteLinkDocumentParameters(ids) {
  return axios.post(
    `${LINKDOCUMENTPARAMETERS_URL}/deleteLinkDocumentParameters`,
    ids
  );
}
