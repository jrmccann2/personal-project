SELECT 
    p.player_name,
    p.player_position,
    s.free_throws_made,
    s.free_throws_attempted,
    s.field_goals_made,
    s.field_goals_attempted,
    s.o_rebounds,
    s.d_rebounds,
    s.turnovers,
    g.opponent_name,
    TO_CHAR(g.game_date, 'MM/DD/YYYY') AS game_date
FROM players p
RIGHT OUTER JOIN stats s ON p.player_id = s.player_id
LEFT OUTER JOIN games g ON g.game_id = s.game_id
WHERE p.player_id = $1;