import {components} from "react-select";
import React from "react";

export const ValueContainer = ({children, ...props}) => {
    const selected = props.getValue();
    const content = (length => {
        switch (length) {
            case 0:
                return children;
            case 1:
                return selected[0].label;
            default:
                return `${props.selectProps.placeholder} (${selected.length} items)`;
        }
    })(selected.length)
    return (
        <components.ValueContainer {...props}>
            {content}
        </components.ValueContainer>
    );
};
