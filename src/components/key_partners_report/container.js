import React, {useEffect, useState} from "react";
import {store} from "../../redux/store";
import connect from "react-redux/es/connect/connect";
import {MATERIAL_COLORS, PAGES, sidebarWidthClosed, sidebarWidthOpen} from "../../Const";
import {makeStyles} from "@material-ui/core/styles";
import {setSelectedNavItem} from "../../redux/actions/appBarActions";
import {fetchPartners} from "../../redux/actions/partnersActions";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Sidebar} from "./sidebar";
import {Canvas, Document, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";
import {renderCustomizedLabel} from "../charts/PieChartByPartners";

const useStyles = makeStyles(theme => ({
    content: {display: 'flex', padding: 0, margin: 0, flexDirection: 'row', flexWrap: 'no-wrap', width: '100%'},
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: `calc(192px - ${theme.spacing(2)})`,
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
}));

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const MyDocument = () => (

    <Document>
        <Page size="A4" style={styles.page}>
            <Canvas style={styles.section}>
                <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                    <PieChart margin={{top: 30, right: 0, left: 0, bottom: 30}}>
                        <Pie data={ [{name: 'a', value: 1}, {name: 'b', value: 2}]}
                             nameKey={'name'}
                             dataKey={'value'}
                             labelLine={true}
                             label={renderCustomizedLabel}
                             fill="#8884d8"
                             startAngle={450}
                             endAngle={90}
                             paddingAngle={1}
                             legendType={'none'}
                        >
                            {
                                [{name: 'a', value: 1}, {name: 'b', value: 2}].map((entry, index) => <Cell key={`cell-${index}`}
                                                                                      fill={MATERIAL_COLORS[index % MATERIAL_COLORS.length]}/>)
                            }
                        </Pie>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </Canvas>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>
);


function KeyPartnersReportContainer({location, filters, data}) {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        store.dispatch(fetchPartners());
    }, []);

    const [w1, w2] = [`calc(100% - ${open ? sidebarWidthOpen : sidebarWidthClosed} - 16px)`, open ? sidebarWidthOpen : sidebarWidthClosed];

    return (<div className={styles.content}>
        <div style={{
            width: w1,
            display: 'flex',
            padding: '0px',
            margin: '0px',
            /*flexDirection: 'row',
            flexWrap: 'no-wrap',*/
        }}>

                <MyDocument/>

            content
        </div>

        <div style={{
            width: w2,
            margin: '8px',
            padding: '0px',
            height: 'auto',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            transition: '0.3s',
            ':hover': {
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
            },
        }}>
            <IconButton onClick={() => setOpen(!open)} style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
            {open ? <Sidebar/> : <div/>}
        </div>
    </div>);
}

function mapStateToProps(state) {
    return {
        filters: state.reportFilters,
        data: state.partnersData,
    }
}

export default (connect(mapStateToProps, null)(KeyPartnersReportContainer))

