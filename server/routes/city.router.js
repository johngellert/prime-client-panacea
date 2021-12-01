const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "cities" ORDER BY "id"';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500)
        })
})


router.get('/city/:cityName', (req, res) => {
    const queryText = 'SELECT * FROM "cities" WHERE "name"=$1';
    pool.query(queryText, [req.params.cityName])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            res.sendStatus(500)
        })
})


router.get('/:id', (req, res) => {
    const queryText = 'SELECT * FROM "cities" WHERE "id"=$1';
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            res.sendStatus(500)
        })
})


router.post('/', rejectUnauthenticated, (req, res) => {
    let newCity = req.body;

    if(newCity.country_id === ''){
        newCity.country_id = null;
    }
    if(!newCity.lat){newCity.lat = null}
    if(!newCity.long){newCity.long = null}

    const queryText = `INSERT INTO "cities"(
        "country_id",
        "name",
        "overview", 
        "health_risks",
        "ambulance",
        "fire", 
        "police", 
        "roadside_assistance", 
        "wellness_resources", 
        "local_health_remedies", 
        "healthcare_tourism",
        "WHO_link",
        "CDC_link",
        "google_translate_link",
        "local_resources",
        "lat",
        "long"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
    RETURNING "id"`;
    const queryValues = [
        newCity.country_id,
        newCity.name,
        newCity.overview,
        newCity.health_risks,
        newCity.ambulance,
        newCity.fire,
        newCity.police,
        newCity.roadside_assistance,
        newCity.wellness_resources,
        newCity.local_health_remedies,
        newCity.healthcare_tourism,
        newCity.WHO_link,
        newCity.CDC_link,
        newCity.google_translate_link,
        newCity.local_resources,
        newCity.lat,
        newCity.long
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
    let updatedCity = req.body;

    if (updatedCity.country_id === '') {
        updatedCity.country_id = null;
    }
    if(!updatedCity.lat){updatedCity.lat = null}
    if(!updatedCity.long){updatedCity.long = null}

    pool.query(`UPDATE "cities"
    SET 
    "country_id"=$1,
    "name"=$2, 
    "overview"=$3, 
    "health_risks"=$4,
    "ambulance"=$5,
    "fire"=$6, 
    "police"=$7, 
    "roadside_assistance"=$8, 
    "wellness_resources"=$9, 
    "local_health_remedies"=$10, 
    "healthcare_tourism"=$11,
    "WHO_link"=$12,
    "CDC_link"=$13,
    "google_translate_link"=$14,
    "local_resources"=$15,
    "lat"=$16,
    "long"=$17
    WHERE "id"=$18;`,
        [
            updatedCity.country_id,
            updatedCity.name,
            updatedCity.overview,
            updatedCity.health_risks,
            updatedCity.ambulance,
            updatedCity.fire,
            updatedCity.police,
            updatedCity.roadside_assistance,
            updatedCity.wellness_resources,
            updatedCity.local_health_remedies,
            updatedCity.healthcare_tourism,
            updatedCity.WHO_link,
            updatedCity.CDC_link,
            updatedCity.google_translate_link,
            updatedCity.local_resources,
            updatedCity.lat,
            updatedCity.long,
            updatedCity.id
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
    const queryText = 'DELETE FROM "cities" WHERE id=$1';
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        res.sendStatus(500);
      });
  });

  
module.exports = router;