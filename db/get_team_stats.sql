SELECT 
    s.free_throws_made,
    s.free_throws_attempted,
    s.field_goals_made,
    s.field_goals_attempted,
    s.o_rebounds,
    s.d_rebounds,
    s.turnovers
FROM players p
LEFT OUTER JOIN stats s ON p.player_id = s.player_id
WHERE p.team_id = $1;