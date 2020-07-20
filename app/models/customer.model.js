const sql =require ('./db.js')
//constructor 

// const Customer = function(customer) {
//     this.email = customer.email;
//     this.name = customer.name;
//     this.active = customer.active;
//   };

const Referral= function(referral) {
    this.prefix = referral.prefix;
    this.qty = referral.qty;
    this.discount = referral.discount;
  };


  Referral.create =(newRef, result)=>{
        function pad(num, size) {
          var s = "0000" + num;
          return s.substr(s.length-size);
        }
        var val = parseInt(newRef.qty) ;
        let tempData = [];
      // console.log("Valued ---------> ", newRef.qty);
        for(var i=1; i<=val; i++){

            
            let seq = pad(i,4);
            let arrList = [];
            var dateNow = new Date();
            var dtYear = dateNow.getFullYear();
            var dtMonth = dateNow.getMonth()+1;
            var dtNow =dtYear+""+dtMonth;

            let rfCode = newRef.prefix+dtNow+seq;
          // console.log("nomor Referral :",rfCode+"   Discount :"+newRef.discount);
            arrList.push(rfCode,newRef.discount);
            tempData.push(arrList) ;
          
              //var  a=pad(i,3); 
            //console.log("Nomor Referral", a);
        }
        console.log(tempData);
            let stmt = `INSERT INTO spree_referrals (ref_code,discount) VALUES ? `;
            let todo =tempData;

            sql.query(stmt,[todo],(err,res)=>{
              if(err){
                
                  console.log("error",err);
                  result(err,null);
                  return;
              }
              //if(i===10){        
                console.log("created Ref Code: ", { id: res.insertId, ...newRef });
                result(null, { todo});
            // }
              
            });
 
  }



  Referral.findById=(referralId,result)=>{
   //console.log("Nomor id============> ",referralId);
      sql.query(`SELECT * FROM spree_referrals WHERE id =${referralId}`, (err,res)=>{
          if(err){
              console.log("Error",err);
              result(err,res);
              return;
          }

          if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          // not found Customer with the id
          result({ kind: "not_found" }, null);
      })
  }


   Referral.getAll = result => {
    sql.query("SELECT * FROM spree_referrals", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("spree_referrals: ", res);
      result(null, res);
    });
  };





 
 
  function getId(refEmail){
     return new Promise (resolve => {
          sql.query(`SELECT id FROM spree_users WHERE  email=?`,[refEmail],  (err, result)=> {
          if (err){ 
            console.log(err); // retunr error
          }
            //idUser=result[0].id;
            //return idUser;
            resolve(result[0].id);
          }
        );

     })
 

  } 

  Referral.updateById = async function (id, refEmail, result) {

    let idUser = await getId(refEmail);
    //console.log(idUser); 
     
        sql.query("UPDATE spree_referrals SET user_id = ?, email = ? WHERE id = ?",
          [idUser, refEmail , id], (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
      
            if (res.affectedRows == 0) { 
              // not found Customer with the id
              result({ kind: "not_found" }, null);
              return;
            }
      
            console.log("updated referral: ", { id: idUser, refEmail });
            result(null, { id: idUser, refEmail });
          }
        );
    
      //  console.log(idUser, refEmail , id);
  };




  Referral.remove = (id, result) => {
 
    sql.query("DELETE FROM spree_referrals WHERE id = ?",[id], (err, res) => {
      if (err) {
        
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found referral with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Referral with id: ", id);
      result(null, res);
    });
  };
  



  Referral.removeAll = result => {
    sql.query("DELETE FROM spree_referrals", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} Referral`);
      result(null, res); 
    });
  };











  module.exports = Referral;

//=========================== Testert +===========================
  // Customer.create =(newCustomer, result)=>{
  //     sql.query("INSERT INTO customers SET ?" ,newCustomer,(err,res)=>{
  //         if(err){
            
  //             console.log("error",err);
  //             result(err,null);
  //             return;
  //         }
  //         //if(i===10){        
  //           console.log("created customer: ", { id: res.insertId, ...newCustomer });
  //           result(null, { id: res.insertId, ...newCustomer });
   
  //       // }
          
  //     });

    
   
  // }

  // Customer.findById=(customerId,result)=>{
  //   console.log(customerId);
  //     sql.query(`SELECT * FROM customers WHERE id =${customerId}`, (err,res)=>{
  //         if(err){
  //             console.log("Error",err);
  //             result(err,res);
  //             return;
  //         }

  //         if (res.length) {
  //           console.log("found customer: ", res[0]);
  //           result(null, res[0]);
  //           return;
  //         }
      
  //         // not found Customer with the id
  //         result({ kind: "not_found" }, null);
  //     })
  // }

  // Customer.getAll = result => {
  //   sql.query("SELECT * FROM customers", (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }
  
  //     console.log("customers: ", res);
  //     result(null, res);
  //   });
  // };
  
  // Customer.updateById = (id, customer, result) => {
  //   sql.query("UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
  //     [customer.email, customer.name, customer.active, id],
  //     (err, res) => {
  //       if (err) {
  //         console.log("error: ", err);
  //         result(null, err);
  //         return;
  //       }
  
  //       if (res.affectedRows == 0) {
  //         // not found Customer with the id
  //         result({ kind: "not_found" }, null);
  //         return;
  //       }
  
  //       console.log("updated customer: ", { id: id, ...customer });
  //       result(null, { id: id, ...customer });
  //     }
  //   );
  // };
  
  // Customer.remove = (id, result) => {
  //   sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }
  
  //     if (res.affectedRows == 0) {
  //       // not found Customer with the id
  //       result({ kind: "not_found" }, null);
  //       return;
  //     }
  
  //     console.log("deleted customer with id: ", id);
  //     result(null, res);
  //   });
  // };
  
  // Customer.removeAll = result => {
  //   sql.query("DELETE FROM customers", (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }
  
  //     console.log(`deleted ${res.affectedRows} customers`);
  //     result(null, res); 
  //   });
  // };
  

 // module.exports = Customer,Referral;