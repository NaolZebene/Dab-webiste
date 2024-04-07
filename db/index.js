const { knexInstance } = require("./knexInstance")
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        throw new Error('Server Error');
    }
}

module.exports = () => {
    knexInstance.raw('select 1+1 as result').catch(err => {
        console.log(err);
        if (err.errno == 1049) {

        }
        process.exit(1);
    }).then(() => {
        console.log('MySQL Connected');
        knexInstance.schema.hasTable('admins').then(function (exists) {
            if (!exists) {
                knexInstance.schema.createTable('admins', function (t) {
                    t.increments('adminId').primary();
                    t.string('name', 100);
                    t.string('email', 100);
                    t.text('password');
                }).then(async (val) => {
                    await knexInstance.into('admins').insert({
                        email: 'test@gmail.com',
                        password: await hashPassword('123456'),
                    })
                })
            }
        });

        knexInstance.schema.hasTable('blogs').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('blogs', function (t) {
                    t.increments('blogId').primary();
                    t.string('title');
                    t.text('blogCategory');
                    t.text('body');
                    t.string('dateTime', 50);
                    t.string('author', 100);
                    t.text('blogTags');
                    t.string('status', 15);
                    t.string('path', 1000)
                })
            }
        });

        knexInstance.schema.hasTable('events').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('events', function (t) {
                    t.increments('eventId').primary();
                    t.text('title');
                    t.text('venue');
                    t.text('host');
                    t.text('eventCategory');
                    t.text('eventTags');
                    t.text('path');
                    t.text('eventBody');
                    t.text('eventDate');
                })
            }
        });

        knexInstance.schema.hasTable('category').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('category', function (t) {
                    t.increments('categoryId').primary();
                    t.text('title');
                    t.text('description');
                })
            }
        })

        knexInstance.schema.hasTable('blogtags').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('blogtags', function (t) {
                    t.increments('blogtagId').primary();
                    t.text('title');
                    t.text('description');
                })
            }
        })

        knexInstance.schema.hasTable('eventCategory').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('eventCategory', function (t) {
                    t.increments('categoryId').primary();
                    t.text('title');
                    t.text('description');
                })
            }
        })

        knexInstance.schema.hasTable('eventTags').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('eventTags', function (t) {
                    t.increments('eventTagId').primary();
                    t.text('title');
                    t.text('description');
                })
            }
        })


        knexInstance.schema.hasTable('venue').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('venue', function (t) {
                    t.increments('venueId').primary();
                    t.text('title');
                    t.text('description');
                })
            }
        })

        knexInstance.schema.hasTable('host').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('host', function (t) {
                    t.increments('hostId').primary();
                    t.text('title');
                    t.text('description');
                })
            }
        })

        knexInstance.schema.hasTable('portfolio').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('portfolio', function (t) {
                    t.increments('portfolioId').primary();
                    t.text('title');
                    t.text('client');
                    t.text('projectDate');
                    t.text('projectBody');
                    t.text('category');
                    t.text('path')
                })
            }
        })

        knexInstance.schema.hasTable('portfolioCategory').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('portfolioCategory', function (t) {
                    t.increments('categoryId').primary();
                    t.text('title');
                    t.text('description');
                })
            }
        })

        knexInstance.schema.hasTable('testimonial').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('testimonial', function (t) {
                    t.increments('testimonialId').primary();
                    t.text('author');
                    t.text('role');
                    t.text('body')
                })
            }
        })

        knexInstance.schema.hasTable('teams').then(async function (exists) {
            if (!exists) {
                await knexInstance.schema.createTable('teams', function (t) {
                    t.increments('teamId').primary();
                    t.text('name');
                    t.text('role');
                    t.text('path')
                })
            }
        })

    });
}