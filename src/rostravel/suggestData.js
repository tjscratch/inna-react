import data from 'json!./suggest_tags_plus_locations.json';

//console.log('data', data);

const suggest = {
    getOptions: ()=> {
        return data;
    }
};


export default suggest;