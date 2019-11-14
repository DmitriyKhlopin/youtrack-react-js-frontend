import React, {useEffect, useState} from "react";
import {store} from "../../redux/store";
import connect from "react-redux/es/connect/connect";
import {drawerWidth, PAGES} from "../../Const";
import {setSelectedNavItem} from "../../redux/actions/appBarActions";
import {fetchPartners} from "../../redux/actions/partnersActions";
import {dynamicSort, groupBy} from "../../HelperFunctions";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/Settings';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from "@material-ui/core/TextField";
import {styles} from "../../Styles";
import Report from "./Report";
import useWindowDimensions from "../../helper_functions/dimensions";
import {fetchAbstractReportData} from "../../redux/actions/abstractReportsActions";
import {ContainerWithSidebar, CustomCard, CustomSidebar, FlexContent, HoverButton, HoverButtonSmall} from "../../styles/StyledComponents";


function PartnersDisplay({location, filters, data, appBarState, loadData, reportData}) {
    const {textField, iconButton} = styles;
    const [sidebarWidthOpen, sidebarWidthClosed] = ['100%', '64px'];
    const [selected, setSelected] = useState([]);
    const [priorities, setPriorities] = useState(['Major', 'Normal', 'Minor']);
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState('');
    const [mode, setMode] = useState(false);
    const size = useWindowDimensions();

    useEffect(() => {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        store.dispatch(fetchPartners());
    }, []);

    const groupedData = groupBy(data.data, 'partnerName');

    const onChange = (e, item) => {
        const index = selected.findIndex(a => a.project === item.projectId && a.ets === item.etsProject && a.customer === item.customerName);
        let j = selected.slice();
        if (index !== -1) j.splice(index, 1); else j.push({project: item.projectId, ets: item.etsProject, customer: item.customerName});
        setSelected(j);
    };

    const toggleMode = () => {
        if (!mode) loadData('state', selected);
        if (!mode) loadData('type', selected);
        if (!mode) loadData('priority', selected);
        if (!mode) loadData('customer', selected);
        if (!mode) loadData('product', selected);
        setMode(!mode);
    };

    const selectCurrent = () => {
        let j = selected.slice();

        data.data.filter((pr) => pr['customerName'].toLowerCase().includes(project.toLowerCase()))
            .forEach((item) => {
                const index = j.findIndex(a => a.project === item.projectId && a.ets === item.etsProject && a.customer === item.customerName);
                if (index === -1) {
                    j.push({project: item.projectId, ets: item.etsProject, customer: item.customerName})
                }
            });
        console.log(j);
        setSelected([...new Set(j)]);
    };

    const clearSelection = () => setSelected([]);
    const w = size.width - (appBarState ? drawerWidth : 0) - 64 - 17 - 16; //ширина окна - ширина боковика - ширина меню - вертикальный сролл - margin меню
    const indicators = ['state', 'type', 'priority', 'customer', 'product'];
    return (<ContainerWithSidebar>
        <FlexContent style={{width: `calc(100% - ${open ? sidebarWidthOpen : sidebarWidthClosed} - 16px)`, display: open ? '' : 'hidden'}}>
            {mode && !open ?
                <FlexContent>
                    {indicators.map((item, index) => <Report key={`report-${item}-${index}`}
                                                             w={w}
                                                             itemsInRow={(indicators.length - 1 - 3 * ~~(index / 3)) < 3 ? indicators.length % 3 : 3}
                                                             data={reportData} indicator={item}/>)}
                </FlexContent>
                : <div/>}
            {!open && selected.length > 0 ? <HoverButton onClick={toggleMode}>Сформировать отчёт</HoverButton> : <div/>}
        </FlexContent>
        <CustomSidebar style={{width: open ? sidebarWidthOpen : sidebarWidthClosed, height: open ? 'auto' : '64px', borderRadius: open ? '4px' : '32px'}}>
            <IconButton onClick={() => setOpen(!open)} style={{...iconButton, color: '#C2185B'}}>
                {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
            <div style={{visibility: open ? 'visible' : 'hidden'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {open ? <TextField
                        id="standard-name"
                        label="Проект"
                        value={project}
                        onChange={(event) => setProject(event.target.value)}
                        margin="normal"
                        style={{...textField}}
                    /> : <div/>}
                    {open ? <HoverButtonSmall onClick={selectCurrent} style={{backgroundColor: '#4CAF50'}}>Отметить</HoverButtonSmall> : <div/>}
                    {open && (selected.length > 0) ? <HoverButtonSmall onClick={clearSelection} style={{backgroundColor: '#4CAF50'}}>Снять отметку ({selected.length})</HoverButtonSmall> : <div/>}
                </div>

                <FlexContent>
                    {open && Object.values(groupedData)
                        .filter((pr) => project === '' || pr.filter((e2) => e2['customerName'].toLowerCase().includes(project.toLowerCase())).length > 0)
                        .map((item, index) =>
                            <CustomCard key={`partner-${index}`}>
                                <div style={{textAlign: 'center'}}>{item.find(Boolean)['partnerName']}</div>
                                <div>{item.sort(dynamicSort('-issuesCount'))
                                    .filter((e) => project === '' || e['customerName'].toLowerCase().includes(project.toLowerCase()))
                                    .map((item2, index2) => {
                                            return <div key={`customer-${index2}`} style={{background: item2.important ? 'red' : 'transparent'}}>
                                                <label className="container">
                                                    <input type="checkbox"
                                                           checked={selected.some(e => e.project === item2.projectId && e.ets === item2.etsProject && e.customer === item2.customerName)}
                                                           onChange={(e) => onChange(e, item2)}/>

                                                </label>
                                                {`${item2['etsProject']} ${item2['customerName']} ${item2['issuesCount']}`}
                                            </div>
                                        }
                                    )}
                                </div>
                            </CustomCard>)}
                </FlexContent>
            </div>
        </CustomSidebar>
    </ContainerWithSidebar>);
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: (id, filters) => dispatch(fetchAbstractReportData(id, filters))
    }
}

function mapStateToProps(state) {
    return {
        filters: state.reportFilters,
        data: state.partnersData,
        appBarState: state.appBarState.drawerOpened,
        reportData: state.abstractReportData,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(PartnersDisplay))