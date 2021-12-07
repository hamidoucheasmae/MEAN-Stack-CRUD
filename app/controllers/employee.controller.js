const Employee = require('../models/employee.model.js');

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.email ) {
        return res.status(400).send({
            message: "Enter all the required fields"
        
        })  
    }
    //check if password is more than 6 characters
if(req.body.password.length < 6 ) {
    return res.status(400).send({msg : 'password atleast 6 characters'})
}

// CHOF HADA M3AK
// if(req.body.email = email) {
//     return res.status(400).send({msg : 'mail already exis '})
// }

// else{
//     Employee.findOne({email : email}).exec((err,Employee)=>{
//         console.log(Employee);   
//         if(Employee) {
//             return res.status(400).send({msg: 'email already exist'});
//             render(res,err,username,email);
            
//         } else {
//          const newUser = new User({
//              username : username,
//              email : email,
//              password : password
//          })
           
            
//            }
// Find a single employee with a EmployeeId
// exports.findOne =  (req, res) => {
//     Employee.findByEmail(req.params.email)
//         .then(employee => {
//             if (!employee) {
//                 return res.status(404).send({
//                     message: "duplicate email" + req.params.email
//                 });
//             }
        
        // });

// };





    // Create a Employee
    const employee = new Employee(req.body);
    // Save Employee in the database
    employee.save()
        .then(data => {
            res.redirect('/login');
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee."
            });
        });
};

exports.add = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.email ) {
        return res.status(400).send({
            message: "Enter all the required fields"
        });
    }
    // Create a Employee
    const employee = new Employee(req.body);
    // Save Employee in the database
    employee.save()
        .then(data => {
            res.redirect('/home');
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee."
            });
        });
};

// Retrieve and return all employee from the database.
exports.findAll = (req, res) => {
    Employee.find()
        .then(employee => {
            res.send(employee);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Employee."
            });
        });
};

// Find a single employee with a EmployeeId
exports.findOne =  (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.render('edit_employee', { title: 'Update Employee', buttonName: 'Update', data: employee });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Error retrieving employee with id " + req.params.employeeId
            });
        });

};


// Update a employee identified by the employeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.id || !req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).send({
            message: "Required fields cannot be empty"
        });
    }

    // Find employee and update it with the request body
    Employee.findByIdAndUpdate(req.body.id, req.body, { new: true })
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.body.id
                });
            }
            res.redirect('/home');
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.body.id
                });
            }
            return res.status(500).send({
                message: "Error updating employee with id " + req.body.id
            });
        });
};

// Delete a employee with the specified employeeId in the request
exports.delete = (req, res) => {
    console.log('id', req.params.employeeId)
    Employee.findOneAndDelete({ '_id': req.params.employeeId })
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.redirect('/home');
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Could not delete employee with id " + req.params.employeeId
            });
        });
};
