const db = require("../database");

const getAllStatuses = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.all("SELECT * from statuses", function(err, rows) {
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
    return res.status(401).json({ error: "Could not fetch status data" });
  }
};

const addNewStatus = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.run("INSERT INTO statuses (name) VALUES (?)", [req.body.name],  function(err, data) {
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
    return res.status(401).json({ error: "Could not insert status data" });
  }
};

module.exports = {
    getAllStatuses,
    addNewStatus,
}
