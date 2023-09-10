const fs = require('fs');


const createItem = (req, res) => {
          //get the existing items
          const itemDb = fs.readFileSync('./items/items.json');
          const itemObj = JSON.parse(itemDb);
         const item = req.body;

         itemObj.push(item)

         fs.writeFile('./items/items.json', JSON.stringify(itemObj), (err) => {
            if(err) {
                res.status(500).json({message: "Internal Server Error"})
            }
            res.status(200).json(item)
         })

     
    
  


};

const getAllItems = (req, res) => {
    

    const itemDb = fs.readFileSync('./items/items.json');
    res.send(itemDb);

 };
    

const getItem = (req, res) => {
    const id = req.params.id 

    const itemDb = fs.readFileSync('./items/items.json');
         
    const foundItem = itemDb.find((item)=>{
        return item.id == parseInt(id)
    })
    if(!foundItem){
        res.status(404).send(`Item not found`)
    }
    res.status(200).json(foundItem)
};

const updateItem = (req, res) => {
    const id = req.params.id
    //get the update item
    const item = req.body
    //get the existing items
    const itemDb = fs.readFileSync('./items/items.json');
    const itemObj = JSON.parse(itemDb);
    //check if the item exist    
    const findItem = itemObj.find( item => item.id === parseInt(id) )
    if (!findItem) {
        return res.status(409).send({error: true, msg: 'item does not exist'})
    }
    //filter the items
    const updateItem = itemObj.filter( item => item.id === parseInt(id))
    //push the updated item
    updateItem.push(item)
    //finally save it
   
    
    fs.writeFile('./items/items.json', JSON.stringify(updateItem, (err) => {
        if(err) {
            res.status(500).json({message: "Internal Server Error"})
        }
        res.status(200).json(item)
     }))

    res.send({success: true, msg: 'Item updated successfully'})


};

const deleteItem = (req, res) => {
    const id = req.params.id

    const itemDb = fs.readFileSync('./items/items.json');
    const itemObj = JSON.parse(itemDb);
    //check if the item exist    
    
    const filterItem = itemObj.filter( item =>item.id !== parseInt(id) )
    if ( items.length === filterItem.length ) {
        return res.status(409).send({error: true, msg: 'item does not exist'})
    }
    
    fs.writeFile('./items/items.json', JSON.stringify(filterItem), (err) => {
        if(err) {
            res.status(500).json({message: "Internal Server Error"})
        }
        res.status(200).json(filterItem)
     })
    res.send({success: true, msg: 'Item removed successfully'})
};



module.exports = { createItem, getAllItems, getItem, updateItem, deleteItem };