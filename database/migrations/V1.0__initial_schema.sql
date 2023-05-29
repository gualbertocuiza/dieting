CREATE TABLE
    users (
        id serial PRIMARY KEY,
        first_name varchar(255) NOT NULL,
        last_name varchar(255),
        avatar varchar(255),
        email varchar(255) NOT NULL,
        passsword varchar(255)
    );

CREATE TABLE types( id serial PRIMARY KEY, title varchar(255) );

CREATE TABLE
    recipes (
        id serial PRIMARY KEY,
        name varchar(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT current_timestamp,
        photo varchar(255),
        user_id integer REFERENCES users(id),
        type_id integer REFERENCES types(id)
    );

CREATE TABLE
    ingredients(
        id serial PRIMARY KEY,
        name varchar(255) NOT NULL,
        protein float,
        carbohydrates float,
        fats float,
        calories float
    );

CREATE TABLE
    recipe_ingredients(
        id serial PRIMARY KEY,
        recipe_id integer REFERENCES recipes(id),
        ingredient_id integer REFERENCES ingredients(id)
    );

CREATE TABLE
    comments(
        id serial PRIMARY KEY,
        comment
            varchar(255),
            created_at timestamp DEFAULT current_timestamp,
            recipe_id integer REFERENCES recipes(id),
            user_id integer REFERENCES users(id)
    );

CREATE TABLE
    ratings(
        id serial PRIMARY KEY,
        stars float,
        created_at timestamp DEFAULT current_timestamp,
        recipe_id integer REFERENCES recipes(id),
        user_id integer REFERENCES users(id)
    )