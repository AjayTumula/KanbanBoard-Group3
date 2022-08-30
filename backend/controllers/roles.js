const db = require("../database");

const getAllRoles = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.all("SELECT * from roles", function(err, rows) {
                if(err){
                    res.send("Error encountered while fetching roles");
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
    return res.status(401).json({ error: "Could not fetch Roles data" });
  }
};

module.exports = {
    getAllRoles
}
