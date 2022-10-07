import express from "express"; //web server
import bodyParser from "body-parser";
import pg from "pg"; // connection to database
import cors from "cors";

// to connect node with postgreSQL
const { Pool } = pg;
const pool = new Pool({
    'user': 'postgres',
    'host': 'localhost',
    'database': 'todo',
    'password': '010409',
    'port': 5432
});

// app is an object where is our aplicatiob
const app = express();
// app should use bodyParser to gives you information with json.
app.use(bodyParser.json());
// app should use cors to have an access client on our server
app.use(cors());


// inserts data 
app.post("/", async (req, res, next)=> {
    console.log("POST request recieved");
    const task = req.body;

    const client = await pool.connect();
    console.log("connected to database");

    const result = await client.query({
        text: `INSERT INTO todoes
        (todo,complete)
        VALUES($1, $2) RETURNING id;`,
        values: [
            task.todo,
            task.complete
        ]
    });

    const resultObject = {
        id: result.rows[0].id,
        message: `New task : ${task.todo} is created.`
    }

    res.json(resultObject);
});

// gets data
app.get("/", async (req, res, next) => {
    const client = await pool.connect();
    const result = await client.query({
        text: 'SELECT * FROM todoes ORDER BY id DESC;',  // we use "ORDER BY id DESC" to add on top
    });

    res.json(result.rows);
});

// updates data
app.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const todo = req.body;

    const client = await pool.connect();
    const result = await client.query({
        text: `UPDATE todoes
        SET todo = $1, complete = $2
        WHERE id = $3`,
        values: [
            todo.todo,
            todo.complete,
            id
            ]
    });

    res.send(`task with id ${id} updated`)
})

app.delete("/:id", async (req, res, next) => {
    const id = req.params.id;

    const client = await pool.connect();
    const result = await client.query({
        text: `DELETE FROM todoes WHERE id=$1;`,
        values: [id]
    });

    res.send(`task with the id ${id} deleted`)
})


//listens port 4000
app.listen(4000, ()=> {
    console.log("server started on port 4000");
})
