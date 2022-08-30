const db = require("../database");

const assignUser = async (req, res) => {
    try {
        console.log("in assignUser")
        const { roleId,userId,projectId} = req.body;
        const id = String(roleId) + String(userId) + String(projectId);
        await db.serialize(function() {
            return db.run("INSERT INTO project_roles (project_id, role_id,  user_id, id) VALUES (?, ?, ?, ?)", 
            [projectId, roleId, userId, id],  function(err) {
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
    assignUser
}