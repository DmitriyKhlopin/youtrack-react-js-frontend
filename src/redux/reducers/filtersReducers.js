import {innerProjects, licProjects} from "../../Const";

export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    proj: [],
    projDefault: [],
    projSelected: []
}, action) {
    switch (action.type) {
        case 'FETCH_PROJECTS_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_PROJECTS_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_PROJECTS_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                proj: action.payload.proj,
                projDefault: action.payload.projDefault,
                projSelected: action.payload.projDefault,
                fetched: true
            };
            break;
        }
        case 'ADD_PROJECT_TO_SELECTED': {
            const pr = [...state.projSelected];
            pr.push(...state.proj.filter(item => item.shortName === action.payload));
            pr.sort(compare);
            state = {
                ...state,
                projSelected: pr
            };
            break;
        }
        case 'REMOVE_PROJECT_FROM_SELECTED': {
            const pr = [...state.projSelected];
            const chipToDelete = pr.map(item => item.shortName).indexOf(action.payload);
            pr.splice(chipToDelete, 1);
            pr.sort(compare);
            state = {
                ...state,
                projSelected: pr
            };
            break;
        }
        case 'SELECT_PROJECTS_BY_MODE': {
            switch (action.payload) {
                case 'PP': {
                    const pr = [...state.proj];
                    const ps = pr.filter(item => !innerProjects.includes(item.shortName));
                    console.log(ps);
                    state = {
                        ...state,
                        projSelected: ps
                    };
                    break;
                }
                case 'notPP': {
                    const pr = [...state.proj];
                    const ps = pr.filter(item => innerProjects.includes(item.shortName));
                    console.log(ps);
                    state = {
                        ...state,
                        projSelected: ps
                    };
                    break;
                }
                case 'LIC': {
                    const pr = [...state.proj];
                    const ps = pr.filter(item => licProjects.includes(item.shortName));
                    console.log(ps);
                    state = {
                        ...state,
                        projSelected: ps
                    };
                    break;
                }
                case 'ALL': {
                    const pr = [...state.proj];
                    state = {
                        ...state,
                        projSelected: pr
                    };
                    break;
                }
                case 'NONE': {
                    state = {
                        ...state,
                        projSelected: []
                    };
                    break;
                }
            }
        }
    }
    return state;
};

function compare(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}


/*

componentDidUpdate(prevProps, a, asd) {
    if (this.props.currentMode !== prevProps.currentMode) {
        this.setState({currentMode: this.props.currentMode});
        const mode = this.props.currentMode;
        console.log(mode);
        if (mode === "PP") {
            const selected = this.props.projects.filter(item => !innerProjects.includes(item.shortName));
            this.setState({
                selectedChipData: selected,
                removedChipData: this.props.projects.filter(item => innerProjects.includes(item.shortName))
            });
            this.onProjectsChanged(selected);
        }
        if (mode === "notPP") {
            const selected = this.props.projects.filter(item => innerProjects.includes(item.shortName));
            this.setState({
                selectedChipData: selected,
                removedChipData: this.props.projects.filter(item => !innerProjects.includes(item.shortName))
            });
            this.onProjectsChanged(selected);
        }
        if (mode === "LIC") {
            const selected = this.props.projects.filter(item => licProjects.includes(item.shortName));
            this.setState({
                selectedChipData: selected,
                removedChipData: this.props.projects.filter(item => !licProjects.includes(item.shortName))
            });
            this.onProjectsChanged(selected);
        }
        if (mode === "ALL") {
            const selected = this.props.projects;
            this.setState({
                selectedChipData: selected,
                removedChipData: []
            });
            this.onProjectsChanged(selected);
        }
        if (mode === "NONE") {
            const selected = this.props.projects;
            this.setState({
                selectedChipData: [],
                removedChipData: this.props.projects
            });
            this.onProjectsChanged(selected);
        }
    }
    if (this.props.projects !== prevProps.projects) {
        const mode = this.state.currentMode;

        console.log(mode);
        if (mode === "PP") {
            const selected = this.props.projects.filter(item => !innerProjects.includes(item.shortName));
            this.setState({
                selectedChipData: selected,
                removedChipData: this.props.projects.filter(item => innerProjects.includes(item.shortName))
            });
            this.onProjectsChanged(selected);
        }
        if (mode === "notPP") {
            const selected = this.props.projects.filter(item => innerProjects.includes(item.shortName));
            this.setState({
                selectedChipData: selected,
                removedChipData: this.props.projects.filter(item => !innerProjects.includes(item.shortName))
            });
            this.onProjectsChanged(selected);
        }
        if (mode === "LIC") {
            const selected = this.props.projects.filter(item => licProjects.includes(item.shortName));
            this.setState({
                selectedChipData: selected,
                removedChipData: this.props.projects.filter(item => !licProjects.includes(item.shortName))
            });
            this.onProjectsChanged(selected);
        }
        if (mode === "ALL") {
            const selected = this.props.projects;
            this.setState({
                selectedChipData: selected,
                removedChipData: []
            });
            this.onProjectsChanged(selected);
        }
        if (mode === "NONE") {
            const selected = this.props.projects;
            this.setState({
                selectedChipData: [],
                removedChipData: this.props.projects
            });
            this.onProjectsChanged(selected);
        }
    }
}*/
