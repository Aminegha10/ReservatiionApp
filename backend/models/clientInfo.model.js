import mongoose from "mongoose";

const clientInfoShema = new mongoose.Schema({
    prenom:{
        type:String,
        required:true
    },
    nom:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telephone:{
        type:String,
        required:true
    },
    notificationPreference:{
        type:String,
        enum:["email", "sms"],
        required:true
    },
    rappelAutomatique:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps:true
    }
)

const ClientInfo = mongoose.model("ClientInfo", clientInfoShema);

export default ClientInfo;