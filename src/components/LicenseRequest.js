import React, {Component} from "react";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import connect from "react-redux/es/connect/connect";
import FormControl from "../../node_modules/@material-ui/core/FormControl/FormControl";
import FormLabel from "../../node_modules/@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "../../node_modules/@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "../../node_modules/@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "../../node_modules/@material-ui/core/Radio/Radio";
import FormGroup from "../../node_modules/@material-ui/core/FormGroup/FormGroup";
import InputLabel from "../../node_modules/@material-ui/core/InputLabel/InputLabel";
import Input from "../../node_modules/@material-ui/core/Input/Input";
import Checkbox from "../../node_modules/@material-ui/core/Checkbox/Checkbox";
import {setProductVersion} from "../redux/actions/licenseRequestActions";
import {PAGES} from "../Const";

const units = [{
    name: 'Prognoz Platform Server',
    limited: true,
    count: 0,
    availableFor: ['9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
},
    {
        name: 'Prognoz Platform',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам']
    },
    {name: 'DashboardViewer', limited: true, count: 0, availableFor: ['9.0 по прайсу']},
    {name: 'DashboardEditor', limited: true, count: 0, availableFor: ['9.0 по прайсу']},
    {name: 'ReportViewer', limited: true, count: 0, availableFor: ['9.0 по прайсу']},
    {name: 'ReportEditor', limited: true, count: 0, availableFor: ['9.0 по прайсу']},
    {
        name: 'Dashboards',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Reports',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Statistic and data mining',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'OLAP',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Time series analysis',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Predictive modeling and data mining',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Microsoft Office add-in',
        limited: true,
        count: 0,
        availableFor: ['9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'MS Excel add-in',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам']
    },
    {
        name: 'MS Word add-in',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам']
    },
    {
        name: 'MS PowerPoint add-in',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам']
    },
    {
        name: 'Data warehouse designer',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Administration',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Developer tools',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {name: 'АК Прогноз 5.26', limited: true, count: 0, availableFor: ['5.26']}];


class LicenseRequest extends Component {
    state = {
        type: 'Сетевая',
        duration: 'Постоянная',
    };

    componentWillMount() {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
    }

    render() {
        const {classes} = this.props;
        console.log(this.state);
        return <div>
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Продукт</FormLabel>
                    <RadioGroup row
                                aria-label="Продукт"
                                name="gender1"
                                className={classes.group}
                                value={this.props.licenseRequestState.selectedProduct}
                                onChange={event => store.dispatch(setProductVersion(event.target.value))}
                    >
                        {this.props.licenseRequestState.products.map((item, index) => (
                            <FormControlLabel key={index} value={item} control={<Radio/>} label={item}/>
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Тип лицензии</FormLabel>
                    <RadioGroup row
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                value={this.state.type}

                    >
                        <FormControlLabel value="Сетевая" control={<Radio/>} label="Сетевая"/>
                        <FormControlLabel value="Автономная" control={<Radio/>} label="Автономная"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Тип лицензии</FormLabel>
                    <RadioGroup row
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                value={this.state.duration}

                    >
                        <FormControlLabel value="Постоянная" control={<Radio/>} label="Постоянная"/>
                        <FormControlLabel value="От даты до даты" control={<Radio/>} label="От даты до даты"/>
                        <FormControlLabel value="Триал" control={<Radio/>} label="Триал"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormGroup className={classes.formControl}>
                    {units.filter(item => item.availableFor.includes(this.props.licenseRequestState.selectedProduct)).map((item, index) => (
                        <div>
                            <FormControl className={classes.group}>
                                <InputLabel htmlFor="component-simple">{item.name}</InputLabel>
                                <Input id="component-simple" type='number'/>
                            </FormControl>
                            <FormControlLabel style={{margin: 8}}
                                              label='Без ограничений'
                                              control={<Checkbox
                                                  key={index}
                                                  checked={item.limited}
                                                  onChange={() => console.log(item.name)}
                                                  value={item.name}
                                                  color="primary"
                                              />}
                            />
                        </div>
                    ))}
                </FormGroup>
            </div>
        </div>
    }
}

LicenseRequest.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        licenseRequestState: state.licenseRequestState
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(LicenseRequest));
