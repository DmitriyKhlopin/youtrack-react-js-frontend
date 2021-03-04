import React, {useState} from "react";
import styles from "../../styles/components.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchTimelineDataById, selectTimelineCheckData} from "../../redux/combined/timelineCheck";
import {format} from "date-fns";
import cx from "classnames";

function TimelineCheck() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const data = useSelector(selectTimelineCheckData);

    const handleClick = (event) => {
        console.log(text);
        event.preventDefault();
        dispatch(fetchTimelineDataById(text));
    }
    const handleChange = (event) => {
        setText(event.target.value);
    }
    console.log(data);

    return (<div>
        <form className={styles.mediumMargin}>
            <label>
                Номер задачи:
                <input type="text" name="name" value={text} onChange={handleChange}/>
            </label>
            <input type="submit" value="Показать" onClick={handleClick}/>
        </form>
        {data.map((e) => renderElement(e))}
    </div>)
}


export default TimelineCheck


function renderElement(element) {
    return (<div className={cx(styles.column, styles.card, styles.defaultMargin)}>
        <div className={styles.row}>
            <div className={styles.defaultMargin}>Переход {element.order + 1} - {(element.timeSpent / 60).toFixed(0)} м.</div>
        </div>
        <div className={styles.row}>
            <div className={styles.defaultMargin}>{format(element.dateFrom, "yyyy-MM-dd HH:mm:ss")}</div>
            <div className={styles.defaultMargin}>{element.stateOld}</div>

        </div>
        <div className={styles.row}>
            <div className={styles.defaultMargin}>{format(element.dateTo, "yyyy-MM-dd HH:mm:ss")}</div>
            <div className={styles.defaultMargin}>{element.stateNew}</div>
        </div>
    </div>)
}
