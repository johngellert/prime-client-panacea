const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//GET all orgs
// router.get('/', (req, res) => {
//     const queryText = 'SELECT * FROM "organizations" ORDER BY "id"';
//     pool.query(queryText)
//         .then((result) => {
//             res.send(result.rows);
//         })
//         .catch((error) => {
//             console.log('Error completely SELECT org query', error)
//             res.sendStatus(500)
//         })
// })


//GET selected org
router.get('/:id', (req, res) => {
    const queryText = 'SELECT * FROM "organizations" WHERE "id"=$1';
    console.log('here is your org ', req.params.id);

    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log('Error completely SELECT org query', error)
            res.sendStatus(500)
        })
})


// POST new org
router.post('/', rejectUnauthenticated, (req, res) => {
    const newOrg = req.body;


    if(newOrg.city_id === ''){
        newOrg.city_id = null;
    }
    if(!newOrg.lat){newOrg.lat = null}
    if(!newOrg.long){newOrg.long = null}

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
            console.log(result.rows);
        })
        .catch((error) => {
            console.log('Error posting a new organization:', error);
            res.sendStatus(500);
        });
});


//UPDATE org
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('testtest', req.body);
    const updateCity = req.body;
    pool.query(`UPDATE "organizations"
    SET 
    "city_id"=$1,
    "name"=$2,
    "type"=#3,
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
            newOrg.google_maps_link,
            newOrg.id
        ]
    )
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('ERROR completing UPDATE of org', error);
            res.sendStatus(500)
        });
});


//DELETE org 
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'DELETE FROM "organizations" WHERE id=$1';
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing DELETE org query', err);
            res.sendStatus(500);
        });
});

module.exports = router;