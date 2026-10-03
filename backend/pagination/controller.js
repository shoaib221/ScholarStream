
import { Student } from "./model.js";
import express from "express";
export const pageRouter = express.Router();


const FetchStudents = async (req, res, next) => {
    console.log("fetch students");


    try {
        
        const limit = Number(req.query.limit || 10);
        const page = Number(req.query.page || 1);
        const sorty = req.query.sort || "name";
        let order = req.query.order || "asc";
        order = order === 'asc' ? 1 : -1;
        let searchBy  = req.query.searchBy || "name"
        let searchPattern = req.query.pattern || ""
        

        let query = searchBy ? { [searchBy] : { $regex: searchPattern, $options: "i" } }: {};

        // mongoose {} -> query {} -> projection

        let students = await Student.find( query , { email: 0 })
            .sort({ [sorty]: order })
            .skip((page - 1) * limit)
            .limit(limit)
            
            


        const total = await Student.countDocuments({});

        res.status(200).json({
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            students
        })


    } catch (err) {
        console.dir(err)
        res.status(400).json({ error: "invalid" })
    }
}


pageRouter.get("/students", FetchStudents);
