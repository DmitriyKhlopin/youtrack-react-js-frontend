export const styles = {
    containerWithSidebar: {
        display: 'flex',
        padding: 0,
        margin: 0,
        flexDirection: 'row',
        flexWrap: 'no-wrap',
        width: '100%',
    },
    dataContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flexStart',
        alignItems: 'stretch',
        marginTop: '16px',
    },
    sidebarContentBase: {
        display: 'flex',
        flexDirection: 'column',
        margin: '8px',
    },
    spacedRowWithButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dateRangeSelectorContainer:{
        width: '100%',
        minWidth: '160px',
        height: '100%',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'row',
        /*justifyContent: 'center',*/
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
    },
};
