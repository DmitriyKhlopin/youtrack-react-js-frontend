export default function reducer(state = {
    products: ['9.0 по прайсу', '9.0 по единицам', '8.2 по прайсу', '8.2 по единицам', '8 по прайсу', '8 по единицам',
        '7.2 по прайсу', '7.2 по единицам', '5.26'],
    selectedProduct: '9.0 по прайсу',
    selectedId: 0,
    drawerOpened: false
}, action) {
    switch (action.type) {
        case 'SET_LICENSE_REQUEST_PRODUCT_VERSION': {
            state = {
                ...state,
                selectedProduct: action.payload,
            };
            break;
        }
    }
    return state;
};