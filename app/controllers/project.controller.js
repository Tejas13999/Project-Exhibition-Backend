const Project = require("../models/project.model.js");

// Create and Save a new Project
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var fs = require('fs');

    // Create a Project
    const project = new Project({
        //  User_Id: req.body_User_Id,
        User_Id: req.body.User_Id,
        Title: req.body.Title,
        Department: req.body.Department,
        Technology: req.body.Technology,
        Description: req.body.Description,
        Link: req.body.Link,
        Date: req.body.Date,
        Software: req.body.Software,
        Hardware: req.body.Hardware,
        Language: req.body.Language,
        Hardware_Kit: req.body.Hardware_Kit,
        Documentation: fs.readFileSync('C:\\Users\\Tejash\\projects\\Project Exhibition\\project_img\\' + req.body.Documentation)
    });

    // Save Project in the database
    Project.create(project, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project."
            });
        else res.send(data);
    });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
    Project.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving projects."
            });
        else res.send(data);
    });
};

// Find a single Project with a projectId
exports.findOne = (req, res) => {
    Project.findById(req.params.projectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.projectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Project with id " + req.params.projectId
                });
            }
        } else res.send(data);
    });
};

// Find a single Project with a userId
exports.findUser = (req, res) => {
    Project.findByName(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Project with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// Find a single Project with a technology
exports.findTech = (req, res) => {
    Project.findByTechnology(req.params.tech, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with technology ${req.params.tech}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Project with technology " + req.params.tech
                });
            }
        } else res.send(data);
    });
};

// Find a single Project with a department
exports.findDept = (req, res) => {
    Project.findByDepartment(req.params.dept, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with department ${req.params.dept}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Project with department " + req.params.dept
                });
            }
        } else res.send(data);
    });
};

// Find a single Project with a language
exports.findLang = (req, res) => {
    Project.findByLanguage(req.params.lang, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with language ${req.params.lang}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Project with language " + req.params.lang
                });
            }
        } else res.send(data);
    });
};

// Find a single Project with a hardwarekit
exports.findHkit = (req, res) => {
    Project.findByHardwareKit(req.params.hkit, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with hardwarekit ${req.params.hkit}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Project with hardwarekit " + req.params.hkit
                });
            }
        } else res.send(data);
    });
};

// Find a single Project with a title
exports.findTitle = (req, res) => {
    Project.findByProTitle(req.params.title, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with title ${req.params.title}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Project with title " + req.params.title
                });
            }
        } else res.send(data);
    });
};

// Find a single Project with a date
exports.findDate = (req, res) => {
    Project.findByDate(req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with title ${req.params.date}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Project with title " + req.params.date
                });
            }
        } else res.send(data);
    });
};

// Find a single Project with a Multiple query
exports.findMulti = (req, res) => {
    Project.findByMulti(req.params.tech,req.params.dept,req.params.title,req.params.lang,req.params.hkit,req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project  ${req.params.date}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Project " + req.params.date
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

    Project.updateById(
        req.params.projectId,
        new Project(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Project with id ${req.params.projectId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Project with id " + req.params.projectId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Project with the specified projectId in the request
exports.delete = (req, res) => {
    Project.remove(req.params.projectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.projectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Project with id " + req.params.projectId
                });
            }
        } else res.send({ message: `Project was deleted successfully!` });
    });
};

// Delete all Project from the database.
exports.deleteAll = (req, res) => {
    Project.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all projects."
            });
        else res.send({ message: `All Projects were deleted successfully!` });
    });
};