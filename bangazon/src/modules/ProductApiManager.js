import APIManager from './APIManager'

export default {
    getTotalSold(productId) {
        return APIManager.getAll("products", `/num_sold?product_id=${productId}`)
    }
}