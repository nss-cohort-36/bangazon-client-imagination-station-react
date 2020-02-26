import APIManager from './APIManager'

export default {
    getUserOpenOrder() {
        return APIManager.get("orders", "?customer=true&open=true")
    }

}

  