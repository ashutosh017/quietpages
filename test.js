// function extractCloudinaryPublicId(url) {
//   const parts = url.split("/");
//   const uploadIndex = parts.indexOf("upload");
//   const publicIdParts = parts.slice(uploadIndex + 1);

//   // remove version part if it exists and looks like "v123..."
//   if (publicIdParts[0].match(/^v\d+$/)) {
//     publicIdParts.shift();
//   }

//   return publicIdParts.join("/").replace(/\.[^/.]+$/, ""); // remove extension
// }

// console.log(extractCloudinaryPublicId("https://res.cloudinary.com/dodlda5p7/image/upload/v1749147270/nrgwemmpifeqjotfpwym.png"))
// console.log(extractCloudinaryPublicId("res.cloudinary.com/dodlda5p7/image/upload/v1749147270/nrgwemmpifeqjotfpwym.png"))

// const arr = Array.from({length:10}, (_,i)=>i+1);
// console.log(arr);
// const arr2 = arr.slice(9,12);
// console.log(arr2)

// const fs = require("fs");
// class myPromise {
//   constructor(fn) {
//     function afterDone(value) {
//       this.resolve(value);
//     }
//     function afterFail() {}
//     fn(afterDone.bind(this), afterFail)
//   }

//   then(cb) {
//     this.resolve = cb;
//   }
// }

// function myFunction(resolve) {
//   fs.readFile("a.txt", "utf-8", function (err, data) {
//     resolve(data);
//   });
// }

// function callback() {
//   console.log("successfully made a promise class");
// }

// let p = new myPromise(myFunction);
// p.then(callback);
