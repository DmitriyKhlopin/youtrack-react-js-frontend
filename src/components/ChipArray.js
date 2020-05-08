import React from 'react';
import PropTypes from 'prop-types';
import {store} from "../redux/store";
import {addProjectToSelected, removeProjectFromSelected} from "../redux/actions/reportFiltersActions";
import connect from "react-redux/es/connect/connect";

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
                        <button
                            key={data.shortName}
                            onClick={this.handleDelete(data)}
                        >{data.name}</button>
                    );
                })}
                </div>
                <div>
                    {notSelected.map(data => {
                        return (
                            <button
                                key={data.shortName}
                                onClick={this.handleAdd(data)}
                                color="secondary"
                            >{data.name}</button>
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

export default connect(mapStateToProps, null)(ChipsArray);