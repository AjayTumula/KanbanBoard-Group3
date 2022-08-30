const db = require("../database");

const getUser = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.all("SELECT name, email, password from users WHERE email LIKE ?", [req.body.email], 
            function(err , rows) {
                if(err){
                    res.send("Error encountered while fetching user data");
                    return console.error(err.message);
                }
                else {
                    if(rows && [0].password === req.body.password){
                        res.send({
                            loggedIn : true,
                        });
                    } else {
                        res.send({
                            loggedIn : false,
                        });
                    }
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "Could not fetch user data" });
  }
};

module.exports = {
    getUser,
}
