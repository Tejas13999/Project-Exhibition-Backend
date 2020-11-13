const sql = require("./db.js");

// constructor
const Portfolio = function (portfolio) {
    this.Portfolio_Id = portfolio.Portfolio_Id;
    this.User_Id = portfolio.User_Id;
    this.Bio = portfolio.Bio;
    this.Describe_User = portfolio.Describe_User;
    this.Twitter_Link = portfolio.Twitter_Link;
    this.Facebook_Link = portfolio.Facebook_Link;
    this.Instagram_Link = portfolio.Instagram_Link;
    this.Linkedin_Link = portfolio.Linkedin_Link;
    this.Github_Link = portfolio.Github_Link;
    this.Skill1 = portfolio.Skill1;
    this.Skill2 = portfolio.Skill2;
    this.Skill3 = portfolio.Skill3;
    this.Skill4 = portfolio.Skill4;
    this.Skill5 = portfolio.Skill5;
    this.Skill1_Detail = portfolio.Skill1_Detail;
    this.Skill2_Detail = portfolio.Skill2_Detail;
    this.Skill3_Detail = portfolio.Skill3_Detail;
    this.Skill4_Detail = portfolio.Skill4_Detail;
    this.Skill5_Detail = portfolio.Skill5_Detail;
    this.Edu1_Year = portfolio.Edu1_Year;
    this.Edu2_Year = portfolio.Edu2_Year;
    this.Edu3_Year = portfolio.Edu3_Year;
    this.Edu4_Year = portfolio.Edu4_Year;
    this.Edu1_Inst = portfolio.Edu1_Inst;
    this.Edu2_Inst = portfolio.Edu2_Inst;
    this.Edu3_Inst = portfolio.Edu3_Inst;
    this.Edu4_Inst = portfolio.Edu4_Inst;
    this.Edu1_Deg = portfolio.Edu1_Deg;
    this.Edu2_Deg = portfolio.Edu2_Deg;
    this.Edu3_Deg = portfolio.Edu3_Deg;
    this.Edu4_Deg = portfolio.Edu4_Deg;
    this.Edu1_Marks = portfolio.Edu1_Marks;
    this.Edu2_Marks = portfolio.Edu2_Marks;
    this.Edu3_Marks = portfolio.Edu3_Marks;
    this.Edu4_Marks = portfolio.Edu4_Marks;
    this.Exp1_Year = portfolio.Exp1_Year;
    this.Exp2_Year = portfolio.Exp2_Year;
    this.Exp3_Year = portfolio.Exp3_Year;
    this.Exp1_Comp = portfolio.Exp1_Comp;
    this.Exp2_Comp = portfolio.Exp2_Comp;
    this.Exp3_Comp = portfolio.Exp3_Comp;
    this.Exp1_Post = portfolio.Exp1_Post;
    this.Exp2_Post = portfolio.Exp2_Post;
    this.Exp3_Post = portfolio.Exp3_Post;
    this.Exp1_Detail = portfolio.Exp1_Detail;
    this.Exp2_Detail = portfolio.Exp2_Detail;
    this.Exp3_Detail = portfolio.Exp3_Detail;
    this.Hobby1 = portfolio.Hobby1;
    this.Hobby2 = portfolio.Hobby2;
    this.Hobby3 = portfolio.Hobby3;
    this.Hobby4 = portfolio.Hobby4;

};

Portfolio.create = (newPortfolio, result) => {
    sql.query("INSERT INTO portfolio SET ?", newPortfolio, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created portfolio: ", { id: res.insertId, ...newPortfolio });
        result(null, { id: res.insertId, ...newPortfolio });
    });
};

Portfolio.findById = (id, result) => {
    sql.query(`SELECT * FROM portfolio WHERE portfolio_Id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found portfolio: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found portfolio with the id
        result({ kind: "not_found" }, null);
    });
};

Portfolio.findByName = (userId, result) => {
    sql.query(`SELECT * FROM portfolio WHERE User_Id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("portfolios: ", res[0]);
        result(null, res[0]);
    });
};

