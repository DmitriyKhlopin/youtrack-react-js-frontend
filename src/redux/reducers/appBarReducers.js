export default function reducer(state = {
    title: 'Default',
    selectedId: 0,
    drawerOpened: false
}, action) {
    switch (action.type) {
        case 'SET_SELECTED_NAV_ITEM': {
            state = {
                ...state,
                title: action.payload.title,
                selectedId: action.payload.selectedId
            };
            break;
        }
        case 'TOGGLE_APP_BAR': {
            state = {
                ...state,
                drawerOpened: !state.drawerOpened
            };
        }
    }
    return state;
};