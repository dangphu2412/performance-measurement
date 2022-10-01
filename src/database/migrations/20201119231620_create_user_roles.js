// @ts-check
/**
 * @param {import("knex")} knex
 */
exports.up = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('users_roles', table => {
            table.increments('id');
            table.integer('user_id').unsigned().references('id').inTable('users');
            table.integer('role_id').unsigned().references('id').inTable('roles');
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
        await tracsaction.schema.dropTableIfExists('users_roles');
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
};
