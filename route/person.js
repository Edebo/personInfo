import express from "express";
import { createPerson} from "../controller/person";

const router = express.Router();

router.get("/",getPersons);
router.post("/",createPerson)
router.patch("/:id", editPerson);
router.delete("/:id",  deletePerson);