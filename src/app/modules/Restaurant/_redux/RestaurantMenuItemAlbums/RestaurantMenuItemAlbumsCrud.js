import axios from "axios";
export const RESTAURANTMENUITEMALBUMS_URL = "RestaurantMenuItemAlbum";
// CREATE = add a new restaurantMenuItemAlbums to the server
export function createRestaurantMenuItemAlbum(restaurantMenuItemAlbums) {
  return axios.post(
    `${RESTAURANTMENUITEMALBUMS_URL}/post`,
    restaurantMenuItemAlbums
  );
}
// READ
export function getAllRestaurantMenuItemAlbums() {
  return axios.get(`${RESTAURANTMENUITEMALBUMS_URL}/get`);
}
export function getRestaurantMenuItemAlbumById(restaurantMenuItemAlbumsId) {
  return axios.get(
    `${RESTAURANTMENUITEMALBUMS_URL}/get/${restaurantMenuItemAlbumsId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findRestaurantMenuItemAlbums(queryParams) {
  return axios.post(`${RESTAURANTMENUITEMALBUMS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateRestaurantMenuItemAlbum(id, restaurantMenuItemAlbums) {
  return axios.put(
    `${RESTAURANTMENUITEMALBUMS_URL}/put/${id}`,
    restaurantMenuItemAlbums
  );
}
// UPDATE Status
export function updateStatusForRestaurantMenuItemAlbums(ids, status) {
  return axios.post(
    `${RESTAURANTMENUITEMALBUMS_URL}/updateStatusForRestaurantMenuItemAlbums`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the restaurantMenuItemAlbums from the server
export function deleteRestaurantMenuItemAlbum(restaurantMenuItemAlbumsId) {
  return axios.delete(
    `${RESTAURANTMENUITEMALBUMS_URL}/delete/${restaurantMenuItemAlbumsId}`
  );
}
// DELETE RestaurantMenuItemAlbums by ids
export function deleteRestaurantMenuItemAlbums(ids) {
  return axios.post(
    `${RESTAURANTMENUITEMALBUMS_URL}/deleteRestaurantMenuItemAlbums`,
    ids
  );
}
