import React, {Component} from "react";
import ListItem from "../../../node_modules/@material-ui/core/ListItem/ListItem";
import ListItemIcon from "../../../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import MenuIcon from "../../../node_modules/@material-ui/icons/Menu";
import ListItemText from "../../../node_modules/@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider";

export class AbstractListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: "Invalid title",
            selected: false
        }
    }

    onItemClick(id) {
        this.props.onItemClick(id);
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            title: this.props.title
        })
    }

    render() {
        const id = this.state.id;
        const title = this.state.title;
        return (
            <div>
                <ListItem button onClick={() => this.onItemClick(id)}>
                    <ListItemIcon>
                        <MenuIcon/>
                    </ListItemIcon>
                    <ListItemText primary={title}/>
                </ListItem>
                <Divider/>
            </div>

        );
    }
}