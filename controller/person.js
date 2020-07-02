import personValidation from "../model/person";
import dbConnection from "../db/db";


export const createPerson = async (req, res) => {
  try {   
    state = req.body.state
    name = req.body.name
    age = req.body.age
    person = {state,name,age}

    //validate article input
    const { error } =personValidation(person);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //insert article into db
    let result = await dbConnection.query(
      "INSERT INTO persons SET ?",
      person
    );

    return res.status(200).json({
      status: "success",
      data: {
        message: "person created successfuully",
        data:{
            name:result.name,
            age:result.age,
            state:result.state
        }     
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "Error saving into database.Try again"
    });
  }
};

export const editPerson = async (req, res) => {
  const personId = req.params.id;
 
  state = req.body.state
  name = req.body.name
  age = req.body.age
  person = {state,name,age}
  //validate article input
  const { error } = personValidation(person);
  if (error) {
    return res.status(400).json({
      status: "error",
      error: error.details[0].message
    });
  }
  try {
    const query = `UPDATE person SET ? WHERE id =${personId}`;
    const result = await dbConnection.query(query, [person, personId]);
    if (result.changedRows === 0) {
      return res.status(400).json({
        status: "success",
        data: {
          message: "person with this id not found"
        }
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        message: "person info updated successfully",
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: `Cannot update person with`
    });
  }
};

export const deletePerson = async (req, res) => {
  try {
    const personId = req.params.id;
    const query = `DELETE FROM persons WHERE id = ${personId}`;
    const result = await dbConnection.query(query, personId);
    if (result.changedRows === 0) {
      return res.status(400).json({
        status: "success",
        data: {
          message: "person with this id not found"
        }
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        message: "person delete successfully"
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "Sorry cannot delete this from the database"
    });
  }
};