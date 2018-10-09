import React, {Component} from "react";

import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import FormControl from "../../node_modules/@material-ui/core/FormControl/FormControl";
import InputLabel from "../../node_modules/@material-ui/core/InputLabel/InputLabel";
import Select from "../../node_modules/@material-ui/core/Select/Select";
import Input from "../../node_modules/@material-ui/core/Input/Input";
import MenuItem from "../../node_modules/@material-ui/core/MenuItem/MenuItem";
import Chip from "../../node_modules/@material-ui/core/Chip/Chip";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});


const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

class ChipSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: [],
        };
    }

    handleChange = event => {
        this.setState({name: event.target.value});
    };


    render() {
        const {classes, theme} = this.props;
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
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
                <Select
                    multiple
                    value={this.state.name}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-chip"/>}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map(name => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={{
                                fontWeight:
                                    this.state.name.indexOf(name) === -1
                                        ? theme.typography.fontWeightRegular
                                        : theme.typography.fontWeightMedium,
                            }}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

ChipSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ChipSelector);