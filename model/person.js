import Joi from "joi";

const person = data => {
  const schema = {
    name: Joi.string()
      .min(4)
      .max(50)
      .trim()
      .required(),
    age: Joi.number()
    .integer()
    .min(0)
    .max(150)
    .required(),
   state: Joi.string()
      .min(3)
      .max(50)
      .trim()
      .required(),
  };
  return Joi.validate(data, schema);
};

export default person;