const express = require('express')


const router = express.Router()

const Item = require('../Model/item')


router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})


router.post('/', async(req, res) => {
   try {
    const newItem = await new Item({
        name : req.body.name
    })
    newItem.save()
    .then(item => res.json(item)) 
   } catch (error) {
      return res.json({error})
   }
})


router.delete('/:id',async(req,res)=>{
    try {
        const _id = req.params.id
        await Item.findById(_id)
        .then(item => item.remove().then(()=> res.json({success:true})))
    } catch (error) {
        return res.status(404).json({success:false,msg:'No data present with id:'+_id})
    }
})



module.exports = router