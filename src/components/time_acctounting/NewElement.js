import React, {useState} from "react";
import DatePicker from "react-datepicker";
import styles from "../../styles/components.module.css";
import inputStyles from "../../styles/textinput.module.css";
import {format} from 'date-fns'
import {useDispatch} from "react-redux";
import {postTimeAccountingDictionaryItem} from "../../redux/actions/timeAccountingActions";
import cx from "classnames";


const defaultStyle = {
    width: '100%',
    border: '1px solid rgba(0,0,0,0.1)',
    background: '#fff',
    padding: '5px 7px',
    margin: '8px',
    fontSize: 'inherit',
    borderRadius: '3px',
    fontWeight: 'normal',
    outlineWidth: 0
};

export function NewElement() {
    const [project, setProject] = useState('');
    const [customer, setCustomer] = useState('');
    const [ets, setEts] = useState('');
    const [iteration, setIteration] = useState('');
    const [df, setDf] = useState(null);
    const [dt, setDt] = useState(null);
    const dispatch = useDispatch();

    const postData = () => {
        const data = {
            projectShortName: project,
            customer: customer,
            projectEts: ets,
            iterationPath: iteration,
            dateFrom: format(df, 'yyyy-MM-dd'),
            dateTo: format(dt, 'yyyy-MM-dd')
        };
        dispatch(postTimeAccountingDictionaryItem(data));
    };

    return (
        <div className={cx(styles.column, styles.styledContainer)}>
            <span className={styles.title} style={{marginTop: '0.5rem', padding: '0.5rem'}}>Новая запись</span>
            <div className={cx(styles.row, styles.centered)} style={{alignItems: 'stretch', justifyContent: 'space-between', marginTop: '0.5rem', padding: '0.25rem'}}>
                <TextInput value={project} label={'Проект'} onChange={(e) => setProject(e.target.value)} style={defaultStyle}/>
                <TextInput value={customer} label={'Заказчик'} onChange={(e) => setCustomer(e.target.value)} style={defaultStyle}/>
                <TextInput value={ets} label={'Проект ETS'} onChange={(e) => setEts(e.target.value)} style={defaultStyle}/>
                <TextInput value={iteration} label={'Этап'} onChange={(e) => setIteration(e.target.value)} style={defaultStyle}/>
                <DateInput value={df} label={'Дата начала'} onChange={date => setDf(date)}/>
                <DateInput value={dt} label={'Дата окончания'} onChange={date => setDt(date)}/>
                <button className={styles.textButton} onClick={postData} disabled={isEmpty(project) || isEmpty(customer) || isEmpty(ets) || isEmpty(iteration)}>Save</button>
            </div>
        </div>
    )
}

function TextInput({onChange, value, label}) {
    return (<div className={`${styles.column} ${styles.defaultMargin}`}>
            {label && <label>{label}</label>}
            <input type="text" required value={value} onChange={onChange}/>
            <span className={inputStyles.bar}/>
        </div>
    );
}

function isEmpty(value) {

    return !(value && value.length > 0)
}

function DateInput({onChange, value, label}) {
    return (<div className={`${styles.column} ${styles.defaultMargin}`}>
            {label && <label>{label}</label>}
            <DatePicker selected={value} onChange={onChange}/>
            <span className={inputStyles.bar}/>
        </div>
    );
}