const CreateAdd = require("../Model/createAddModel");
const { imagesData } = require("../Model/imagesModel");
// const appErrors = require("../Utils/appErrors");
exports.newAdd = async (req, res, next) => {
  const arr = [];
  const alldata =req.files;
  // for (let index = 0; index < alldata.length; index++) {
  //   const element = alldata[index];
  //   const val1 = element.uploadedImages+index.toString();
  //   console.log(val1);
  //   // if(`${element.uploadedImages}${index}`){
  //   //   const image = alldata.uploadedImages1.map((val) => val.path);
  //   //     arr.push(image);
  //   // }
   
  // }
  // checkup undefined in array
  if (alldata.uploadedImages+i) {
    const image1 = alldata.uploadedImages1.map((val) => val.path);
    arr.push(image1);
  }
  if (alldata.uploadedImages2) {
    const image2 = alldata.uploadedImages2.map((val) => val.path);
    arr.push(image2);
  }
  if (alldata.uploadedImages3) {
    const image3 = alldata.uploadedImages3.map((val) => val.path);
    arr.push(image3);
  }
  if (alldata.uploadedImages4) {
    const image4 = alldata.uploadedImages4.map((val) => val.path);
    arr.push(image4);
  }
  if (alldata.uploadedImages5) {
    const image5 = alldata.uploadedImages5.map((val) => val.path);
    arr.push(image5);
  }
  if (alldata.uploadedImages6) {
    const image6 = alldata.uploadedImages6.map((val) => val.path);
    arr.push(image6);
  }

  const { id } = req.params;
  const { category, title, description, time, pickupaddress, dropoffaddress } =
    req.body;
  try {
 //create add
    const data = await CreateAdd.create({
      userId: [{ user: id }],
      category,
      title,
      description,
      time,
      pickupaddress,
      dropoffaddress,
    });
   //2.create images

    await imagesData.create({
      images: [{ addId: data._id, myimages: arr }],
    });
  } catch (error) {
    console.log(error);
  }
};
//finding the user add data that we have created
exports.findOutTestdata = async (req, res, next) => {
  //successfully worked finduser data only passed as referce by id
  try {
    const data = await CreateAdd.find({ "userId.user": req.params.id });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
