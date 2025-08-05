import axios from "axios";

const IPHONE_BASE_REST_API_URL = "http://localhost:8080/api/iphones"

class IphoneService {
    getAllIphones() {
        return axios.get(IPHONE_BASE_REST_API_URL);
    }

    createIphone(iphone) {
        return axios.post(IPHONE_BASE_REST_API_URL, iphone);
    }

    getIphoneById(iphoneId) {
        return axios.get(IPHONE_BASE_REST_API_URL + '/' + iphoneId);
    }

    updateIphone(iphoneId, iphone) {
        return axios.put(IPHONE_BASE_REST_API_URL + '/' + iphoneId, iphone);
    }

    deleteIphone(iphoneId) {
        return axios.delete(IPHONE_BASE_REST_API_URL + '/' + iphoneId);
    }
}

export default new IphoneService();