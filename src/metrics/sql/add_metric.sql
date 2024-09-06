INSERT INTO metrics (user_id, date_created, value, unit, type)
VALUES ($1, $2, $3, LOWER($4), LOWER($5));