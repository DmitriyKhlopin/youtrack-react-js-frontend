import React from "react";
import styles from "../../styles/components.module.css";
import {closeDialog, selectMainDialogComponent, selectMainDialogState} from "../../redux/combined/mainDialog";
import {useDispatch, useSelector} from "react-redux";

function BaseDialog() {
    const dispatch = useDispatch();
    const mainDialogOpened = useSelector(selectMainDialogState);
    const mainDialogContent = useSelector(selectMainDialogComponent);
    console.log(mainDialogContent);
    return mainDialogOpened
        ? <div className={styles.modalBackground} onClick={() => dispatch(closeDialog())}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                {mainDialogContent === null ?
                    <div className={styles.column}>
                        <div>This is a base dialog</div>
                        <div className={styles.row}>
                            <button onClick={() => dispatch(closeDialog())} color="primary">
                                Закрыть
                            </button>
                        </div>
                    </div>
                    : mainDialogContent}
            </div>
        </div>
        : null
}

export default BaseDialog;