import { Router } from 'express';

const router = new Router();

router.get('/', async (req, res, next) => {
    res.writeHead(302,
        {Location: 'https://youtu.be/cpCPDphlQhc'}
    );
    res.end();
});

export default router;

