import React from "react";
import styles from "../../styles/components.module.css";
import {useSelector} from "react-redux";
import {dismissError, selectErrorExists, selectErrorText} from "../../redux/combined/error";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";

function ErrorDialog() {
    const dispatch = useDispatch();
    const dismiss = () => dispatch(dismissError());
    const closeIcon = <FontAwesomeIcon
        icon={faTimesCircle}
        className={styles.iconButton}
        onClick={dismiss} size={'1x'}
    />;

    const hasError = useSelector(selectErrorExists);
    const text = useSelector(selectErrorText);
    return hasError ? <div className={styles.modalError}>
        <div>{text}</div>
        <div className={styles.modalErrorClose}>{closeIcon}</div>
    </div> : null
}

export default ErrorDialog;
