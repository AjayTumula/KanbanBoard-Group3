const addNewUser = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.run("INSERT INTO users (name,password) VALUES (?)(?)", [req.body.name],[req.body.pwd],  function(err, data) {
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
    addNewUser,
}