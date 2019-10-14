import React, {useEffect, useState} from "react";
import store from "../redux/store";
import connect from "react-redux/es/connect/connect";
import {PAGES} from "../Const";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import {fetchPartners} from "../redux/actions/partnersActions";
import {dynamicSort, groupBy} from "../HelperFunctions";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from "@material-ui/core/TextField";
import {styles} from "../Styles";
import styled from 'styled-components';

const ContainerWithSidebar = styled.div`
    display: flex;
    padding: 0;
    margin: 0;
    flex-direction: row; 
    flex-wrap: no-wrap;
    width: 100%;
    justify-content: center;
`;

const FlexContent = styled.div`
    display: flex;
    padding: 0px;
    margin: 0px;
    flex-flow: row wrap;
    justify-content: start;
    height:auto;
`;

const CustomCard = styled.div`
    min-width: calc(100% / 8);
    display: flex;
    flex-direction: column;
    margin: 8px;
    padding: 8px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }
`;

const HoverButton = styled.button`
    width: calc(100% - 16px);
    height: 48px
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 12px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 8px 8px;
    cursor: pointer;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }        
`;

const CustomSidebar = styled.div`
    margin: 8px;
    padding: 0px;
    height: auto;
    boxShadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }    
`;

function PartnersDisplay({location, filters, data}) {
    const {textField, iconButton} = styles;
    const [sidebarWidthOpen, sidebarWidthClosed] = ['100%', '60px'];
    const [selected, setSelected] = useState([]);
    const [priorities, setPriorities] = useState(['Major', 'Normal', 'Minor']);
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState('');
    const [mode, setMode] = useState(false);

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

    const toggleMode = () => setMode(!mode);

    console.log(Object.values(groupedData));
    return (<ContainerWithSidebar>
        <FlexContent style={{width: `calc(100% - ${open ? sidebarWidthOpen : sidebarWidthClosed} - 16px)`, display: open ? '' : 'hidden'}}>
            {mode ? <div style={{margin: '0px', maxHeight: '18px', height: 'auto'}}>Отчёт</div> : <div/>}
            {selected.length > 0 ? <HoverButton onClick={toggleMode}>Сформировать отчёт</HoverButton> : <div/>}
        </FlexContent>
        <CustomSidebar style={{width: open ? sidebarWidthOpen : sidebarWidthClosed}}>
            <IconButton onClick={() => setOpen(!open)} style={iconButton}>
                {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
            <div style={{visibility: open ? 'visible' : 'hidden'}}>
                {open ? <TextField
                    id="standard-name"
                    label="Проект"
                    value={project}
                    onChange={(event) => setProject(event.target.value)}
                    margin="normal"
                    style={{...textField}}
                /> : <div/>}
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

function mapStateToProps(state) {
    return {
        filters: state.reportFilters,
        data: state.partnersData,
    }
}

export default (connect(mapStateToProps, null)(PartnersDisplay))