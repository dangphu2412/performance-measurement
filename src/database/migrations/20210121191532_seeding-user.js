// @ts-check
/**
 * @param {import("knex")} knex
 */

exports.up = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction('users').insert([
            {
                username: 'admin', fullname: 'Lee ', email: 'admin@gmail.com', password: '$2a$10$6UR93QfWPRDjxGEpCSLMTOiEO2A8QmCl9lWxEQr7YTZ/SmqageeKa'
            },
        ]);
        await tracsaction.commit();
    } catch (e) {
        await tracsaction.rollback();
    }
};

/**
 * @param {import("knex")} knex
 */
exports.down = async knex => {
    try {
        await knex('users').delete().where('username', ['admin']);
    } catch (error) {
        console.log(error);
    }
};
