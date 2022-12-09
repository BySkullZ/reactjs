const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
const favs = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true})),
app.use(cors());

app.get('/favs', (req, res) => {
  	res.send(favs);
})

app.post('/favs', (req, res) => {
  	const {id, name, image} = req.body

  	res.send(`Got a POST request from ${req.body.id} (${req.body.name} ${req.body.image})`);
  	favs.push({id: Number(id), name: name, image: image});
})

app.delete('/favs/:id', (req, res) => {
	const id = req.params.id
	const index = favs.findIndex(fav => Number(fav.id) === Number(id))
	if (index === -1) {
	  res.status(400).send("This movie does not exist");
	  return;
	}
  
	favs.splice(index, 1)
  
	res.send('Got a DELETE request')
})

app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`);
})