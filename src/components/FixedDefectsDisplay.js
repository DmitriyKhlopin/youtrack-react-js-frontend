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
import * as ReactDOM from "react-dom";
import {
    fetchBuildsByIteration,
    fetchIterations,
    getFixedByIterationAndBuild, sendItemToYouTrack
} from "../redux/actions/fixedDefectsActions";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {LinearProgress} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

class FixedDefectsDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            isLoading: false,
            etlState: null,
            iteration: '',
            build: ''
        }
    }

    componentDidMount() {
        this.setState({
            labelWidth1: ReactDOM.findDOMNode(this.InputLabelRef1).offsetWidth,
            labelWidth2: ReactDOM.findDOMNode(this.InputLabelRef2).offsetWidth,
        });
    }

    componentWillMount() {
        store.dispatch(setSelectedNavItem({title: PAGE_IDS.fixedDefects.name, selectedId: PAGE_IDS.fixedDefects.id}));
        store.dispatch(fetchIterations())
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        if (event.target.name === 'iteration') store.dispatch(fetchBuildsByIteration(this.props.fixedDefectsData.iterations[event.target.value]))
    };

    render() {
        const {classes} = this.props;
        console.log(this.props.fixedDefectsData);
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
                            onClick={() => store.dispatch(getFixedByIterationAndBuild(this.props.fixedDefectsData.iterations[this.state.iteration], this.props.fixedDefectsData.builds[this.state.build]))
                            }>
                        Загрузить
                    </Button>
                </FormControl>
            </div>
            {this.props.fixedDefectsData.fetching ? <LinearProgress/> : <div/>}
            {this.props.fixedDefectsData.items.map((item, index) => (
                <div style={{padding: 16}}>
                    <Card key={index} style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8}}>
                        <Grid container spacing={16}>
                            <Grid item xs={12} sm>
                                <div>
                                    <Typography>
                                        Change request: {item.changeRequestId}
                                    </Typography>
                                    <Typography>
                                        {item.parentType}: {item.parentId}
                                    </Typography>
                                    <Typography>
                                        Title: {item.title}
                                    </Typography>
                                    <Typography>
                                        Description: {item.body}
                                    </Typography>
                                    <Typography>
                                        Area name: {item.areaName}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item alignItems="center"
                                  justify="center">
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Button variant="contained" color="primary" className={classes.button2}
                                            onClick={() => store.dispatch(sendItemToYouTrack(item.changeRequestId))
                                            }>
                                        Опубликовать
                                    </Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Card>
                </div>

            ))}
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
