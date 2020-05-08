export function toggleAppBar() {
    return function (dispatch) {
        dispatch({type: "TOGGLE_APP_BAR"});
    }
}

export default function reducer(state = {
    drawerOpened: false
}, action) {
    switch (action.type) {
        case 'TOGGLE_APP_BAR': {
            state = {
                ...state,
                drawerOpened: !state.drawerOpened
            };
            break;
        }
    }
    return state;
};

export const appBarReducer = {appBar: reducer}
export const selectDrawerState = (state) => state.appBar.drawerOpened;