import { get } from "../modules/APIManager"



const search = async (mode, product_search_term, location_search_term) => {

    if (mode === 'product') {

        return await get("products", `?name=${product_search_term}`)
        
    }

    if (mode === 'city') {

        return await get("products", `?location=${location_search_term}`)

    }

    if (mode === 'combo') {

        return await get("products", `?location=${location_search_term}&name=${product_search_term}`)

    }

}
