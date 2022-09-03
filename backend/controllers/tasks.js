const db = require("../database");

const getAllTasks = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.all("SELECT t.*, p.name AS priority FROM tasks AS t JOIN priorities AS p ON t.priority_id = p.id", function(err, rows) {
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

const addNewTask = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.run("INSERT INTO tasks (name, status_id, date, description, project_id, priority_id ) VALUES (?, ?, ?, ?, ?, ?)", 
            [req.body.name, req.body.status_id, req.body.date, req.body.description, req.body.project_id, req.body.priority_id],  function(err) {
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

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await db.serialize(function() {
            return db.all("DELETE from tasks WHERE id=?", id, function(err, rows) {
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
    return res.status(401).json({ error: "Could not delete task" });
  }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        await db.serialize(function() {
            console.log("req",req.body)
            return db.all("UPDATE tasks SET name = ?, assignee_id = ?, status_id = ?, date = ?, description = ?, project_id = ?, priority_id = ?  WHERE tasks.id = ?" ,
            [req.body.name, req.body.assignee_id, req.body.status_id, req.body.date, req.body.description, req.body.project_id, req.body.priority_id, id], function(err, rows) {
                if(err){
                    res.send("Error encountered while updating the task");
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
    return res.status(401).json({ error: "Could not update task" });
  }
};

module.exports = {
    getAllTasks,
    addNewTask,
    deleteTask,
    updateTask,
}
