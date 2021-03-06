const Referral = require("../models/customer.model.js");
//const Referral = Customer;






// Create and Save a new Customer
exports.create = (req, res) => {
      // Validate request
    if (!req.body) {
      res.status(400).send({
      message: "Content can not be empty!"
      });
    }

    // Create a Customer
    const referral = new Referral({
      prefix: req.body.prefix,
      qty: req.body.qty,
      discount: req.body.discount
    });

    // Save Customer in the database

    Referral.create(referral, (err, data) => {
      console.log(referral);
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Customer."
        });
        else {
        //  console.log(data);
          res.send(data);
        }
    });


};



exports.findOne = (req, res) => {
   
  Referral.findById(req.params.referralId, (err, data) => {
   
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Referral with id ${req.params.referralId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Referral with id " + req.params.referralId
            });
          }
        } else res.send(data);
      });
};






// Retrieve all Referral Code from the database.
exports.findAll = (req, res) => {
  //console.log(res);
    Referral.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Referral."
          });
        else res.send(data);
      });
  
};



// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
     // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
   //console.log(req.body);

    Referral.updateById(
       req.params.referralId,
       req.body.email,
       (err, data) => {
      
          if (err) {
              if (err.kind === "not_found") {
              res.status(404).send({
                  message: `Not found referral with id ${req.params.referralId}.`
              });
              } else {
              res.status(500).send({
                  message: "Error updating referral with id " + req.params.referralId
              });
              }
          } else res.send(data);
       }
    );
    
};

// Delete a Referal with the specified referralId in the request
exports.hapus = (req, res) => {
//  console.log("WHAT+++++++++++++++++++++++",req,res);
    
     Referral.remove(req.params.referralId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found referra  with id ${req.params.referralId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete referral with id " + req.params.referralId
            });
          }
        } else res.send({ message: `referral Id was deleted successfully!` });
      });
};




// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Referral.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Referral."
          });
        else res.send({ message: `All Referral were deleted successfully!` });
      });
};







//------------------------------------------ Tester ----------------------------------------------

// // Create and Save a new Customer
// exports.create = (req, res) => {
//         // Validate request
//     if (!req.body) {
//         res.status(400).send({
//         message: "Content can not be empty!"
//         });
//     }

//     // Create a Customer
//     const customer = new Customer({
//         email: req.body.email,
//         name: req.body.name,
//         active: req.body.active
//     });

//     // Save Customer in the database
  
//       Customer.create(customer, (err, data) => {
//         //console.log(customer);
//           if (err)
//           res.status(500).send({
//               message:
//               err.message || "Some error occurred while creating the Customer."
//           });
//           else {
//           //  console.log(data);
//             res.send(data);
//           }
//       });
  
  
// };

// // Retrieve all Customers from the database.
// exports.findAll = (req, res) => {
//   //console.log(res);
//     Customer.getAll((err, data) => {
//         if (err)
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while retrieving customers."
//           });
//         else res.send(data);
//       });
  
// };

// // Find a single Customer with a customerId
// exports.findOne = (req, res) => {
  
//     Customer.findById(req.params.customerId, (err, data) => {
//         if (err) {
//           if (err.kind === "not_found") {
//             res.status(404).send({
//               message: `Not found Customer with id ${req.params.customerId}.`
//             });
//           } else {
//             res.status(500).send({
//               message: "Error retrieving Customer with id " + req.params.customerId
//             });
//           }
//         } else res.send(data);
//       });
// };

// // Update a Customer identified by the customerId in the request
// exports.update = (req, res) => {
//      // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   Customer.updateById(
//         req.params.customerId,
//         new Customer(req.body),
//         (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//             res.status(404).send({
//                 message: `Not found Customer with id ${req.params.customerId}.`
//             });
//             } else {
//             res.status(500).send({
//                 message: "Error updating Customer with id " + req.params.customerId
//             });
//             }
//         } else res.send(data);
//         }
//     );
    
// };

// // Delete a Customer with the specified customerId in the request
// exports.delete = (req, res) => {
//     Customer.remove(req.params.customerId, (err, data) => {
//         if (err) {
//           if (err.kind === "not_found") {
//             res.status(404).send({
//               message: `Not found Customer with id ${req.params.customerId}.`
//             });
//           } else {
//             res.status(500).send({
//               message: "Could not delete Customer with id " + req.params.customerId
//             });
//           }
//         } else res.send({ message: `Customer was deleted successfully!` });
//       });
// };

// // Delete all Customers from the database.
// exports.deleteAll = (req, res) => {
//     Customer.removeAll((err, data) => {
//         if (err)
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all customers."
//           });
//         else res.send({ message: `All Customers were deleted successfully!` });
//       });
// };