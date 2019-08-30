import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(current, selected, theme) {
    return {
        fontWeight:
            selected.indexOf(current) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

export function Sidebar({}) {
    const classes = useStyles();
    const theme = useTheme();

    const defaultPriorities = ['High', 'Normal', 'Low'];
    const [priorities, setPriorities] = useState(defaultPriorities);

    function handleChange(event) {
        setPriorities(event.target.value);
    }

    return (<div>
        <FormControl className={classes.formControl}>
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
        </FormControl></div>)
}
