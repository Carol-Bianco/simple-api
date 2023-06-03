const express = require('express');
const app = express();

app.listen(3000, () => console.log('Server listening on port 3000'))

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const items = [
	{
		id: 0,
		name: "Test"		
	}
]

//get all items on array
app.get('/items', (req, resp) =>{
	resp.status(200).json(items)
})

//get item by id
app.get('/items/:id',(req, resp) =>{
	const item = items.find(i => i.id === +req.params.id)
	if(!item) return resp.status(404).send('Item not found')
	resp.status(200).json(item)
})

//add item
app.post('/items', (req, resp) => {
    if(req.body.name){
        const newItem = {
            id: items.length + 1,
            name: req.body.name		
        }
        
        items.push(newItem)
        return resp.status(201).json(newItem)			
    }
    else{
        return resp.status(400).send('Add item name!')
    }
})

//edit item
app.put('/item/:id', (req, resp) =>{
	const item = items.find(i => i.id === +req.params.id)
	if(!item) return resp.status(404).send('Item not found')
	item.name = req.body.name
	return resp.status(200).json(item)
})

//delete item
app.delete('/item/:id', (req, resp) => {
	const item = items.find(i => i.id === +req.params.id)
	if(!item) return resp.status(404).send('Item not found')
    const index = items.indexOf(item)
	items.splice(index, 1)
	return resp.status(200).json(items)
})