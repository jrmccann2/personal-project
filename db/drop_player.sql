DELETE FROM players
WHERE player_id = $1;

SELECT 
    t.team_name,
    p.player_id,
    p.player_name,
    p.player_position,
    s.free_throws_made,
    s.free_throws_attempted,
    s.field_goals_made,
    s.field_goals_attempted,
    s.o_rebounds,
    s.d_rebounds,
    s.turnovers
FROM teams t
RIGHT OUTER JOIN players p ON t.team_id = p.team_id
LEFT OUTER JOIN stats s ON p.player_id = s.player_id
WHERE p.team_id = $1;