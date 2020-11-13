const Partner = require("../models/partner.model.js");

// Create and Save a new Partner
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Project
    const partner = new Partner({
        //  User_Id: req.body_User_Id,
        Project_Id: req.body.Project_Id,
        Name: req.body.Name,
        User_Id: req.body.User_Id
    });

    // Save Project in the database
    Partner.create(partner, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Partner."
            });
        else res.send(data);
    });
};

// Retrieve all Partners from the database.
exports.findAll = (req, res) => {
    Partner.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving partners."
            });
        else res.send(data);
    });
};

// Find a single Partner with a partnerId
exports.findOne = (req, res) => {
    Partner.findById(req.params.partnerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Partner with id ${req.params.partnerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Partner with id " + req.params.partnerId
                });
            }
        } else res.send(data);
    });
};

// Find a single Partner with a partnerId
exports.findUser = (req, res) => {
    Partner.findByUser(req.params.partnerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Partner with id ${req.params.partnerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Partner with id " + req.params.partnerId
                });
            }
        } else res.send(data);
    });
};

// Update a Partner identified by the partnerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Partner.updateById(
        req.params.partnerId,
        new Partner(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Partner with id ${req.params.partnerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Partner with id " + req.params.partnerId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Partner with the specified partnerId in the request
exports.delete = (req, res) => {
    Partner.remove(req.params.partnerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Partner with id ${req.params.partnerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Partner with id " + req.params.partnerId
                });
            }
        } else res.send({ message: `Partner was deleted successfully!` });
    });
};

// Delete all Partners from the database.
exports.deleteAll = (req, res) => {
    Partner.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Partners."
            });
        else res.send({ message: `All Partners were deleted successfully!` });
    });
};