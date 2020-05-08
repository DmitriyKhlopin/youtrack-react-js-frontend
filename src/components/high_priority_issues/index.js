import IssuesWithTFSDetailsDisplay from "./IssuesWithTFSDetailsDisplay";
import {NavBar} from "./NavBar";

const IssuesDetails = {
    id: 13,
    name: 'Детализация по запросам',
    path: '/issues_with_tfs_details',
    component: IssuesWithTFSDetailsDisplay,
    availableInDrawer: true,
    appBarActions: null,
    navBar: NavBar
}

export default IssuesDetails;