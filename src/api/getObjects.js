import { join } from 'path';
import { Router } from 'express';
import jade from 'jade';
import fm from 'front-matter';
import fs from '../utils/fs';

//ros tur
import rosApi from '../rostravel/rosTravelApiClient';

const router = new Router();

router.get('/', async (req, res, next) => {
    try {
        //let path = req.query.path;

        console.log('req.query', req.query);

        var { itemIds, tagsIds } = req.query;
        if (itemIds) {
            rosApi.findObjectsByItemIds(itemIds.split(',')).then((data)=>{
                //console.log('api data:', data);
                res.status(200).send(data);
            }).catch((err)=>{
                //console.log('api err', err);
                res.status(500).send(err);
            })
        }
        else if (tagsIds) {
            rosApi.findObjectsByTags(tagsIds.split(',')).then((data)=>{
                //console.log('api data:', data);
                res.status(200).send(data);
            }).catch((err)=>{
                //console.log('api err', err);
                res.status(500).send(err);
            })
        }
        else {
            res.status(200).send(null);
        }


        //if (!path || path === 'undefined') {
        //    res.status(400).send({error: `The 'path' query parameter cannot be empty.`});
        //    return;
        //}
        //
        //let fileName = join(CONTENT_DIR, (path === '/' ? '/index' : path) + '.jade');
        //if (!await fs.exists(fileName)) {
        //    fileName = join(CONTENT_DIR, path + '/index.jade');
        //}
        //
        //if (!await fs.exists(fileName)) {
        //    res.status(404).send({error: `The page '${path}' is not found.`});
        //} else {
        //    const source = await fs.readFile(fileName, {encoding: 'utf8'});
        //    const content = parseJade(path, source);
        //    res.status(200).send(content);
        //}
    } catch (err) {
        next(err);
    }
});

export default router;

