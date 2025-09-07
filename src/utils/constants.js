export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

const RES_API_TARGET = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.900965&lng=75.8572758';
export const RES_API = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(RES_API_TARGET)}`;

const MENU_API_TARGET = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.900965&lng=75.8572758&restaurantId=";
export const MENU_API = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(MENU_API_TARGET)}`;
