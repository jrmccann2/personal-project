UPDATE stats
-- SET free_throws_made = $2, free_throws_attempted = $3, field_goals_made = $4, field_goals_attempted = $5, o_rebounds = $6, d_rebounds = $7, turnovers = $8
SET $2 = $3
WHERE stat_line_id = $1;