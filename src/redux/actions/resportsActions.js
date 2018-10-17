import moment from 'moment';

export function fetchReportData(/*projects, dateFrom, dateTo*/) {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_REPORT_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        console.log(state);
        const projects = state.filters.projSelected.map(item => item.shortName);
        const dateFrom = state.filters.dateFrom;
        const dateTo = state.filters.dateTo;
        const baseUrl = 'http://10.0.172.42:8081/api/chart/';
        const filters = '?projects=' + projects + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;
        fetch(baseUrl + 'dynamics' + filters, obj)
            .then(res => res.json())
            .then(json => {
                    const res = json.map(function (item) {
                        item.week = moment(item.week).format('L');
                        return item
                    });
                    /*console.log(res)*/
                    dispatch({
                        type: 'FETCH_REPORT_DYNAMICS_FULFILLED',
                        payload: res
                    })
                }
            )
            .catch(err => console.log(err));

        fetch(baseUrl + 'sigma' + filters, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_REPORT_SIGMA_FULFILLED',
                    payload: {
                        sigmaItems: json.data,
                        sigma: json.sigma,
                        sigmaMaxX: Math.max(...json.data.map(item => item.day)) + 2,
                        sigmaMaxY: Math.max(...json.data.map(item => item.count)) + 2,
                    }
                }))
            .catch(err => console.log(err));


        /*const url2 = 'http://10.0.172.42:8081/api/chart/sigma?projects=' + projects + '&dateFrom=' + this.state.dateFrom + '&dateTo=' + this.state.dateTo;*/
        /*fetch(baseUrl + 'sigma' + filters, obj)
            .then(res => res.json())
            .then(json => {
                !this.isCancelled && this.setState({
                    sigmaItems: json.data,
                    sigma: json.sigma,
                    isLoading: false,
                    sigmaMaxX: Math.max(...json.data.map(item => item.day)) + 2,
                    sigmaMaxY: Math.max(...json.data.map(item => item.count)) + 2,
                });
            });


        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_REPORT_FULFILLED',
                    payload: {
                        proj: json,
                        projDefault: json.filter(item => !innerProjects.includes(item.shortName)),
                        projSelected: json.filter(item => !innerProjects.includes(item.shortName))
                    }
                });
            })
            .catch(err => dispatch({
                type: 'FETCH_REPORT_REJECTED',
                payload: err
            }));*/
    }
}