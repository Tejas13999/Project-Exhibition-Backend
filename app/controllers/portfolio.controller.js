const Portfolio = require("../models/portfolio.model.js");

// Create and Save a new portfolio
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a portfolio
    const portfolio = new Portfolio({
        //  User_Id: req.body_User_Id,
        User_Id: req.body.User_Id,
        Bio: req.body.Bio,
        Describe_User: req.body.Describe_User,
        Twitter_Link: req.body.Twitter_Link,
        Facebook_Link: req.body.Facebook_Link,
        Instagram_Link: req.body.Instagram_Link,
        Linkedin_Link: req.body.Linkedin_Link,
        Github_Link: req.body.Github_Link,
        Skill1: req.body.Skill1,
        Skill2: req.body.Skill2,
        Skill3: req.body.Skill3,
        Skill4: req.body.Skill4,
        Skill5: req.body.Skill5,
        Skill1_Detail: req.body.Skill1_Detail,
        Skill2_Detail: req.body.Skill2_Detail,
        Skill3_Detail: req.body.Skill3_Detail,
        Skill4_Detail: req.body.Skill4_Detail,
        Skill5_Detail: req.body.Skill5_Detail,
        Edu1_Year: req.body.Edu1_Year,
        Edu2_Year: req.body.Edu2_Year,
        Edu3_Year: req.body.Edu3_Year,
        Edu4_Year: req.body.Edu4_Year,
        Edu1_Inst: req.body.Edu1_Inst,
        Edu2_Inst: req.body.Edu2_Inst,
        Edu3_Inst: req.body.Edu3_Inst,
        Edu4_Inst: req.body.Edu4_Inst,
        Edu1_Deg: req.body.Edu1_Deg,
        Edu2_Deg: req.body.Edu2_Deg,
        Edu3_Deg: req.body.Edu3_Deg,
        Edu4_Deg: req.body.Edu4_Deg,
        Edu1_Marks: req.body.Edu1_Marks,
        Edu2_Marks: req.body.Edu2_Marks,
        Edu3_Marks: req.body.Edu3_Marks,
        Edu4_Marks: req.body.Edu4_Marks,
        Exp1_Year: req.body.Exp1_Year,
        Exp2_Year: req.body.Exp2_Year,
        Exp3_Year: req.body.Exp3_Year,
        Exp1_Comp: req.body.Exp1_Comp,
        Exp2_Comp: req.body.Exp2_Comp,
        Exp3_Comp: req.body.Exp3_Comp,
        Exp1_Post: req.body.Exp1_Post,
        Exp2_Post: req.body.Exp2_Post,
        Exp3_Post: req.body.Exp3_Post,
        Exp1_Detail: req.body.Exp1_Detail,
        Exp2_Detail: req.body.Exp2_Detail,
        Exp3_Detail: req.body.Exp3_Detail,
        Hobby1: req.body.Hobby1,
        Hobby2: req.body.Hobby2,
        Hobby3: req.body.Hobby3,
        Hobby4: req.body.Hobby4
        
    });

    // Save portfolio in the database
    Portfolio.create(portfolio, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the portfolio."
            });
        else res.send(data);
    });
};

// Retrieve all portfolios from the database.
exports.findAll = (req, res) => {
    Portfolio.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Portfolios."
            });
        else res.send(data);
    });
};

// Find a single Portfolio with a portfolioId
exports.findOne = (req, res) => {
    Portfolio.findById(req.params.portfolioId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Portfolio with id ${req.params.portfolioId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Portfolio with id " + req.params.portfolioId
                });
            }
        } else res.send(data);
    });
};

// Find a single Project with a userId
exports.findUser = (req, res) => {
    Portfolio.findByName(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Portfolio with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Portfolio with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// Update a Portfolio identified by the portfolioId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Portfolio.updateById(
        req.params.portfolioId,
        new Portfolio(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Portfolio with id ${req.params.portfolioId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Portfolio with id " + req.params.portfolioId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Project with the specified projectId in the request
exports.delete = (req, res) => {
    Portfolio.remove(req.params.portfolioId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Portfolio with id ${req.params.portfolioId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Portfolio with id " + req.params.portfolioId
                });
            }
        } else res.send({ message: `Portfolio was deleted successfully!` });
    });
};

// Delete all Portfolio from the database.
exports.deleteAll = (req, res) => {
    Portfolio.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Portfolios."
            });
        else res.send({ message: `All Portfolios were deleted successfully!` });
    });
};


