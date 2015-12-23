import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

export const PROCESS_FIELD = 'PROCESS_FIELD';

export function processField(field, value) {
    return (dispatch, getState) => {
        dispatch({
            type: PROCESS_FIELD,
            field: field,
            value: value
        });
    }
}