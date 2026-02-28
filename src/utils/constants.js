export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const RES_API = "/api/restaurants";

const MENU_API_TARGET = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.900965&lng=75.8572758&restaurantId=";
export const MENU_API = `https://corsproxy.io/?url=${encodeURIComponent(MENU_API_TARGET)}`;
