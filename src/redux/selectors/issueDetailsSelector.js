export const selectIssueDetails = (state) => state.highPriorityIssuesData.issues;
export const selectIsIssueDetailsLoading = (state) => state.highPriorityIssuesData.fetching;
export const selectTags = (state) => state.reportFilters.tags;
export const selectIsLoading = (state) => state.highPriorityIssuesData.fetching;
export const selectIsLoaded = (state) => state.highPriorityIssuesData.fetched;
export const selectError = (state) => state.highPriorityIssuesData.error;
