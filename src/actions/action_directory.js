import apiClient from '../core/ApiClient';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { processIf, processIfNotExists, multiProcessIf, multiProcessIfNotExists } from './action_index';

import apiUrls from '../constants/ApiUrls';

export const GET_DIRECTORY_BY_ID = 'GET_DIRECTORY_BY_ID';
export const GET_COUNTRIES = 'GET_COUNTRIES';

export function getDirectoryById(locationId) {
    var key = locationId;
    return (dispatch, getState) => {
        return multiProcessIfNotExists(dispatch, getState(), 'directory', GET_DIRECTORY_BY_ID, key, ()=> {
            return apiClient.get(`${apiUrls.DirectoryById}${locationId}`)
        });
    }
}

export function getAllCountries() {
    return (dispatch, getState) => {
        return processIfNotExists(dispatch, getState(), 'countries', GET_COUNTRIES, ()=> {
            return apiClient.get(`${apiUrls.DictionaryAllCountries}`)
        });
    }
}