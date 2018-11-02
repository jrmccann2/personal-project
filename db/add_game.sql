INSERT INTO games (opponent_name, game_date)
VALUES ($1, $2)
RETURNING game_id, opponent_name, TO_CHAR(game_date, 'MM/DD/YYYY') AS game_date;
