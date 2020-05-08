export function setSelectedNavItem(currentPage) {
    return function (dispatch) {
        dispatch({
            type: "SET_SELECTED_NAV_ITEM",
            payload: currentPage
        });
    }
}

export default function reducer(state = {
    currentPage: null,
    selectedId: 0
}, action) {
    switch (action.type) {
        case 'SET_SELECTED_NAV_ITEM': {
            state = {
                ...state,
                currentPage: action.payload,
                selectedId: action.payload.id
            };
            break;
        }
    }
    return state;
};

export const navigationReducer = {navigation: reducer}