import {drawerWidth} from './Const'
import {createStyles} from "@material-ui/styles";

export const styles = theme => createStyles({
    root: {
        minHeight: '100vh',
        maxHeight: '100vh',
        maxWidth: '100vw',
        height: '100%',
        zIndex: 1,
        padding: 0,
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 12,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 9,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    grow: {
        flexGrow: 1,
    },
    content: {
        zIndex: theme.zIndex.appBar + 1,
        overflow: 'auto',
        flexGrow: 1,
        padding: 0,
        margin: '64px 0px 0px 0px',
        position: 'relative',
        display: 'flex',
    },
    button: {
        margin: theme.spacing.unit,
        /*height: '100%'*/
        /*height: '100vh'*/
    },
    button2: {
        /*margin: theme.spacing.unit,*/
        /*padding: 0,*/
        height: '100%'
    },
    input: {
        display: 'none',
    },
    textField: {
        margin: theme.spacing.unit,
    },
    formControl: {
        /*marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,*/
        margin: 8,
        /*padding: theme.spacing.unit * 2,*/
        minWidth: 120,
    },
    formControlMultiSelect: {
        margin: theme.spacing.unit,
        maxWidth: 300,
        minWidth: 300,
        minHeight: 48,

    },
    group: {
        minWidth: 300
    },
    dialog: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    fab: {
        position: 'absolute',
        top: theme.spacing.unit * 2 + 64,
        right: theme.spacing.unit * 2,
    },
    fabLoad: {
        position: 'absolute',
        top: theme.spacing.unit * 2 + 64,
        right: theme.spacing.unit * 2 + 48,
    },
    componentRoot: {
        ...theme.mixins.gutters(),
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
    },
});
