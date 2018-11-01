INSERT INTO coaches (username, email, p_word)
VALUES ($1, $2, $3)
RETURNING *;