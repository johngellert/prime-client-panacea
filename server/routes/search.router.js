const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/city', async(req, res)=>{
    try {
        const { city_name } = req.query;
        const searchQuery = 'SELECT * FROM "cities" WHERE "name" ILIKE $1';
        const { rows } = await pool.query(searchQuery, [city_name]);
        await res.send(rows);
    } catch (error) {
        throw error;
    }
});

router.get('/organization', async(req, res) => {
    try {
        const { organization_name } = req.query; // destructuring the query object only looking for the org name
        const searchQuery = 'SELECT * FROM "organizations" WHERE "name" ILIKE $1';
        const { rows } = await pool.query(searchQuery, [organization_name]); // destructuring the result only looking for the rows
        await res.send(rows);
    } catch (error) {
        throw error;
    }
});

module.exports = router;