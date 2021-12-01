// server/routes/medication.router.js
const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "medications" WHERE "city_id"=$1`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        res.sendStatus(500);
        console.log(error);
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const newMed = req.body;
    const queryText = `INSERT INTO "medications"(
        "city_id",
        "generic_name_us",
        "brand_name_us",
        "generic_name_translated"
    ) VALUES ($1, $2, $3, $4);`;
    const queryValues = [
        newMed.city_id,
        newMed.generic_name_us,
        newMed.brand_name_us,
        newMed.generic_name_translated
    ];
    pool.query(queryText, queryValues)
    .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log(error);
        });
})

router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM "medications" WHERE id=$1 RETURNING "city_id"';
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows[0])
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log(error);
        });
});

module.exports = router;