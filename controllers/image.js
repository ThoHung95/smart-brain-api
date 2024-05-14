// const returnClarifaiRequestOptions = (imageUrl) => {
//   // Your PAT (Personal Access Token) can be found in the Account's Security section
//   const PAT = "1c554fd8e7f449e7a9d02002e3c74542";
//   // Specify the correct user_id/app_id pairings
//   // Since you're making inferences outside your app's scope
//   const USER_ID = "clarifai";
//   const APP_ID = "main";
//   // Change these to whatever model and image URL you want to use
//   // const MODEL_ID = 'face-detection';
//   const IMAGE_URL = imageUrl;

//   const raw = JSON.stringify({
//     user_app_id: {
//       user_id: USER_ID,
//       app_id: APP_ID,
//     },
//     inputs: [
//       {
//         data: {
//           image: {
//             url: IMAGE_URL,
//           },
//         },
//       },
//     ],
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Key " + PAT,
//     },
//     body: raw,
//   };

//   return requestOptions;
// };

// const handleApiCall = (req, res) => {
//   fetch(
//     "https://api.clarifai.com/v2/models/face-detection/outputs",
//     returnClarifaiRequestOptions(req.body.input)
//   )
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => res.status(400).json("unable to work with API"));
// };

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get count"));
};

module.exports = {
  handleImage: handleImage,
  // handleApiCall: handleApiCall,
};
