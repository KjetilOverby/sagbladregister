import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let doc = await req.db.collection('k2.2-3.6').find().toArray()
    console.log('running: ' + doc);
    res.json(doc);
});

export default handler;