import APIManager from './APIManager'

export default {
    getUserOpenOrder() {
        return APIManager.getAll("orders", "?customer=true&open=true")
    }

}

  