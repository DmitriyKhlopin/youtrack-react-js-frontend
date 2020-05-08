const defaultState = {
    opened: false,
    content: null
}

export function openDialog(content) {
    return function (dispatch) {
        dispatch({
            type: 'DIALOG_OPEN',
            payload: content
        })
    }
}

export function closeDialog() {
    return function (dispatch) {
        dispatch({type: 'DIALOG_CLOSE'})
    }
}

export const mainDialogReducer = {mainDialog: reducer}

export function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'DIALOG_OPEN': {
            state = {...state, opened: true, content: action.payload};
            break;
        }
        case 'DIALOG_CLOSE': {
            state = defaultState;
            break;
        }
    }
    return state;
}

export const selectMainDialogState = (state) => state.mainDialog.opened;
export const selectMainDialogComponent = (state) => state.mainDialog.content;