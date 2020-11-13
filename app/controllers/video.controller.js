const Video = require("../models/video.model.js");

// Create and Save a new Video
exports.create = (req, res) => {
    // Validate request
    if (!req.body) { 
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Video
    const video = new Video({
        //  User_Id: req.body_User_Id,
        Project_Id: req.body.Project_Id,
        Video_Data: req.body.Video_Data
    });

    // Save Video in the database
    Video.create(video, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Video."
            });
        else res.send(data);
    });
};

// Retrieve all Videos from the database.
exports.findAll = (req, res) => {
    Video.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving videos."
            });
        else res.send(data);
    });
};

// Find a single Video with a videoId
exports.findOne = (req, res) => {
    Video.findById(req.params.videoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Video with id ${req.params.videoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Video with id " + req.params.videoId
                });
            }
        } else res.send(data);
    });
};

// Update a Video identified by the videoId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Video.updateById(
        req.params.videoId,
        new Video(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Video with id ${req.params.videoId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Video with id " + req.params.videoId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Video with the specified videoId in the request
exports.delete = (req, res) => {
    Video.remove(req.params.videoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Video with id ${req.params.videoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Video with id " + req.params.videoId
                });
            }
        } else res.send({ message: `Video was deleted successfully!` });
    });
};

// Delete all Videos from the database.
exports.deleteAll = (req, res) => {
    Video.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Videos."
            });
        else res.send({ message: `All Videos were deleted successfully!` });
    });
};