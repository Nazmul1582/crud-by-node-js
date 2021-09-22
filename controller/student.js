const Student = require("../model/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "apf4q09uxcngck-9qnbtgv;lau54(h*ih_*hR7";

const getById = (req, res) => {
  var { id } = req.params;
  res.send(`Your ID is - ${id}`);
};


const getAll = async(req,res)=> {
  const student = await Student.find({isDeleted:false});
  if(student.length){
    res.status(200).send(student);
  }else{
    res.json("No student found");
  }
};

const register = async (req, res) => {
  try{
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.password = hashedPassword;
    const student = new Student(req.body);
    const data = await student.save();
    res.json({
      message: "Student added successfully",
      data
    });
  }catch(error){
    res.json({
      error
    });
  }
}

const login = async (req, res) => {
  try{
    const {email, password} = req.body;
    const student = await Student.findOne({email});
    if(student){
      const isValid = await bcrypt.compare(password, student.password);
      if(isValid){
        const data = {
          name : student.name,
          email: student.email
        }
        const token = await jwt.sign(data, secretKey, {expiresIn: "1h"})
        res.status(200).send({
          message: "Login successful",
          token
        })
      }else{
        res.json({
          message: "Password doesn't match"
        })
      }
    }else{
      res.json({
        message: "No student found"
      })
    }
  }catch(error){
    res.json({
      error
    })
  }
}

const update = async (req, res) =>{
  try{
    const id = req.params.id;
    await Student.findOneAndUpdate(
      {_id : id}, 
      {
        $set : req.body
      },
      {
        multi: true
      }
    )
    res.status(200).send({
      message: "Student info has successfully updated",
      data : req.body
    })
  }catch(error){
    res.json({
      error
    })
  }
}

const temporeryDelete = async(req, res) => {
  try{
    const id = req.params.id;
    await Student.findOneAndUpdate(
      {_id: id},
      {
        $set : {isDeleted : true}
      }
    )
    res.json({
      message:"Student temporery deleted successfully"
    });
  }catch(error){
    res.json({
      error
    })
  }
}

const restore = async(req, res) => {
  const id = req.params.id;
  await Student.findOneAndUpdate(
    {_id : id},
    {
      $set : { isDeleted: false}
    }
  )
  res.json({
    message: "Student has successfully restored"
  })
}

const deleteStudent = async (req ,res) => {
  try{
    const id = req.params.id;
    await Student.findOneAndDelete(
      {_id : id},
    )
    res.json({
      message: "Student has deleted successfully"
    })
  }catch(error){
    res.json({
      error
    });
  }
}

// ================= update password doesn't work parfectly ================

const updatePassword = async (req, res) => {
  try {
    const id = res.params.id;
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await Student.findOneAndUpdate(
      {_id: id},
      {
        $set: {password: hashedPassword}
      },
      {
        multi: true
      }
    )
    res.status(200).send({
      message: "Password updated successfully"
    })
  } catch (error) {
    res.json({
      error
    });
  }
}

const filterByAge = async (req, res) => {
  try {
    const student = await Student.find(
      {"age": {$gt: 10 , $lt:16}}
    )
    res.status(200).send({
      message: "All Student of age 10 to 15",
      student
    })
  } catch (error) {
    res.json({error})
  }
}

const filterByClass = async(req, res) => {
  try {
    const student = await Student.find(
      {"section": "A", "class": "5"}
    )
    res.json({
      message: "All value of section A and Class 5",
      student
    })
  } catch (error) {
    res.json({error});
  }
}

module.exports = {
    getById,
    getAll,
    register,
    login,
    update,
    temporeryDelete,
    restore,
    deleteStudent,
    updatePassword,
    filterByClass,
    filterByAge    
}