import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import store from "../redux/store";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import * as PropTypes from "prop-types";
import {styles} from "../Styles";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import {PAGE_IDS} from "../Const";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {
    clearWorkItems,
    fetchBuildsByIteration,
    fetchIterations,
    getFixedByIterationAndBuild
} from "../redux/actions/fixedDefectsActions";
import {LinearProgress} from "@material-ui/core";
import * as ReactDOM from "react-dom";
import DefectItem from "./DefectItem";

class FixedDefectsDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            isLoading: false,
            etlState: null,
            iteration: '',
            build: []
        }
    }


    componentDidMount() {
        console.log('CDM');
        store.dispatch(setSelectedNavItem({title: PAGE_IDS.fixedDefects.name, selectedId: PAGE_IDS.fixedDefects.id}));
        store.dispatch(fetchIterations());
        this.setState({
            labelWidth1: ReactDOM.findDOMNode(this.InputLabelRef1).offsetWidth,
            labelWidth2: ReactDOM.findDOMNode(this.InputLabelRef2).offsetWidth,
        });
    }

    handleChange = event => {
        store.dispatch(clearWorkItems());
        this.setState({[event.target.name]: event.target.value});
        if (event.target.name === 'iteration') store.dispatch(fetchBuildsByIteration(this.props.fixedDefectsData.iterations[event.target.value]));
        console.log(event.target.value);
    };

    render() {
        const {classes} = this.props;
        return <div style={{minWidth: '100%'}}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef1 = ref;
                        }}
                        htmlFor="outlined-iteration-simple"
                    >
                        Iteration
                    </InputLabel>
                    <Select
                        value={this.state.iteration}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth1}
                                name="iteration"
                                id="outlined-iteration-simple"
                            />
                        }
                    >
                        {this.props.fixedDefectsData.iterations.length === 0 ? <MenuItem value="">
                            <em>WTF???</em>
                        </MenuItem> : <MenuItem value="">
                            <em>Select iteration</em>
                        </MenuItem>}
                        {this.props.fixedDefectsData.iterations.map((item, index) => (
                            <MenuItem value={index}>{item}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef2 = ref;
                        }}
                        htmlFor="outlined-build-simple"
                    >
                        Build
                    </InputLabel>
                    <Select
                        value={this.state.build}
                        onChange={this.handleChange}
                        multiple={true}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth2}
                                name="build"
                                id="outlined-build-simple"
                            />
                        }
                    >
                        {<MenuItem value="">
                            <em>Select iteration</em>
                        </MenuItem>}
                        {this.props.fixedDefectsData.builds.map((item, index) => (
                            <MenuItem value={index}>{item}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Button variant="contained" color="primary" className={classes.button2}
                            onClick={() => {
                                store.dispatch(getFixedByIterationAndBuild(this.props.fixedDefectsData.iterations[this.state.iteration], this.state.build));
                                store.dispatch(clearWorkItems());
                            }
                            }>
                        Загрузить
                    </Button>
                </FormControl>
            </div>
            {this.props.fixedDefectsData.fetching ? <LinearProgress/> : <div/>}
            {this.props.fixedDefectsData.items.map((item, index) => (<DefectItem key={`di-${index}`} defect={item}/>))}
        </div>;
    }
}

FixedDefectsDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        fixedDefectsData: state.fixedDefectsData,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(FixedDefectsDisplay));
