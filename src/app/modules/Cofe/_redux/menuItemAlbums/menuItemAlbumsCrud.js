
import axios from "axios";
export const MENUITEMALBUMS_URL = "MenuItemAlbum";
// CREATE = add a new menuItemAlbums to the server 
export function createMenuItemAlbum(menuItemAlbums) { 
  return axios.post(`${MENUITEMALBUMS_URL}/post`, menuItemAlbums); 
}
// READ  
export function getAllMenuItemAlbums() {
  return axios.get(`${MENUITEMALBUMS_URL}/get`);
}
export function getMenuItemAlbumById(menuItemAlbumsId) {
  return axios.get(`${MENUITEMALBUMS_URL}/get/${menuItemAlbumsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findMenuItemAlbums(queryParams) {
  return axios.post(`${MENUITEMALBUMS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateMenuItemAlbum(id, menuItemAlbums) {
  return axios.put(`${MENUITEMALBUMS_URL}/put/${id}`, menuItemAlbums);
}
// UPDATE Status  
export function updateStatusForMenuItemAlbums(ids, status) {
  return axios.post(`${MENUITEMALBUMS_URL}/updateStatusForMenuItemAlbums`, {
    ids,
    status,
  });
}
// DELETE = the menuItemAlbums from the server  
export function deleteMenuItemAlbum(menuItemAlbumsId) {
  return axios.delete(`${MENUITEMALBUMS_URL}/delete/${menuItemAlbumsId}`);
}
// DELETE MenuItemAlbums by ids  
export function deleteMenuItemAlbums(ids) {
return axios.post(`${MENUITEMALBUMS_URL}/deleteMenuItemAlbums`, ids);
}