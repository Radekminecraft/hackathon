const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");

const db = mysql.createPool({
  host: "bauxslat3clrt4seb2dx-mysql.services.clever-cloud.com",
	user: "ugugbjmjcongpmfg",
	password: process.env.PASSWORD,
	database: "bauxslat3clrt4seb2dx",
	charset: "utf8mb4",
	multipleStatements: true,
});

//middleware
app.use(cors());
app.use(express.json());

//get all houses - ADMIN, DELETE LATER!!!!
app.get("/houses", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	const sql = `

SELECT * FROM houses; 
  `;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});


// Get houses of a user
app.get("/houses/:id", (req, res) => {
    console.log(req.params.id);

    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    const sql = `
        SELECT 
            houses.id AS house_id,
            houses.address,
            houses.created_at,
            users.user_id AS user_id,
            users.username,
            users.pfp,
            users.email
        FROM houses
        INNER JOIN users ON houses.user_id = users.user_id
        WHERE users.user_id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Failed to fetch houses" });
        }
        res.status(200).send(result);
    });
});

// Get residents of a specific house
app.get("/houses/:houseId/residents", (req, res) => {
    console.log(req.params.houseId);

    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    const sql = `
        SELECT 
            residents.id AS resident_id,
            residents.name AS resident_name,
            houses.id AS house_id,
            houses.address AS house_address
        FROM residents
        INNER JOIN houses ON residents.house_id = houses.id
        WHERE houses.id = ?
    `;

    db.query(sql, [req.params.houseId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Failed to fetch residents" });
        }
        res.status(200).send(result);
    });
});

// Add a new resident to a specific house
app.post("/houses/:houseId/residents", (req, res) => {
    const { name, pfp } = req.body; // Expecting name and pfp URL in request body
    const { houseId } = req.params; // Get the houseId from route parameter

    // Check if name is provided
    if (!name) {
        return res.status(400).send({ error: "Name is required" });
    }

    const sql = `
        INSERT INTO residents (house_id, name, pfp)
        VALUES (?, ?, ?);
    `;

    db.query(sql, [houseId, name, pfp || null], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Failed to add resident" });
        }
        res.status(201).send({ message: "Resident added successfully", residentId: result.insertId });
    });
});







//add a user - sign up
app.post("/users", async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	//hash
	const post = req.body;

	let password = post[2].password;

	//const salt = await bcrypt.genSalt();
	password = await bcrypt.hash(password, 10);

	const sql = `
		INSERT INTO users(email, username, user_password) VALUES( ?, ?, ?);
	`;
	db.query(
		sql,
		[post[0].email, post[1].username, password],
		(err, result) => {
			if (err) res.send(err);
			res.send(result);
		}
	);
});

//get number of users
app.get("/users-number", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	const sql = `
		SELECT
		COUNT(*) AS id
		FROM users;`;
	db.query(sql, (err, result) => {
		if (err) throw err.message;
		res.send(result);
		console.log("users number");
	});
});

//create a post
app.post("/posts", async (req, res) => {
	try {
		console.log("post");

		const reqe = req.body;

		const sql = `INSERT INTO posts(body, datum, user_id, video_id) VALUES(?, now(), ?, ?);`;

		console.log(reqe);
		console.log(reqe[2].link);

		db.query(
			sql,
			[reqe[1].body, reqe[0].id + 1, reqe[2].link],
			(err, result) => {
				if (err) throw err.message;
				res.send(result);
			}
		);
	} catch (error) {
		console.log(error);
	}
});

//update a user

app.put("/users/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const respo = req.body;
		console.log([respo[0].username, respo[1].imgLink, id]);

		const updateTodo = await db.query(
			`UPDATE users SET username = ?, pfp = ? WHERE user_id = ?`,
			[respo[0].username, respo[1].imgLink, id]
		);

		res.json("user was updated");
	} catch (error) {
		console.log(error);
	}
});

//check if login is correct
app.post("/users-login/:email", async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);

	const reqe = req.body;

	const email = req.params.email;

	let password = reqe[0].password;

	const sql = `

		SELECT * FROM User
		WHERE email = ?
	`;
	db.query(sql, [email], async (err, result) => {
		if (err) throw err;
		console.log(result);
		if (!result.lenght) {
			res.send(["wrong email"]);
			return;
		}

		const user_password = result[0].user_password;
		password = await bcrypt.hash(password, user_password);
		console.log([user_password, password]);

		if (user_password === password) {
			res.send(result);
			console.log("users login");
			return;
		}
		console.log("login failed");
		res.send([]);
	});
});
app.delete("/posts/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletePost = await db.query("DELETE FROM posts WHERE id = ?", [
			id,
		]);
		res.json("Post was deleted!");
	} catch (error) {
		console.log(error);
	}
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
