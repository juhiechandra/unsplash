import axios, * as others from "axios";
import { fileURLToPath } from 'url';
import fs from "fs";
import { dirname } from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);


const fetchAPI = async () => {
  try {
    // Fetch the collection ID
    const collectionResponse = await axios.get('https://api.unsplash.com/search/collections?query=summer&client_id=Jkm0xasaAgn9gycnee_yGD2n_ufA0pIsr_KMIhF5flw');
    const collectionData = await collectionResponse.data;
    const collectionId = collectionData.results[0].id;

    // Fetch the photos from the collection
    const photoResponse = await axios.get(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=Jkm0xasaAgn9gycnee_yGD2n_ufA0pIsr_KMIhF5flw&per_page=5&orientation=landscape&content_filter=low`);
    const photoData = await photoResponse.data;
    return photoData
  } catch (error) {
    console.error(error);
  }
};

// function downloadImg(url,i){
//   console.log(_dirname)
//   let outputPath = path.resolve(_dirname, "unsplash/my-video/public"); 
//   let collectionName = "image";
//   axios
//   .get(url, {
//     responseType: "arraybuffer"
//   })
//   .then((response) => {
//     // console.log(response.data);
//     const data = Buffer.from(response.data);
//     let name = `${outputPath}/${collectionName}${i}.jpg`
//     fs.writeFile(name, data, (err) => {
//       if (err) throw err;
//       console.log("Image saved!");
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }

function downloadImg(url, i) {
  const outputPath = '/Users/juhiechandra/Interns-assign/Headout-Assignment/unsplash/my-video/public';
  const collectionName = 'image';
  axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then((response) => {
      const data = Buffer.from(response.data);
      const name = `${outputPath}/${collectionName}${i}.jpg`;
      fs.writeFile(name, data, (err) => {
        if (err) throw err;
        console.log('Image saved!');
      });
    })
    .catch((error) => {
      console.error(error);
    });
}



async function app(){
  const photodata =  await fetchAPI();
  console.log(photodata);
  for(let i=0;i<photodata.length;i++){
    downloadImg(photodata[i].urls.regular,i);
  }
}

app();