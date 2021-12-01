const router = require("express").Router();
const pool = require("../modules/pool");

router.get("/city", async (req, res, next) => {
  try {
    const { city_name } = req.query; 
    const searchQuery =
      `SELECT 
      "cities"."id" AS "city_id",
      "cities"."created_at" AS "city_created_at",
      "cities"."country_id" AS "city_country_id",
      "cities"."name" AS "city_name",
      "cities"."lat", "cities"."long",
      "cities"."overview", "cities"."health_risks",
      "cities"."ambulance", "cities"."fire",
      "cities"."police", "cities"."roadside_assistance",
      "cities"."wellness_resources", "cities"."local_health_remedies",
      "cities"."healthcare_tourism", "cities"."WHO_link",
      "cities"."CDC_link", "cities"."google_translate_link",
      "cities"."local_resources",
      "countries"."value" AS "country_name"
      FROM "cities" 
      JOIN "countries" ON "cities"."country_id"="countries"."id"
      WHERE "cities"."name" ILIKE $1;`;
    const { rows } = await pool.query(searchQuery, [city_name]); // destructuring the result only looking for the rows
    res.send(rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.get("/country", async (req, res, next) => {
  try {
    const { country_name } = req.query; 
    const searchQuery = `
        SELECT
        "cities"."id" AS "city_id",
        "cities"."created_at" AS "city_created_at",
        "cities"."country_id" AS "city_country_id",
        "cities"."name" AS "city_name",
        "countries"."value" AS "country_name"
        FROM "cities" 
        JOIN "countries" ON "cities"."country_id"="countries"."id"
        WHERE "countries"."value" ILIKE $1`;
    const { rows } = await pool.query(searchQuery, [country_name]); 
    res.send(rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.get("/organization", async (req, res, next) => {
  try {
    const { organization_name } = req.query;
    const searchQuery =
      `SELECT
       "organizations"."id" AS "organization_id",
       "organizations"."created_at" AS "organization_create_at",
       "organizations"."city_id" AS "organization_city_id",
       "organizations"."name" AS "organization_name",
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
       "website_url",
       "organizations"."lat" AS "organization_lat",
       "organizations"."long" AS "organization_long",
       "google_maps_link" AS "organization_google_maps_link",
       "cities"."id" AS "cities_id",
       "cities"."created_at" AS "city_created_at",
       "cities"."country_id" AS "organization_city_country_id",
       "cities"."name" AS "city_name",
       "cities"."overview" AS "citey_overview",
       "cities"."health_risks" AS "city_health_risks",
       "ambulance" AS "city_ambulance_number",
       "fire" AS "city_fire_number",
       "police" AS "city_police_number",
       "roadside_assistance" AS "city_roadside_assistance_number",
       "wellness_resources" AS "city_wellness_resources",
       "local_health_remedies" AS "city_local_health_remedies",
       "healthcare_tourism" AS "city_local_healthcare_tourism",
       "WHO_link" AS "city_WHO_link",
       "CDC_link" AS "city_CDC_link",
       "google_translate_link" AS "city_google_translate_link",
       "local_resources" AS "city_local_resources",
       "cities"."lat" AS "city_lat",
       "cities"."long" AS "city_long",
       "countries"."value" AS "country_name"
       FROM "organizations" 
       JOIN "cities" ON "organizations"."city_id"="cities"."id"
       JOIN "countries" ON "cities"."country_id"="countries"."id"
       WHERE "organizations"."name" ILIKE $1;`;

    const { rows } = await pool.query(searchQuery, [organization_name]);
    res.send(rows);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = router;
