const db = require("../database");

const getAllUsers = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.all("SELECT (name,password) from users WHERE id =?", id, function(err, rows) {
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
    return res.status(401).json({ error: "Could not fetch tasks data" });
  }
};

module.exports = {
    getAllUsers,
}
