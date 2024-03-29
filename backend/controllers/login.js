const db = require("../database");

const getUser = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.all("SELECT id, name, email, password from users WHERE email LIKE ?", [req.body.email], 
            function(err , rows) {
                if(err){
                    res.send("Error encountered while fetching user data");
                    return console.error(err.message);
                }
                else {
                    console.log('login response',rows)
                    if(rows && rows[0].password === req.body.password){
                        res.send({
                            "loggedIn" : true,
                            "id":rows[0].id,
                            "name":rows[0].name,
                            "email":rows[0].email
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

const changePassword = async (req, res) => {
    try {
        await db.serialize(function() {
            console.log("req",req.body)
            return db.all("UPDATE users SET password = ? WHERE users.id = ?" , [req.body.password, req.body.user_id], function(err, rows) {
                if(err){
                    res.send("Error encountered while updating the password");
                    return console.error(err.message);
                }
                else {
                    console.log(res);
                    res.send({
                        data: 'success',
                    });
                }
            });
        });
    } catch (error) {
        console.log('error', error)
    return res.status(401).json({ error: "Could not change password" });
  }
};

module.exports = {
    getUser,
    changePassword,
}
