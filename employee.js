const { Client } = require('pg');

// Create a new PostgreSQL pool
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: "274206",
  port: 5433 // default PostgreSQL port
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL database:', error);
  });

const createEmployee = async (req, res) => {
  try {
    const { name, email } = req.body;
    await client.query(
      "insert into employees (name, email) values ($1, $2) returning *",
      [name, email],
      (err, result) => {
        if (err) {
          return res.status(400).send({ status: false, message: err.message })
        } else {
          return res.status(201).send({ message: "data created successfully", data: result.rows[0] })
        }
      }
    )
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
}

const getEmployee = async (req, res) => {
  try {
    await client.query(
      "select * from employees",
      (err, result) => {
        if (err) {
          return res.status(400).send({ status: false, message: err.message })
        } else {
          return res.status(201).send({ data: result.rows })
        }
      }
    )
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
}

const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id
    await client.query(
      "select * from employees where id=$1",
      [id],
      (err, result) => {
        if (err) {
          return res.status(400).send({ status: false, message: err.message })
        } else {
          return res.status(201).send({ data: result.rows })
        }
      }
    )
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
}

const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id
    const { name, email } = req.body
    await client.query(
      "update employees set name = $1, email = $2 where id = $3 returning *",
      [name, email, id],
      (err, result) => {
        if (err) {
          return res.status(400).send({ status: false, message: err.message })
        } else {
          return res.status(201).send({ message: "data updated successfully", data: result.rows })
        }
      }
    )
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
}

const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id

    await client.query(
      "delete from employees where id = $1",
      [id],
      (err, result) => {
        if (err) {
          return res.status(400).send({ status: false, message: err.message })
        } else {
          return res.status(201).send({ message: "data deleted successfully" })
        }
      }
    )
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
}

module.exports = { createEmployee, getEmployee, getEmployeeById, updateEmployee, deleteEmployee }