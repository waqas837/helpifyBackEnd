const mongoose = require("mongoose");
const imagesSchema = mongoose.Schema({
  images: [
    {
      addId: { type: mongoose.Schema.Types.ObjectId, ref: "creatAdd" },
      myimages:{
        type:Array,
      },
    },
  ],
});
const imagesData = mongoose.model("images", imagesSchema);
module.exports = {imagesData}
