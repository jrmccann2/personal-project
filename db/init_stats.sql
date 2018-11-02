INSERT INTO stats (player_id, game_id)
VALUES ($1, $2)
RETURNING stat_line_id;