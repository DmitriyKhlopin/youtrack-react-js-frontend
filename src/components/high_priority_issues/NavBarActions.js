import cx from "classnames";
import styles from "../../styles/components.module.css";
import React from "react";
import {ProjectsFilter} from "../filters/ProjectsFilter";
import {TypesFilter} from "../filters/TypesFilter";
import {StatesFilter} from "../filters/StatesFilter";
import {TagsFilter} from "../filters/TagsFilter";
import {PartnerCustomersFilter} from "../filters/PartnerCustomersFilter";
import {PrioritiesFilter} from "../filters/PrioritiesFilter";

export function NavBarActions() {
    return (
        <div className={cx(styles.row, styles.centered)}>
            <ProjectsFilter/>
            <PartnerCustomersFilter/>
            <PrioritiesFilter/>
            <TypesFilter/>
            <StatesFilter/>
            <TagsFilter/>
        </div>
    )
}
