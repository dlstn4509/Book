const { pool } = require('./modules/mysql-init');

const createBook = async (book) => {
  try {
    let sql = ` INSERT INTO books SET fidx='7', title='test', writer='test', content='test' `;
    await pool.execute(sql);
  } catch (err) {
    throw new Error(err);
  }
};

createBook();
