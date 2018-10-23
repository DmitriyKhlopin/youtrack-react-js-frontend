export function setProductVersion(product) {
    return function (dispatch) {
        dispatch({
            type: "SET_LICENSE_REQUEST_PRODUCT_VERSION",
            payload: product
        });
    }
}