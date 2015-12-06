import innaRegions from 'json!../rostravel/regions.json';

var regions = {};

innaRegions.forEach((r)=>{
    regions[r.id] = r.name
});

export default regions