import React, {Component} from "react";

export class ETLResultDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.data,
            isLoading: this.props.isLoading
        });
        console.log(this.state.isLoading);
    }

    render() {
        console.log(this.state);
        const {data, isLoading} = this.state;
        console.log(isLoading);
        if (data === null && !isLoading) return <div>No data</div>;
        if (data === null && isLoading) return <div>Loading data</div>;
        if (data !== null && !isLoading) return <div>{data.issues} - {data.timeUnit}</div>;
        if (data !== null && isLoading) return <div>{data.issues} - {data.timeUnit}
            <div> Loading more data</div>
        </div>;
        return <div>Unhandled state</div>
    }
}