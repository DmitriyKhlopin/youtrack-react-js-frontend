import React, {useState} from "react";

export function Sidebar({}) {
    const defaultPriorities = ['High', 'Normal', 'Low'];
    const [priorities, setPriorities] = useState(defaultPriorities);

    function handleChange(event) {
        setPriorities(event.target.value);
    }

    return (<div>
        Восстановить select
        {/*
            <InputLabel htmlFor="select-multiple">Приоритеты</InputLabel>
            <Select
                multiple
                value={priorities}
                onChange={handleChange}
                input={<Input id="select-multiple"/>}
                MenuProps={MenuProps}
            >
                {defaultPriorities.map(priority => (
                    <MenuItem key={priority} value={priority} style={getStyles(priority, priorities, theme)}>
                        {priority}
                    </MenuItem>
                ))}
            </Select>
*/}

    </div>)
}
