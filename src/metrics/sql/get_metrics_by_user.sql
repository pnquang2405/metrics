SELECT user_id AS "userId",
  "type",
  unit,
  value,
  date_created::TEXT AS "date"
FROM metrics
WHERE user_id = $1
  AND type = LOWER($2);