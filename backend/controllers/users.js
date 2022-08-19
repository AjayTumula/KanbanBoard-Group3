const db = require("../database");

const getUserById = async (req, res) => {
    const { id } = req.query;

    try {
        const user = await db.serialize(function() {
            return db.get("SELECT id, name, password FROM users WHERE id =?", id, function(err, rows) {
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

module.exports = {
    getUserById,
}
