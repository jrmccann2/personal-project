SELECT *
FROM teams t
WHERE coach_id = $1
ORDER BY team_id DESC;