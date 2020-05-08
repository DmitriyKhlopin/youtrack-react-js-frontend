import React, {useState} from "react";
import styles from "../styles/components.module.css";
import DatePicker from "react-datepicker";
import {useDispatch} from "react-redux";
import cx from "classnames";
import {fetchETL} from "../redux/actions/etlFilterActions";
import {format} from "date-fns";

function ETLDisplay() {
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(true);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [issuesChecked, setIssuesChecked] = useState(true);
    const [workItemsChecked, setWorkItemsChecked] = useState(false);
    const [historyChecked, setHistoryChecked] = useState(false);
    const [projectsChecked, setProjectsChecked] = useState(false);
    const [bundlesChecked, setBundlesChecked] = useState(false);
    const [usersChecked, setUsersChecked] = useState(false);
    const [timelineChecked, setTimelineChecked] = useState(false);
    const [periodTimelineChecked, setPeriodTimelineChecked] = useState(false);
    const [deletedChecked, setDeletedChecked] = useState(false);
    const [pendingChecked, setPendingChecked] = useState(false);
    const handleClick = () => {
        dispatch(fetchETL(
            created ? 'created' : 'updated',
            format(startDate, 'yyyy-MM-dd'),
            format(endDate, 'yyyy-MM-dd'),
            [issuesChecked ? 'issues' : null,
                workItemsChecked ? 'work_items' : null,
                historyChecked ? 'history' : null,
                projectsChecked ? 'projects' : null,
                bundlesChecked ? 'bundles' : null,
                usersChecked ? 'users' : null,
                timelineChecked ? 'timeline' : null,
                periodTimelineChecked ? 'timelineAll' : null,
                deletedChecked ? 'deleted' : null,
                pendingChecked ? 'pending' : null].filter(e => e != null).join(',')
        ));
    }

    return (
        <div className={styles.column}>
            <div className={cx(styles.row, styles.centered, styles.defaultMargin, styles.defaultPadding)}>
                <CheckBox checked={created} onChange={() => setCreated(true)} label={'Созданы'}/>
                <CheckBox checked={!created} onChange={() => setCreated(false)} label={'Изменены'}/>
                <div className={styles.defaultMargin}>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
                <div className={styles.defaultMargin}>
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
            </div>
            <div className={cx(styles.row, styles.centered, styles.defaultMargin, styles.defaultPadding)}>
                <CheckBox checked={issuesChecked} onChange={() => setIssuesChecked(!issuesChecked)} label={'Заявки'}/>
                <CheckBox checked={workItemsChecked} onChange={() => setWorkItemsChecked(!workItemsChecked)} label={'Трудозатраты'}/>
                <CheckBox checked={historyChecked} onChange={() => setHistoryChecked(!historyChecked)} label={'История'}/>
                <CheckBox checked={bundlesChecked} onChange={() => setBundlesChecked(!bundlesChecked)} label={'Bundles'}/>
                <CheckBox checked={projectsChecked} onChange={() => setProjectsChecked(!projectsChecked)} label={'Проекты'}/>
                <CheckBox checked={usersChecked} onChange={() => setUsersChecked(!usersChecked)} label={'Пользователи'}/>
                <CheckBox checked={timelineChecked} onChange={() => setTimelineChecked(!timelineChecked)} label={'Вычисление периодов'}/>
                <CheckBox checked={periodTimelineChecked} onChange={() => setPeriodTimelineChecked(!periodTimelineChecked)} label={'Вычисление периодов за вся время'}/>
                <CheckBox checked={deletedChecked} onChange={() => setDeletedChecked(!deletedChecked)} label={'Поиск удалённых задач'}/>
                <CheckBox checked={pendingChecked} onChange={() => setPendingChecked(!pendingChecked)} label={'Поиск ожидающих задач'}/>
            </div>
            <div className={cx(styles.row, styles.centered, styles.defaultMargin, styles.defaultPadding)}>
                <button className={styles.textButton} onClick={handleClick}>Загрузить данные</button>
            </div>
        </div>
    );
}

export default ETLDisplay;

const CheckBox = ({label, checked, onChange}) => {
    const handleChange = () => onChange();

    return <div className={styles.defaultMargin} style={{marginRight: '1rem'}} onClick={handleChange}>
        <input type="checkbox" id="cb1" checked={checked} readOnly={true}/> <label htmlFor="cb1">{label}</label>
    </div>
}