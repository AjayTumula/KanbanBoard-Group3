const db = require("../database");

const getAllProjects = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.all("SELECT * from projects", function(err, rows) {
                if(err){
                    res.send("Error encountered while fetching");
                    return console.error(err.message);
                }
                else {
                    res.send({
                        data: rows,
                    });
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "Could not fetch Project data" });
  }
};

const addNewProject = async (req, res) => {
    //pending updating project_roles data
    try {
        await db.serialize(function() {
            return db.run("INSERT INTO projects (name) VALUES (?)", [req.body.name],  function(err, data) {
                if(err){
                    res.send("Error encountered while inserting");
                    return console.error(err.message);
                }
                else {
                    res.send({
                        status: 'success'
                    });
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "Could not create new Project" });
  }
};

//getting individual projects
//generating project_roles table data

module.exports = {
    getAllProjects,
    addNewProject,
}
