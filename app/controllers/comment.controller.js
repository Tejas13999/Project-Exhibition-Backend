const Comment = require("../models/comment.model.js");

// Create and Save a new Project
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Project
    const comment = new Comment({
        //  User_Id: req.body_User_Id,
        User_Name: req.body.User_Name,
        Project_Id: req.body.Project_Id,
        Comment_Data: req.body.Comment_Data,
        Comment_Date: req.body.Comment_Date
    });

    // Save Project in the database
    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment."
            });
        else res.send(data);
    });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
    Comment.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Comments."
            });
        else res.send(data);
    });
};
/*
// Find a single Project with a projectId
exports.findOne = (req, res) => {
    Comment.findById(req.params.commentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Comment with id ${req.params.commentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Comment with id " + req.params.commentId
                });
            }
        } else res.send(data);
    });
};*/

// Find a single Project with a userId
exports.findUser = (req, res) => {
    Comment.findByName(req.params.projectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Comment with id ${req.params.projectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Comment with id " + req.params.projectId
                });
            }
        } else res.send(data);
    });
};

// Update a Project identified by the projectId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Comment.updateById(
        req.params.commentId,
        new Comment(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Comment with id ${req.params.commentId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Comment with id " + req.params.commentId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Project with the specified projectId in the request
exports.delete = (req, res) => {
    Comment.remove(req.params.commentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Comment with id ${req.params.commentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Comment with id " + req.params.commentId
                });
            }
        } else res.send({ message: `Comment was deleted successfully!` });
    });
};

// Delete all Project from the database.
exports.deleteAll = (req, res) => {
    Comment.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Comments."
            });
        else res.send({ message: `All Comments were deleted successfully!` });
    });
};