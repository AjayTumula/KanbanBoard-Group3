const db = require("../database");

const getUserByProjectId = async (req, res) => {
    const { id } = req.query;

    try {
        await db.serialize(function() {
            return db.get("SELECT u.*, p.role_id AS roleId FROM users AS u JOIN project_roles AS p ON u.id = p.user_id WHERE p.project_id = ?", id, function(err, rows) {
                if(err){
                    res.send("Error encountered while fetching");
                    return console.error(err.message);
                }
                else {
                    res.send({
                        user: rows,
                    });
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "User does not exist" });
  }
};

const getAllUsers = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.all("SELECT * from users", function(err, rows) {
                if(err){
                    res.send("Error encountered while fetching users");
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
    return res.status(401).json({ error: "Could not fetch Users data" });
  }
};
module.exports = {
    getUserByProjectId,
    getAllUsers
}
