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
    try {
        const { inputText, description, startDate, endDate, id} = req.body;
        await db.serialize(function() {
            return db.run("INSERT INTO projects (name, id,  description, start_date, end_date ) VALUES (?, ?, ?, ?, ?)", 
            [inputText, id, description, startDate, endDate],  function(err) {
                if(err){
                    res.send("Error encountered while inserting project");
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


module.exports = {
    getAllProjects,
    addNewProject,
}
