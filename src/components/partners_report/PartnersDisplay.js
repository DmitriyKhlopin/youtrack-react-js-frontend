import React, {useEffect, useState} from "react";
import connect from "react-redux/es/connect/connect";
import {drawerWidth} from "../../Const";
import {fetchPartners} from "../../redux/actions/partnersActions";
import {groupBy} from "../../HelperFunctions";
import Report from "./Report";
import useWindowDimensions from "../../helper_functions/dimensions";
import {fetchAbstractReportData} from "../../redux/actions/abstractReportsActions";
import {ContainerWithSidebar, CustomCard, CustomSidebar, FlexContent, HoverButton, HoverButtonSmall} from "../../styled_components/StyledComponents";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import {clearPartnersAndProjects, setSelectedPartnersAndProjects, toggleSelectedPartnerAndProject} from "../../redux/actions/reportFiltersActions";
import {dynamicSort} from "../../helper_functions/sorting";

const pxToMm = (px) => {
    return Math.floor(px / document.getElementById('myMm').offsetHeight);
};

const mmToPx = (mm) => {
    return document.getElementById('myMm').offsetHeight * mm;
};

const range = (start, end) => {
    return Array(end - start).join(0).split(0).map(function (val, id) {
        return id + start
    });
};

function PartnersDisplay({location, filters, data, appBarState, reportData, setTitle, fetchPartners, loadData, toggleSinglePartnerAndProject, selectMultiplePartnersAndProjects, clearSelection}) {
    const [sidebarWidthOpen, sidebarWidthClosed] = ['100%', '64px'];
    const [priorities, setPriorities] = useState(['Major', 'Normal', 'Minor']);
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState('');
    const [mode, setMode] = useState(false);
    const size = useWindowDimensions();

    useEffect(() => {
        fetchPartners();
    }, []);

    const groupedData = groupBy(data.data, 'partnerName');

    const getData = () => {
        if (!mode) loadData('state', filters.selectedPartners);
        if (!mode) loadData('type', filters.selectedPartners);
        if (!mode) loadData('priority', filters.selectedPartners);
        if (!mode) loadData('customer', filters.selectedPartners);
        if (!mode) loadData('product', filters.selectedPartners);
        setMode(!mode);
    };

    const exp = () => {
        const input = document.getElementById('exportable-report');
        const inputHeightMm = pxToMm(input.offsetHeight);
        const inputWidthMm = pxToMm(input.offsetWidth);
        const a4PortraitWidthMm = 210;
        const a4PortraitHeightMm = 297;
        const a4HeightPx = mmToPx(a4PortraitHeightMm);
        const proportions = inputWidthMm / inputHeightMm;
        const actualHeight = a4PortraitHeightMm / proportions > a4PortraitWidthMm ? a4PortraitWidthMm : a4PortraitHeightMm / proportions;
        const numPages = inputHeightMm <= a4PortraitHeightMm ? 1 : Math.floor(inputHeightMm / a4PortraitHeightMm) + 1;
        console.log({
            input,
            proportions,
            inputHeightMm,
            inputWidthMm,
            a4HeightMm: a4PortraitHeightMm,
            a4HeightPx,
            numPages,
            range: range(0, numPages),
            comp: inputHeightMm <= a4PortraitHeightMm,
            inputHeightPx: input.offsetHeight
        });

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png', 1.0);
                const pdf = new jsPDF('l', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 0, (a4PortraitWidthMm - actualHeight) / 2, a4PortraitHeightMm, actualHeight);
                pdf.save("download.pdf");
            });
    };


    const w = size.width - (appBarState ? drawerWidth : 0) - 64 - 17 - 16; //ширина окна - ширина боковика - ширина меню - вертикальный сролл - margin меню
    const indicators = ['state', 'type', 'priority', 'customer', 'product'];
    const rowSize = 3;

    function indicatorsInRow(indicatorsCount, index) {
        return (indicatorsCount - 1 - rowSize * ~~(index / rowSize)) < rowSize ? indicatorsCount % rowSize : rowSize;
    }

    function indicatorIndexInRow(index, rowSize, baseRowSize) {
        return index - baseRowSize * ~~(index / baseRowSize) + 1;
    }

    return (<ContainerWithSidebar>
        <div id="myMm" style={{height: "1mm"}}/>
        <FlexContent style={{
            width: `calc(100% - ${open ? sidebarWidthOpen : sidebarWidthClosed} - 16px)`,
            display: open ? '' : 'hidden'
        }}>
            {mode && !open ?
                <FlexContent id={'exportable-report'}>
                    {indicators.map((item, index) => <Report key={`report-${item}-${index}`}
                                                             w={w}
                                                             rowSize={rowSize}
                                                             itemsInRow={indicatorsInRow(indicators.length, index)}
                                                             indexInRow={indicatorIndexInRow(index, indicatorsInRow(indicators.length, index), rowSize)}
                                                             data={reportData} indicator={item}/>)}
                    {<div>test</div>}
                </FlexContent>
                : <div/>}
            {!open && filters.selectedPartners.length > 0 ?
                <div>
                    <HoverButton onClick={getData}>Сформировать отчёт</HoverButton>
                    <HoverButton onClick={exp}>Сформировать PDF</HoverButton>
                </div> : <div/>}
        </FlexContent>
        <CustomSidebar style={{
            width: open ? sidebarWidthOpen : sidebarWidthClosed,
            height: open ? 'auto' : '64px',
            borderRadius: open ? '4px' : '32px'
        }}>
            <button onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'}</button>
            <div style={{visibility: open ? 'visible' : 'hidden'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {open ? <input
                        type={'text'}
                        id="standard-name"
                        value={project}
                        onChange={(event) => setProject(event.target.value)}
                    /> : null}
                    {open ? <HoverButtonSmall onClick={() => selectMultiplePartnersAndProjects(project)}
                                              style={{backgroundColor: '#4CAF50'}}>Отметить</HoverButtonSmall> : <div/>}
                    {open && (filters.selectedPartners.length > 0) ?
                        <HoverButtonSmall onClick={clearSelection} style={{backgroundColor: '#4CAF50'}}>Снять отметку
                            ({filters.selectedPartners.length})</HoverButtonSmall> : <div/>}
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
                                            return <div key={`customer-${index2}`}
                                                        style={{background: item2.important ? 'red' : 'transparent'}}
                                                        onClick={() => toggleSinglePartnerAndProject(item2)}>
                                                <label className="container">
                                                    <input type="checkbox"
                                                           checked={filters.selectedPartners.some(e => e.project === item2.projectId && e.ets === item2.etsProject && e.customer === item2.customerName)}
                                                    />
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
        fetchPartners: () => dispatch(fetchPartners()),
        loadData: (id, filters) => dispatch(fetchAbstractReportData(id, filters)),
        toggleSinglePartnerAndProject: (item) => dispatch(toggleSelectedPartnerAndProject(item)),
        selectMultiplePartnersAndProjects: (items) => dispatch(setSelectedPartnersAndProjects(items)),
        clearSelection: () => dispatch(clearPartnersAndProjects()),
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