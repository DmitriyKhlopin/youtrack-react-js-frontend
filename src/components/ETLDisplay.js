import React, {useState} from "react";
import styles from "../styles/components.module.css";
import DatePicker from "react-datepicker";
import {useDispatch} from "react-redux";
import cx from "classnames";
import {fetchETL} from "../redux/actions/etlFilterActions";
import {format} from "date-fns";

function ETLDisplay() {
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
                workItemsChecked ? 'work' : null,
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

    console.log(created);
    return (
        <div className={styles.column}>
            <div className={cx(styles.row, styles.centered, styles.defaultMargin, styles.defaultPadding)}>
                Обработать информацию по задачам, которые были
                <CheckBox id={'created'} checked={created} onChange={() => setCreated(!created)} label={'созданы'}/> либо
                <CheckBox id={'updated'} checked={!created} onChange={() => setCreated(!created)} label={'изменены'}/> с
                <div className={styles.defaultMargin}>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        customInput={<ExampleCustomInput/>}
                    />
                </div>
                по
                <div className={styles.defaultMargin}>
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        customInput={<ExampleCustomInput/>}
                    />
                </div>
            </div>
            <div className={cx(styles.row, styles.centered, styles.defaultMargin, styles.defaultPadding, styles.wrap)}>
                <CheckBox id={'issuesChecked'} checked={issuesChecked} onChange={() => setIssuesChecked(!issuesChecked)} label={'Заявки (текущие значения всех полей)'}/>
                <CheckBox id={'workItemsChecked'} checked={workItemsChecked} onChange={() => setWorkItemsChecked(!workItemsChecked)} label={'Трудозатраты'}/>
                <CheckBox id={'historyChecked'} checked={historyChecked} onChange={() => setHistoryChecked(!historyChecked)} label={'История'}/>
                <CheckBox id={'bundlesChecked'} checked={bundlesChecked} onChange={() => setBundlesChecked(!bundlesChecked)} label={'Bundles'}/>
                <CheckBox id={'projectsChecked'} checked={projectsChecked} onChange={() => setProjectsChecked(!projectsChecked)} label={'Проекты'}/>
                <CheckBox id={'usersChecked'} checked={usersChecked} onChange={() => setUsersChecked(!usersChecked)} label={'Пользователи'}/>
                <CheckBox id={'timelineChecked'} checked={timelineChecked} onChange={() => setTimelineChecked(!timelineChecked)} label={'Вычисление периодов'}/>
                <CheckBox id={'periodTimelineChecked'} checked={periodTimelineChecked} onChange={() => setPeriodTimelineChecked(!periodTimelineChecked)} label={'Вычисление периодов за всё время'}/>
                <CheckBox id={'deletedChecked'} checked={deletedChecked} onChange={() => setDeletedChecked(!deletedChecked)} label={'Поиск удалённых задач'}/>
                <CheckBox id={'pendingChecked'} checked={pendingChecked} onChange={() => setPendingChecked(!pendingChecked)} label={'Поиск ожидающих задач'}/>
            </div>
            <div className={cx(styles.row, styles.centered, styles.defaultMargin, styles.defaultPadding)}>
                <button className={styles.textButton} onClick={handleClick}>Загрузить данные</button>
            </div>
        </div>
    );
}

export default ETLDisplay;

const CheckBox = ({id, label, checked, onChange}) => {
    return <div className={styles.defaultMargin}>
        <input type="checkbox" id={`cb-${id}`} onChange={onChange.bind(this)} checked={checked} defaultChecked={checked}/> <label htmlFor={`cb-${id}`}>{label}</label>
    </div>
}

const Radio = ({current, values, setValue}) => (
    <div onChange={setValue.bind(this)}>
        {values && values.map((e) => <><input type="radio" value={e} name={'t'} defaultChecked={current === e}/>{e}</>)}
    </div>
);

const ExampleCustomInput = ({value, onClick}) => (
    <button className={styles.textButton} onClick={onClick}>
        {value}
    </button>
);