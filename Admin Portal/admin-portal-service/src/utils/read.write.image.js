const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


const base64toImg = (base64string, folderName) => {
    const [metaData, imageData] = base64string.split(';base64,');
    if(imageData){
        const extension = metaData.split('image/')[1];
        console.log('Image Extension: ',extension);
        const buffer = Buffer.from(imageData, "base64");
        const fileName = uuid.v4() + "." + extension;
        const absolutePathToFolder = path.join(__dirname, '../../', `/public/${folderName}`);
        const absolutePath = path.join(absolutePathToFolder,fileName);


        if (!fs.existsSync(absolutePathToFolder)){
            fs.mkdirSync(absolutePathToFolder, { recursive: true });
        }
        
        console.log(absolutePath);
        fs.writeFileSync(absolutePath, buffer);
        return `/public/${folderName}/${fileName}`;
    }else {
        throw Error("Invalid file");
    }
}

const removeImage = (pathname) => {
    const absolutePath = path.join(__dirname, '../../', pathname);
    if(fs.existsSync){
        fs.unlink(absolutePath, (err, data) => {
            if(err){
                console.log("Some error occured");
            } else {
                console.log("File removal successful");
            }
        })
    }
}


module.exports = {base64toImg, removeImage};