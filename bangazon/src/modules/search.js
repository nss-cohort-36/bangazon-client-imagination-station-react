import APIManager from "../modules/APIManager"



const search = async (search_terms) => {

        let search_terms_string = ""

        if (search_terms.location) {
            search_terms_string += `?location=${search_terms.location}`
        }

        if (search_terms.name) {
            search_terms_string += `?name=${search_terms.name}`
        }

        if (search_terms.name && search_terms.location) {
            search_terms_string += `?name=${search_terms.name}&location=${search_terms.location}`
        }

        return await APIManager.get("products", search_terms_string)

    }

export { search }
