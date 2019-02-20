import React, {Component} from "react";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import {fetchTimeAccountingData} from "../redux/actions/timeAccountingActions";
import {PAGE_IDS} from "../Const";
import FormControl from "./FixedDefectsDisplay";

//TODO style={classes.content} causes crashes in firefox

class DurationDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper',
            items: []
        }
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    requestData = () => {
        store.dispatch(fetchTimeAccountingData());
    };

    componentDidMount() {
        console.log('CDM');
        store.dispatch(setSelectedNavItem({title: PAGE_IDS.duration.name, selectedId: PAGE_IDS.duration.id}));
        /*store.dispatch(fetchIterations());*/
        /*this.setState({
            labelWidth2: ReactDOM.findDOMNode(this.InputLabelRef2).offsetWidth,
        });*/
    }

    handleChange = event => {
        /*store.dispatch(clearWorkItems());*/
        this.setState({[event.target.name]: event.target.value});
        /*if (event.target.name === 'iteration') store.dispatch(fetchBuildsByIteration(this.props.fixedDefectsData.iterations[event.target.value]));*/
        console.log(event.target.value);
    };

    render() {
        const {classes} = this.props;
        /*const items = this.props.timeAccountingData.timeData;*/
        console.log(this.props.reportFilters);
        return <div style={{minWidth: '100%'}}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>


                <FormControl variant="outlined" className={classes.formControl}>
                    <Button variant="contained" color="primary" className={classes.button2}
                            onClick={() => {
                                /*store.dispatch(getFixedByIterationAndBuild(this.props.fixedDefectsData.iterations[this.state.iteration], this.state.build));
                                store.dispatch(clearWorkItems());*/
                            }
                            }>
                        Загрузить
                    </Button>
                </FormControl>
            </div>
        </div>;
    }
}

DurationDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        timeAccountingData: state.timeAccountingData,
        reportFilters: state.reportFilters
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(DurationDisplay));
