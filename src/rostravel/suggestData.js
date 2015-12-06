import data from 'json!./suggest_tags_plus_locations.json';
import locations from 'json!./inna_locations.json';

//console.log('data', data);

const suggest = {
    getOptions: ()=> {
        return data;
    },
    getLocations: ()=> {
        return locations;
    }
};


export default suggest;