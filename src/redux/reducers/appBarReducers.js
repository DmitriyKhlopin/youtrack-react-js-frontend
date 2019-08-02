export default function reducer(state = {
    currentPage: null,
    selectedId: 0,
    drawerOpened: false,
    dialogOpened: false,
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
        case 'TOGGLE_APP_BAR': {
            state = {
                ...state,
                drawerOpened: !state.drawerOpened
            };
            break;
        }
        case 'OPEN_MAIN_DIALOG': {
            state = {
                ...state,
                dialogOpened: true
            };
            break;
        }
        case 'CLOSE_MAIN_DIALOG': {
            state = {
                ...state,
                dialogOpened: false
            };
            break;
        }
    }
    return state;
};
