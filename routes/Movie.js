const express=require('express');
const bodyparser=require('body-parser');
const MovieRouter = express.Router();
MovieRouter.use(bodyparser.json());
const Movies = require('../models/MovieSchema');

MovieRouter.route('/')
    .get(async (req, res) => {

        try {
            var search = req.query.search || "";
            var page = parseInt(req.query.page) - 1 || 0;
            var limit = parseInt(req.query.limit) || 10;
            var genre = req.query.genre || "All";
            var year = parseInt(req.query.year) || "All";
            let sort = req.query.sort || "rating";

            const resp = await Movies.find({});
            const genres = [...new Set(resp.map((item) => item.genre)), "All"];
            const years = [...new Set(resp.map((item) => item.year)), "All"];

            genre === "All" ? genre = [...genres] : (genre = req.query.genre.split(","));
            year === "All" ? year = [...years] : (year = req.query.year.split(","));
            req.query.sort ? (req.query.sort.split(",")) : (sort = [...sort]);

            let sortBy = {};
            if (sort[1]) {
                sortBy[sort[0]] = sort[1];
            }
            else {
                sortBy[sort[0]] = "asc"
            }

            const total = await Movies.find({ name: { $regex: search, $options: "i" } })
                .where("genre")
                .in([...genre])
                .where("year")
                .in([...year])
                .countDocuments();

            const movies = await Movies.find({ name: { $regex: search, $options: "i" } })
                .where("genre")
                .in([...genre])
                .where("year")
                .in([...year])
                .sort(sortBy)
                .skip(page * limit)
                .limit(limit);
            const response = {
                total,
                genre,
                year,
                movies
            }
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).send(err);
        }

    })
    .post(async (req, res) => {
        try{
            const resp=await Movies.create(req.body);
            res.status(200).json(resp);
        }
        catch (err) {
            res.status(500).send(err);
        }

    })
    .put(async (req, res) => {
        try{
            res.status(300).send("Can't Perform");
        }
        catch (err) {
            res.status(500).send(err);
        }
    })
    .delete(async (req, res) => {
        try{
            const resp=await Movies.remove({});
            res.status(200).json(resp);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

MovieRouter.route('/:id')
    .get(async (req, res) => {
        try{
            const movie=await Movies.findById(req.params.id);
            res.status(200).json(movie);
        }
        catch (err) {
            res.status(500).send(err);
        }
    })
    .post(async (req, res) => {
        try{
            res.status(300).send("Cant Perform post on : "+req.params.id);
        }
        catch (err) {
            res.status(500).send(err);
        }
    })
    .put(async (req, res) => {
        try{
            const movie=await Movies.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            res.status(200).json(movie);
        }
        catch (err) {
            res.status(500).send(err);
        }
    })
    .delete(async (req, res) => {
        try{
            const resp=await Movies.findByIdAndRemove(req.params.id);
            res.status(200).json(resp);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });


module.exports=MovieRouter;