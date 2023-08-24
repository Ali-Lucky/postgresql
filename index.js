const client = require('./employee.js');
const express = require('express')

const { createEmployee, getEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('./employee.js')

const app = express()

app.use(express.json())

app.post('/employee', createEmployee)
app.get('/employee', getEmployee)
app.get('/employee/:id', getEmployeeById)
app.put('/employee/:id', updateEmployee)
app.delete('/employee/:id', deleteEmployee)

app.listen(3000, () => {
    console.log("Server is listening at PORT 3000");
});