import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import {innerProjects, licProjects} from "../Const";
import store from "../redux/store";
import {addProjectToSelected, removeProjectFromSelected} from "../redux/actions/filtersActions";
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit / 2,
    },
});


class ChipsArray extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            selectedChipData: [],
            removedChipData: [],
            currentMode: "NONE"
        };
    }*/

    /*componentWillMount() {
        this.setState({selectedChipData: this.props.projects.filter(item => this.props.selectedProjects.includes(item.shortName))});
        this.setState({removedChipData: this.props.projects.filter(item => !this.props.selectedProjects.includes(item.shortName))})
    }*/

    handleDelete = data => () => {
        console.log(data);
        store.dispatch(removeProjectFromSelected(data.shortName));
        /*if (data.label === 'React') {
            alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
            return;
        }

        this.setState(state => {
            const selectedChipData = [...state.selectedChipData];
            const removedChipData = [...state.removedChipData];
            const chipToDelete = selectedChipData.indexOf(data);
            selectedChipData.splice(chipToDelete, 1);
            removedChipData.push(data);
            this.onProjectsChanged(selectedChipData);
            return {selectedChipData: selectedChipData, removedChipData: removedChipData};
        });*/
    };

    handleAdd = data => () => {
        console.log(data);
        store.dispatch(addProjectToSelected(data.shortName));
        /*if (data.label === 'React') {
            alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
            return;
        }

        function compare(a, b) {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        }

        this.setState(state => {
            const selectedChipData = [...state.selectedChipData];
            const removedChipData = [...state.removedChipData];
            const chipToAdd = removedChipData.indexOf(data);
            removedChipData.splice(chipToAdd, 1);
            selectedChipData.push(data);
            selectedChipData.sort(compare);
            this.onProjectsChanged(selectedChipData);
            return {selectedChipData: selectedChipData, removedChipData: removedChipData};
        });*/
    };

    /*onProjectsChanged(data) {
        this.props.onProjectsChanged(data);
    };

    componentDidUpdate(prevProps, a, asd) {
        if (this.props.currentMode !== prevProps.currentMode) {
            this.setState({currentMode: this.props.currentMode});
            const mode = this.props.currentMode;
            console.log(mode);
            if (mode === "PP") {
                const selected = this.props.projects.filter(item => !innerProjects.includes(item.shortName));
                this.setState({
                    selectedChipData: selected,
                    removedChipData: this.props.projects.filter(item => innerProjects.includes(item.shortName))
                });
                this.onProjectsChanged(selected);
            }
            if (mode === "notPP") {
                const selected = this.props.projects.filter(item => innerProjects.includes(item.shortName));
                this.setState({
                    selectedChipData: selected,
                    removedChipData: this.props.projects.filter(item => !innerProjects.includes(item.shortName))
                });
                this.onProjectsChanged(selected);
            }
            if (mode === "LIC") {
                const selected = this.props.projects.filter(item => licProjects.includes(item.shortName));
                this.setState({
                    selectedChipData: selected,
                    removedChipData: this.props.projects.filter(item => !licProjects.includes(item.shortName))
                });
                this.onProjectsChanged(selected);
            }
            if (mode === "ALL") {
                const selected = this.props.projects;
                this.setState({
                    selectedChipData: selected,
                    removedChipData: []
                });
                this.onProjectsChanged(selected);
            }
            if (mode === "NONE") {
                const selected = this.props.projects;
                this.setState({
                    selectedChipData: [],
                    removedChipData: this.props.projects
                });
                this.onProjectsChanged(selected);
            }
        }
        if (this.props.projects !== prevProps.projects) {
            const mode = this.state.currentMode;

            console.log(mode);
            if (mode === "PP") {
                const selected = this.props.projects.filter(item => !innerProjects.includes(item.shortName));
                this.setState({
                    selectedChipData: selected,
                    removedChipData: this.props.projects.filter(item => innerProjects.includes(item.shortName))
                });
                this.onProjectsChanged(selected);
            }
            if (mode === "notPP") {
                const selected = this.props.projects.filter(item => innerProjects.includes(item.shortName));
                this.setState({
                    selectedChipData: selected,
                    removedChipData: this.props.projects.filter(item => !innerProjects.includes(item.shortName))
                });
                this.onProjectsChanged(selected);
            }
            if (mode === "LIC") {
                const selected = this.props.projects.filter(item => licProjects.includes(item.shortName));
                this.setState({
                    selectedChipData: selected,
                    removedChipData: this.props.projects.filter(item => !licProjects.includes(item.shortName))
                });
                this.onProjectsChanged(selected);
            }
            if (mode === "ALL") {
                const selected = this.props.projects;
                this.setState({
                    selectedChipData: selected,
                    removedChipData: []
                });
                this.onProjectsChanged(selected);
            }
            if (mode === "NONE") {
                const selected = this.props.projects;
                this.setState({
                    selectedChipData: [],
                    removedChipData: this.props.projects
                });
                this.onProjectsChanged(selected);
            }
        }
    }*/

    render() {
        const {classes} = this.props;
        const allProjects = this.props.filters.proj;
        const selected = this.props.filters.projSelected;
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

/*export default withStyles(styles)(ChipsArray);*/
function mapStateToProps(state) {
    return {
        filters: state.filters
    }
}

/*export default withStyles(styles)(ReportFilterDialog);*/
export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ChipsArray));
