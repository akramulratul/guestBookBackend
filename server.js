const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;

// Use CORS middleware to handle CORS preflight requests
app.use(cors());

app.get("/api/v1/search/typeahead", (req, res) => {
  const query = req.query.query;

  axios
    .get(
      `https://theguestbook.com/api/v1/search/typeahead?search_page_id=12&query=${query}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

app.get("/api/v1/search/get_coords", (req, res) => {
  const { search_type, query } = req.query;
  axios
    .get(
      `https://theguestbook.com/api/v1/search/get_coords?search_type=${search_type}&query=${query}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
