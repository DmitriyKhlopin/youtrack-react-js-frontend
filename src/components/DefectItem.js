import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import {ENDPOINT} from "../Const";
import {AUTH_TOKEN} from "../Config";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

class DefectItem extends React.Component {
    state = {
        title: null,
        body: null,
        defect: null,
        isPosting: false,
        isChecked: false,
        isChecking: false,
        idReadable: null
    };

    static getDerivedStateFromProps(props, state) {
        if (state.defect === null) return {
            defect: props.defect,
            title: props.defect.title,
            body: props.defect.body
        }
    }

    async sendItemToYouTrack() {
        this.setState({isPosting: true});
        const obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body
            })
        };
        const url = `${ENDPOINT}/api/tfs?action=postChangeRequest&changeRequestId=${this.state.defect.changeRequestId}`;
        console.log(url);
        fetch(url, obj)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isPosting: false,
                    idReadable: res['idReadable']
                });

            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isPosting: false,
                    idReadable: null
                });
            });
    };

    async checkIssue(changeRequestId) {
        console.log('Checking issue');
        this.setState({isChecking: true});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': AUTH_TOKEN
            }
        };
        const url = `http://support.fsight.ru/api/issues?query=Issue%3A+${changeRequestId}&$top=-1&fields=idReadable`;
        fetch(url, obj)
            .then(res => res.json())
            .then(res => {
                console.log(res.length);
                if (res.length > 0) {
                    this.setState({
                        isChecked: true,
                        isChecking: false,
                        idReadable: res[0]['idReadable']
                    });
                } else {
                    this.setState({
                        isChecked: true,
                        isChecking: false,
                        idReadable: null
                    });
                }

            })
            .catch(err => this.setState({
                isChecked: true,
                idReadable: null
            }));
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const i = this.state.defect;
        if (i !== null && this.state.isChecked === false && this.state.isChecking === false) {
            this.checkIssue(i.parentId);
        }
        console.log(this.state.idReadable);
        return i === null ? <div/> : <div style={{padding: 16}}>
            <Card
                style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8}}>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm>
                        <div>
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    id="standard-title"
                                    label="Заголовок"
                                    /*style={{ margin: 8 }}*/
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                    fullWidth
                                    multiline
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-body"
                                    label="Описание"
                                    value={this.state.body}
                                    onChange={this.handleChange('body')}
                                    /*helperText="Full width!"*/
                                    fullWidth
                                    multiline
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Typography>
                                    Area name: {i.areaName} // Change
                                    request: {i.changeRequestId} // {i.parentType}: {i.parentId}
                                </Typography>
                            </form>
                        </div>

                    </Grid>
                    <Grid item justify="center">
                        {this.state.idReadable !== null ?
                            <div>{this.state.idReadable}</div> :
                            this.state.isPosting ? <CircularProgress/> :
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Button variant="contained"
                                            color="primary"
                                            className={classes.button2}
                                            onClick={() => this.sendItemToYouTrack()}>
                                        Опубликовать
                                    </Button>
                                </FormControl>}
                    </Grid>
                </Grid>
            </Card>
        </div>;
    }
}

export default withStyles(styles, {withTheme: true})(DefectItem);
