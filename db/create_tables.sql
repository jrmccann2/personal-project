create table coaches (
    coach_id serial primary key,
    username varchar(25) UNIQUE NOT NULL,
    email varchar(50),
    p_word text
);

create table teams (
    team_id serial primary key,
    team_name varchar(50),
    coach_id integer references coaches (coach_id) ON DELETE CASCADE
);

create table players (
    player_id serial primary key,
    player_name varchar(50),
    player_position varchar(2),
    team_id integer references teams (team_id) ON DELETE CASCADE
);

create table stats (
    stat_line_id serial primary key,
    free_throws_made integer,
    free_throws_attempted integer,
    field_goals_made integer,
    field_goals_attempted integer,
    o_rebounds integer,
    d_rebounds integer,
    turnovers integer,
    player_id integer references players (player_id), ON DELETE CASCADE
    game_id integer REFERENCES games (game_id) ON DELETE CASCADE
);

create table games (
    game_id serial primary key,
    opponent_name varchar(50),
    game_date date
);