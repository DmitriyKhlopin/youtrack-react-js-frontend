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
        width: theme.spacing(9),
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
        margin: theme.spacing,
    },
    button2: {
        height: '100%'
    },
    input: {
        display: 'none',
    },
    textField: {
        margin: theme.spacing,
    },
    formControl: {
        margin: 8,
        minWidth: 120,
    },
    formControlMultiSelect: {
        margin: theme.spacing,
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
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    fab: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabLoad: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
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
