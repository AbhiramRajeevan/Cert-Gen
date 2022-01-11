const express = require("express")
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Jimp = require('jimp')


const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

let used = 1

async function textOverlay(name) {
  // Read the image.
  used = 2
  const image = await Jimp.read('public/cert1.png');
  //await image.greyscale(); 400,650
  // Save and overwrite the image
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
     image.print(font, 225,650, {
       text: name,
       alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
     },
     1000,
    100);
     // Writing image after processing
     await image.writeAsync('public/cert2.png');
}
app.get("/",(req,res)=>{
    //  res.sendFile(__dirname+"/index.html")
    res.render("index",{num:used})
})

app.post("/",(req,res)=>{
  let name = req.body.Name

  textOverlay(name)


    res.redirect("/")

});

process.on('SIGHUP', function() {
  used=1
  console.log(used)
});

app.listen(process.env.PORT || 3000,()=>{
  console.log("Successs")
})
