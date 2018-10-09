import React, {Component} from "react";
import TextField from "../../node_modules/@material-ui/core/TextField/TextField";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing.unit,

    },
});

class DateSelector extends Component {
    constructor(props) {
        super(props);
    }

    onDateChanged(){}

    render() {
        const {classes} = this.props;
        const title = this.props.title;
        return (
            <TextField
                variant="outlined"
                id="date"
                label={title}
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
            />
        );
    }
}

DateSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateSelector);