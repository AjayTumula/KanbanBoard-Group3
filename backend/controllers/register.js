const db = require("../database");

const addNewUser = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.run("INSERT INTO users (name,password,email) VALUES (?,?,?)", 
            [req.body.name, req.body.password, req.body.email], 
                function(err) {
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
    return res.status(401).json({ error: "Could not insert user data" });
  }
};

module.exports = {
    addNewUser,
}