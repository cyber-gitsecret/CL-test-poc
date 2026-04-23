const express = require("express");
const app = express();

// SQL Injection
app.get("/user", (req, res) => {
    const id = req.query.id;
    const query = "SELECT * FROM users WHERE id=" + id;
    res.send(query);
});

// XSS
app.get("/search", (req, res) => {
    res.send("<h1>" + req.query.q + "</h1>");
});

// Command Injection
const { exec } = require("child_process");
app.get("/ping", (req, res) => {
    exec("ping " + req.query.host, (err, out) => {
        res.send(out);
    });
});

app.listen(3000);