insert into
    users (
        first_name,
        last_name,
        email,
        password
    )
values (
        'Gualberto',
        'Cuiza',
        'gualberto@unosquare.com',
        'password'
    );

insert into types
values ('Veganims')
insert into
    recipes (
        name,
        description,
        user_id,
        type_id
    )
values (
        'Honey garlic chicken',
        '<h5>Step 1</h5><p>Prepare 2 bowls, one with beaten egg, and second with cornstarch mixed with a pinch of salt and pepper.</p><h5>Step 2</h5><p>Dip the chicken into the beaten egg. Place all the pieces into the cornstarch and toss to lightly and evenly coat.</p>',
        1,
        1
    )