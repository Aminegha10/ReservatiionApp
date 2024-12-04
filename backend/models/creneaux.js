import mongoose from "mongoose";

const Creneaux_Schema = new mongoose.Schema(
  {
    day: String,
    startTime: String,
    endTime: String,
    service: { type: mongoose.Schema.Types.ObjectId, ref: "services" },
  },
  {
    timestamps: true,
  }
);
Creneaux_Schema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    // Reference the Service model
    const Service = mongoose.model("services");

    // Find and update the service that contains the deleted creneaux ID
    await Service.updateOne(
      { creneaux: doc._id }, // Locate the service where this creneaux exists in the array
      { $pull: { creneaux: doc._id } } // Remove the ID from the array
    );

    console.log(`Creneaux ${doc._id} removed from its associated service.`);
  }
});

const Creneaux_Model = new mongoose.model("creneaux", Creneaux_Schema);

export default Creneaux_Model;
