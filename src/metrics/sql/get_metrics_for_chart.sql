WITH base AS (
  SELECT user_id,
    "type",
    value,
    unit,
    date_created
  FROM metrics
  WHERE user_id = COALESCE($1, user_id)
    AND "type" = LOWER($2)
    AND date_created >= NOW() - ($3 || ' ')::INTERVAL
),
getMaxDate AS (
  SELECT user_id,
    "type",
    MAX(date_created) AS max_date
  FROM base
  GROUP BY user_id,
    "type",
    DATE_TRUNC('day', date_created)
)
SELECT gd.user_id AS "userId",
  gd."type",
  b.value,
  b.unit,
  gd.max_date AS "date"
FROM getMaxDate gd
  JOIN base b ON b.user_id = gd.user_id
  AND b.date_created = gd.max_date
  AND b."type" = gd."type"
ORDER BY "date" DESC;