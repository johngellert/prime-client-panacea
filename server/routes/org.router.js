// server/routes/org.router.js
const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


router.get('/:id', (req, res) => {
    const queryText = 'SELECT * FROM "organizations" WHERE "id"=$1';

    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log('Error completely SELECT org query', error)
            res.sendStatus(500)
        })
})


router.post('/', rejectUnauthenticated, (req, res) => {
    const newOrg = req.body;

    if (newOrg.city_id === '') {
        newOrg.city_id = null;
    }
    if (!newOrg.lat) { newOrg.lat = null }
    if (!newOrg.long) { newOrg.long = null }

    const queryText = `INSERT INTO "organizations"(
    "city_id",
    "name",
    "type",
    "recommended",
    "twentyfour",
    "hours",
    "homeopathic_remedies",
    "labor_delivery",
    "childrens",
    "childrens_surgical",
    "adult",
    "adult_surgical",
    "medical_translators",
    "comments",
    "phone_number",
    "org_address",
    "website_url",
    "lat",
    "long",
    "google_maps_link"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
             $12, $13, $14, $15, $16, $17, $18, $19, $20) 
    RETURNING "id"`;
    const queryValues = [
        newOrg.city_id,
        newOrg.name,
        newOrg.type,
        newOrg.recommend,
        newOrg.twentyfour,
        newOrg.hours,
        newOrg.homeopathic_remedies,
        newOrg.labor_delivery,
        newOrg.childrens,
        newOrg.childrens_surgery,
        newOrg.adult,
        newOrg.adult_surgery,
        newOrg.medical_translators,
        newOrg.comments,
        newOrg.phone_number,
        newOrg.org_address,
        newOrg.website_url,
        newOrg.lat,
        newOrg.long,
        newOrg.google_maps_link
    ];
    pool.query(queryText, queryValues)
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});


router.put('/', rejectUnauthenticated, (req, res) => {
    let updatedOrg = req.body;

    if (updatedOrg.city_id === '') {
        updatedOrg.city_id = null;
    }
    if(!updatedOrg.lat){updatedOrg.lat = null}
    if(!updatedOrg.long){updatedOrg.long = null}
    
    pool.query(`UPDATE "organizations"
    SET 
    "city_id"=$1,
    "name"=$2,
    "type"=$3,
    "recommended"=$4,
    "twentyfour"=$5,
    "hours"=$6,
    "homeopathic_remedies"=$7,
    "labor_delivery"=$8,
    "childrens"=$9,
    "childrens_surgical"=$10,
    "adult"=$11,
    "adult_surgical"=$12,
    "medical_translators"=$13,
    "comments"=$14,
    "phone_number"=$15,
    "org_address"=$16,
    "website_url"=$17,
    "lat"=$18,
    "long"=$19,
    "google_maps_link"=$20
    WHERE "id"=$21;`,
        [
            updatedOrg.city_id,
            updatedOrg.name,
            updatedOrg.type,
            updatedOrg.recommended,
            updatedOrg.twentyfour,
            updatedOrg.hours,
            updatedOrg.homeopathic_remedies,
            updatedOrg.labor_delivery,
            updatedOrg.childrens,
            updatedOrg.childrens_surgical,
            updatedOrg.adult,
            updatedOrg.adult_surgical,
            updatedOrg.medical_translators,
            updatedOrg.comments,
            updatedOrg.phone_number,
            updatedOrg.org_address,
            updatedOrg.website_url,
            updatedOrg.lat,
            updatedOrg.long,
            updatedOrg.google_maps_link,
            updatedOrg.id
        ]
    )
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            res.sendStatus(500)
        });
});


router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'DELETE FROM "organizations" WHERE id=$1';
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            res.sendStatus(500);
        });
});

module.exports = router;