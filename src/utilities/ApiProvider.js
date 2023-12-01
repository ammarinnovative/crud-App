import axios from "axios";

export const POST = async(url, data = {}, headers = {}) => {
    try {
        const res = await axios.post(
            url, 
            data, 
            {
                headers,
                validateStatus: status => {
                    // console.log(status);
                    return status>=200
                }
            }
        );
        return res.data;
    } catch (error) {
        // console.log(error);
        return error;
    }
}

export const PUT = async(url, data = {}, headers = {}) => {
    try {
        const res = await axios.put(
            url, 
            data, 
            {
                headers,
                validateStatus: status => {
                    // console.log(status);
                    return status>=200
                }
            }
        );
        return res.data;
    } catch (error) {
        // console.log(error);
        return error;
    }
}

export const GET = async(url, headers = {}) => {
    try {
        const res = await axios.get(
            url, 
            {
                headers,
                validateStatus: status => {
                    // console.log(status);
                    return status>=200
                }
            }
        );
        return res.data;
    } catch (error) {
        // console.log(error);
        return error;
    }
}

export const DELETE = async(url, headers = {}) => {
    try {
        const res = await axios.delete(
            url,
            {
                headers,
                validateStatus: status => {
                    // console.log(status);
                    return status>=200
                }
            }
        );
        return res.data;
    } catch (error) {
        // console.log(error);
        return error;
    }
}