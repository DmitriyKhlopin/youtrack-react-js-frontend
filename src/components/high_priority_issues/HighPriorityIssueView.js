import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles} from "@material-ui/styles";
import {red} from "@material-ui/core/colors";
import TFSIssueView from "./TFSIssueView";

export default function HighPriorityIssueView(props) {
    const classes = useStyles();
    const issue = props.issue;
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (<Card className={classes.card}>
        <CardHeader
            title={
                <a href={`https://support.fsight.ru/issue/${issue.id}`}
                   target="_blank" style={{textDecoration: 'none'}}>{issue.id + " " + issue.summary}</a>
            }/>
        <CardContent className={classes.content} onClick={handleExpandClick}>
            <Typography>{issue.state}</Typography>
            <Typography>{issue.comment === null ? 'Нет комментария' : issue.comment}</Typography>
            <Typography>{issue.tfsData.length === 0 ? 'Нет issue в TFS' : `${issue.tfsData.length} issue в TFS`}</Typography>
            <Typography>{[...new Set(issue.tfsData.map((e) => e.issueState))].map((e) => e + " " + issue.tfsData.filter((i) => i.issueState === e).length).join('; ')}</Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                {issue.tfsData.map((item, index) => <TFSIssueView key={`hpivas-${index}`} data={item}/>)}
            </CardContent>
        </Collapse>
    </Card>);
}

const useStyles = makeStyles(theme => ({
    card: {
        margin: 16,
        maxWidth: '100%',
    },
    content: {
        paddingTop: 0,
        paddingBottom: 0,
    },

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        /*transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),*/
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    formControl: {
        margin: 8,
        minWidth: 150,
    },
}));
