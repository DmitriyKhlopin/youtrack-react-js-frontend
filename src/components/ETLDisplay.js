import React, {Component} from "react";
import Checkbox from "../../node_modules/@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "../../node_modules/@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "../../node_modules/@material-ui/core/FormGroup/FormGroup";
import Button from "@material-ui/core/Button";

export class ETLDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            isLoading: false
        }
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount() {

    }

    loadData() {
        this.setState({isLoading: true});
        console.log("aaa");
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        const url = "http://10.0.172.42:8081/etl";
        fetch(url, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(json => {
            console.log(json);
            !this.isCancelled && this.setState({items: json, isLoading: false});
        }).catch(err => console.log(err));
    }

    render() {
        console.log(this.state);
        const items = this.state.items;
        const isLoading = this.state.isLoading;
        const selectors = <FormGroup row>
            <FormControlLabel
                control={<Checkbox value="a" key={1} onChange={() => (console.log("aaa"))} checked={true}/>}
                label="Запросы"
            />

            <FormControlLabel
                control={<Checkbox value="a" key={2} onChange={() => (console.log("aaa"))} checked={true}/>}
                label="Проекты"
            />
            <Button variant="contained" disabled={isLoading} onClick={() => this.loadData()}>
                Load data
            </Button>
        </FormGroup>;
        if (items === null && !isLoading) return <div>{selectors}
            <div>No data</div>
        </div>;
        if (items === null && isLoading) return <div>{selectors}
            <div>Loading data</div>
        </div>;
        if (items !== null && !isLoading) return <div>{selectors}
            <div>{items.issues} - {items.timeUnit}</div>
        </div>;
        if (items !== null && isLoading) return <div>{selectors}
            <div>{items.issues} - {items.timeUnit}
                <div> Loading more data</div>
            </div>
        </div>;
        return <div>{selectors}
            <div>Unhandled state</div>
        </div>

    }
}