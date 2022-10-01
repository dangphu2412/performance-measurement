// @ts-check
/**
 * @param {import("knex")} knex
 */
exports.up = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('users', table => {
            table.increments('id');
            table.string('username');
            table.string('fullname');
            table.string('email');
            table.string('password');
            table.timestamps(true, true);
        });
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
};

/**
 * @param {import("knex")} knex
 */
exports.down = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.dropTableIfExists('users');
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
};
