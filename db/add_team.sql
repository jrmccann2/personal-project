INSERT INTO teams (team_name, coach_id)
VALUES ($1, $2)
RETURNING *;