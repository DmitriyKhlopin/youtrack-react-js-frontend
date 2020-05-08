import React from "react";
import connect from "react-redux/es/connect/connect";
import styles from "../styles/components.module.css"
import {useDispatch} from "react-redux";
import {closeMainDialog} from "../redux/actions/appBarActions";

function ReportFilterDialog({appBarState}) {

    const dispatch = useDispatch();

    const noDescriptionHelp = <div className={styles.column}>
        <div style={{width: '100vw'}}>
            Unfortunately I'm undefined :(
        </div>
    </div>;

    const timeAccountingHelp = <div>
        <div style={{width: '100vw'}}>
            Трудозатраты выгружаются в соотвествии с расписанием cron-планировщика:
        </div>
        <div style={{width: '100vw'}}>
            '0 0/10 * * * *'
        </div>
        <br/>
        <div align={'left'} style={{width: '100vw'}}>
            Если их нет в таблице через 10 минут после внесения, то проверьте их наличие в YT и фильтры
            отчёта.
        </div>
    </div>;
    const m = new Map();
    m.set(1, timeAccountingHelp);

    console.log(m.get(appBarState.selectedId));

    return appBarState.dialogOpened
        ? <div className={styles.modalBackground} onClick={() => dispatch(closeMainDialog())}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <div id="scroll-dialog-title">{appBarState.title}</div>
                {m.get(appBarState.selectedId) ? m.get(appBarState.selectedId) : noDescriptionHelp}
                <div className={styles.row}>
                    <button onClick={() => dispatch(closeMainDialog())} color="primary">
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
        : null

}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
    }
}

export default connect(mapStateToProps, null)(ReportFilterDialog);