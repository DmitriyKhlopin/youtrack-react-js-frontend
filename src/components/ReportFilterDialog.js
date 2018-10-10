import React, {Component} from "react";
import DialogTitle from "../../node_modules/@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "../../node_modules/@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "../../node_modules/@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "../../node_modules/@material-ui/core/DialogActions/DialogActions";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import Dialog from "../../node_modules/@material-ui/core/Dialog/Dialog";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class ReportFilterDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper'
        }
    }

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidUpdate(prevProps, a, b){
        if (this.props.open !== prevProps.open) {
            console.log(this.props.open);
            this.setState({open: this.props.open})
        }
    }

    componentDidMount() {
        console.log("CDM");
        this.setState({open: this.props.open})
    }

    render() {
        return <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title">
            <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
                    at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
                    nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur
                    et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras
                    mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                    egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                    sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                    consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                    egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                    sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                    consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                    egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                    sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                    consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                    egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                    sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                    consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                    egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
                    sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    }
}

ReportFilterDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportFilterDialog);
