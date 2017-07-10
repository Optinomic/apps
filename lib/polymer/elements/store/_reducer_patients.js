function patients(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case 'GET_PATIENTS_LIST_COMPLETE':
            {
                var sb = Object.assign({}, state.patients_list);
                sb[action.data.path] = action.data;
                return Object.assign({}, state, {
                    loading: false,
                    patients_list: sb
                });
            };
        default:
            return state;
    }
};
