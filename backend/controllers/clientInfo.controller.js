import clientInfoModel from "../models/clientInfo.model.js";

//get all clients infos
export const getAllClientInfo = async (req, res) =>{
  try{
    const clientInfos = await clientInfoModel.find();
    if(clientInfos.length > 0){
        res.status(200).json({success:true, data:clientInfos});
    }else{
        res.status(404).json({success:true, message:"no clients infos"});
    }
  }
  catch(error){
    console.log("Erreur dans le lire de les infos ");
    res.status(500).json({success:false, message:"Erreur dans le serveur"})
  }
}


//create client info
export const createClientInfo = async (req, res) =>{
    try{
        const clientInfo = new clientInfoModel({
           prenom:req.body.prenom,
           nom:req.body.nom,
           email:req.body.email,
           telephone:req.body.telephone,
           notificationPreference:req.body.notificationPreference,
           rappelAutomatique:req.body.rappelAutomatique === "on" // Convert checkbox value to boolean
        })
        const newClientInfo = await clientInfoModel.create(clientInfo);
        res.status(201).json({success:true, data:newClientInfo});
    }
    catch(error){
           console.error("Erreur dans la creation du des infos");
           res.status(500).json({success:false, message:"Erreur dans le serveur"})
    }
}

