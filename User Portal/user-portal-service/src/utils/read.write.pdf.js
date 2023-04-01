const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const base64ToPdf = (base64String, folderName) => {
    const [metaData, pdfData] = base64String.split(';base64,');
    if(pdfData){
        const extension = '.pdf';
        const buffer = Buffer.from(pdfData, "base64");
        const fileName = uuid.v4() + extension;
        const absolutePathToFolder = path.join(__dirname, "../../", `/public/${folderName}`);
        const absolutePath = path.join(absolutePathToFolder, fileName);
        if(!fs.existsSync(absolutePathToFolder)){
            fs.mkdirSync(absolutePathToFolder, { recursive: true });
        }
        fs.writeFileSync(absolutePath, buffer);
        return `/public/${folderName}/${fileName}`
    }
}

const removePdf = (pathname) => {
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


module.exports = { base64ToPdf, removePdf }