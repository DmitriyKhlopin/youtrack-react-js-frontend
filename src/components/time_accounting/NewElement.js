import React, {useState} from "react";
import DatePicker from "react-datepicker";
import styles from "../../styles/components.module.css";
import inputStyles from "../../styles/textinput.module.css";
import {format} from 'date-fns'
import {useDispatch} from "react-redux";
import cx from "classnames";
import {postTimeAccountingDictionaryItem} from "../../redux/combined/timeAccountingDictionary";

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
            <div className={cx(styles.row, styles.centered, styles.wrap)}>
                <TextInput value={project} label={'Проект'} onChange={(e) => setProject(e.target.value)}/>
                <TextInput value={customer} label={'Заказчик'} onChange={(e) => setCustomer(e.target.value)}/>
                <TextInput value={ets} label={'Проект ETS'} onChange={(e) => setEts(e.target.value)}/>
                <TextInput value={iteration} label={'Этап'} onChange={(e) => setIteration(e.target.value)}/>
                <DateInput value={df} label={'Дата начала'} placeholderText={'Дата начала'} onChange={date => setDf(date)}/>
                <DateInput value={dt} label={'Дата окончания'} placeholderText={'Дата окончания'} onChange={date => setDt(date)}/>
                <button className={styles.textButton} onClick={postData} disabled={isEmpty(project) || isEmpty(customer) || isEmpty(ets) || df === null || dt === null}>Save</button>
            </div>
        </div>
    )
}

function TextInput({onChange, value, label}) {
    return (<div className={cx(inputStyles.inputWrapper, styles.defaultMargin)} style={{width: '15%'}}>
            {label && <label>{label}</label>}
            <input type="text" required value={value} onChange={onChange}/>
            <span className={inputStyles.bar}/>
        </div>
    );
}

function isEmpty(value) {
    return !(value && value.length > 0)
}

function DateInput({onChange, value, label, placeholderText}) {
    const ExampleCustomInput = ({value, onClick}) => (
        <div className={cx(inputStyles.inputWrapper)} onClick={onClick}>
            <input type="text" required value={value}/>
            <span className={inputStyles.bar}/>
        </div>
    );

    return (<div className={cx(inputStyles.inputWrapper, styles.defaultMargin)} style={{width: '15%'}}>
            {label && <label>{label}</label>}
            <DatePicker selected={value} onChange={onChange} placeholderText={placeholderText} customInput={<ExampleCustomInput/>}/>
            <span className={inputStyles.bar}/>
        </div>
    );
}