Portfolio.getAll = result => {
    sql.query("SELECT * FROM portfolio", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("portfolios: ", res);
        result(null, res);
    });
};

Portfolio.updateById = (Portfolio_Id, portfolio, result) => {
    sql.query(
        "UPDATE portfolio SET User_Id = ?, Bio=?,Describe_User=?,Twitter_Link=?,Facebook_Link=?,Instagram_Link=?,Linkedin_Link=?,Github_Link=?,Skill1=?,Skill2=?,Skill3=?,Skill4=?,Skill5=?,Skill1_Detail=?,Skill2_Detail=?,Skill3_Detail=?,Skill4_Detail=?,Skill5_Detail=?,Edu1_Year=?,Edu2_Year=?,Edu3_Year=?,Edu4_Year=?,Edu1_Inst=?,Edu2_Inst=?,Edu3_Inst=?,Edu4_Inst=?,Edu1_Deg=?,Edu2_Deg=?,Edu3_Deg=?,Edu4_Deg=?,Edu1_Marks=?,Edu2_Marks=?,Edu3_Marks=?,Edu4_Marks=?,Exp1_Year=?,Exp2_Year=?,Exp3_Year=?,Exp1_Comp=?,Exp2_Comp=?,Exp3_Comp=?,Exp1_Post=?,Exp2_Post=?,Exp3_Post=?,Exp1_Detail=?,Exp2_Detail=?,Exp3_Detail=?,Hobby1=?,Hobby2=?,Hobby3=?,Hobby4=? WHERE Portfolio_Id = ?",
        [
            portfolio.User_Id,
            portfolio.Bio,
            portfolio.Describe_User,
            portfolio.Twitter_Link,
            portfolio.Facebook_Link,
            portfolio.Instagram_Link,
            portfolio.Linkedin_Link,
            portfolio.Github_Link,
            portfolio.Skill1,
            portfolio.Skill2,
            portfolio.Skill3,
            portfolio.Skill4,
            portfolio.Skill5,
            portfolio.Skill1_Detail,
            portfolio.Skill2_Detail,
            portfolio.Skill3_Detail,
            portfolio.Skill4_Detail,
            portfolio.Skill5_Detail,
            portfolio.Edu1_Year,
            portfolio.Edu2_Year,
            portfolio.Edu3_Year,
            portfolio.Edu4_Year,
            portfolio.Edu1_Inst,
            portfolio.Edu2_Inst,
            portfolio.Edu3_Inst,
            portfolio.Edu4_Inst,
            portfolio.Edu1_Deg,
            portfolio.Edu2_Deg,
            portfolio.Edu3_Deg,
            portfolio.Edu4_Deg,
            portfolio.Edu1_Marks,
            portfolio.Edu2_Marks,
            portfolio.Edu3_Marks,
            portfolio.Edu4_Marks,
            portfolio.Exp1_Year,
            portfolio.Exp2_Year,
            portfolio.Exp3_Year,
            portfolio.Exp1_Comp,
            portfolio.Exp2_Comp,
            portfolio.Exp3_Comp,
            portfolio.Exp1_Post,
            portfolio.Exp2_Post,
            portfolio.Exp3_Post,
            portfolio.Exp1_Detail,
            portfolio.Exp2_Detail,
            portfolio.Exp3_Detail,
            portfolio.Hobby1,
            portfolio.Hobby2,
            portfolio.Hobby3,
            portfolio.Hobby4,
            Portfolio_Id
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Project with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Portfolio: ", { id: Portfolio_Id, ...portfolio });
            result(null, { id: Portfolio_Id, ...portfolio });
        }
    );
};

Portfolio.remove = (id, result) => {
    sql.query("DELETE FROM portfolio WHERE Portfolio_Id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Project with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Portfolio with id: ", id);
        result(null, res);
    });
};

Portfolio.removeAll = result => {
    sql.query("DELETE FROM portfolio", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Portfolio`);
        result(null, res);
    });
};

module.exports = Portfolio;