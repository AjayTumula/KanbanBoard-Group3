const db = require("../database");

const getAllComments = async (req, res) => {
    try {
        const { id } = req.params;
        await db.serialize(function() {
            return db.all("SELECT c.*, u.name AS username FROM comments AS c JOIN users AS u ON c.user_id = u.id WHERE c.task_id =?", id, function(err, rows) {
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
    return res.status(401).json({ error: "Could not fetch comments data" });
  }
};

const addComment = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.run("INSERT INTO comments (task_id, user_id, description) VALUES (?, ?, ?)", [req.body.task_id, req.body.user_id, req.body.description],  function(err) {
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
    return res.status(401).json({ error: "Could not insert comment" });
  }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await db.serialize(function() {
            return db.all("DELETE from comments WHERE id=?", id, function(err, rows) {
                if(err){
                    res.send("Error encountered while deleting");
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
    return res.status(401).json({ error: "Could not delete comment" });
  }
};

module.exports = {
    getAllComments,
    addComment,
    deleteComment,
}
