const MicroController = require('../models/MicroControllerModel');
const User = require('../models/UserModel');
const { use } = require('../routes/apiRoute');

async function data(req,res)
{
    try{
        const data = await MicroController.findAll()
        return res.status(200).json(data)
    }
    catch(err){
        console.log(err)
    }
}

async function create(req,res)
{
    let seuil = req.body.seuilLuminosite
    let addr= req.body.addrMac  

    const userFind = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    const addrMacFind = await MicroController.findOne({
        where:{
            addrMac:addr
        }
    })

    let microc = null

    if(!addrMacFind)
    {
        microc = new MicroController({
            seuilLuminosite: seuil,
            addrMac: addr,
            user_id:userFind.id
        });

    }else{
        res.status(400).json({error:true,message:'DATA_ALREADY_EXIST'})
    }

    
    const microcSaved = await microc.save(microc)

    if(!microcSaved){
        res.status(400).json({error:true,message:'DATA_NO_FOUND'})
    }else{
        res.status(400).json({error:false,message:microcSaved})
    }
}

async function deleteMicroc(req,res){

    const id = req.body.id

    const count = await MicroController.destroy({
        where:{
            id:id
        }
    })

    if(count !== 1){
        res.status(400).json({error:true,message:'DATA_NO_DELETED'})
    }else{
        res.status(200).json({error:false,message:count})
    }
}


async function updateLightSensor(req,res)
{

}

module.exports = {data,create,updateLightSensor,deleteMicroc};