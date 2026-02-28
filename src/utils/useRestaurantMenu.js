import { useEffect, useState } from "react";

import { MENU_API } from "./constants";

const useRestaurantMenu = (resId)=>{

    const [resInfo,setResInfo] = useState(null);
    
    useEffect(()=>{
        async function fetchData() {
            try {
                const data = await fetch(MENU_API + resId);
                if (!data.ok) {
                    throw new Error("Error while fetching restaurant data");
                }
                const text = await data.text();
                if (!text) {
                    throw new Error("Empty response from API/proxy");
                }
                const json = JSON.parse(text);
                // console.log(json);
                setResInfo(json);
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchData()
    },[])

    return resInfo;
}

export default useRestaurantMenu;