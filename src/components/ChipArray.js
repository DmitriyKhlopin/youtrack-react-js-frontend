import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import store from "../redux/store";
import {addProjectToSelected, removeProjectFromSelected} from "../redux/actions/reportFiltersActions";
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class ChipsArray extends React.Component {
    handleDelete = data => () => {
        store.dispatch(removeProjectFromSelected(data.shortName));
    };

    handleAdd = data => () => {
        store.dispatch(addProjectToSelected(data.shortName));
    };

    render() {
        const {classes} = this.props;
        const allProjects = this.props.reportFilters.proj;
        const selected = this.props.reportFilters.projSelected;
        const notSelected = allProjects.filter(item => !selected.map(item => item.shortName).includes(item.shortName));
        return (
            <div>
                <div>{selected.map(data => {
                    return (
                        <Chip
                            key={data.shortName}
                            clickable
                            onClick={this.handleDelete(data)}
                            label={data.name}
                            onDelete={this.handleDelete(data)}
                            className={classes.chip}
                            variant="outlined"
                            color="primary"
                        />
                    );
                })}
                </div>
                <div>
                    {notSelected.map(data => {
                        return (
                            <Chip
                                key={data.shortName}
                                clickable
                                label={data.name}
                                onDelete={this.handleAdd(data)}
                                onClick={this.handleAdd(data)}
                                deleteIcon={<DoneIcon/>}
                                className={classes.chip}
                                variant="outlined"
                                color="secondary"
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

ChipsArray.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reportFilters: state.reportFilters
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ChipsArray));