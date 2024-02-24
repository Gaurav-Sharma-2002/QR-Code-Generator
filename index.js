import express from "express";
import inquirer from "inquirer"; 
import qr from "qr-image";
import fs from "fs";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/generate", (req, res) => {
  const url = req.body.URL;
  const qr_svg = qr.imageSync(url, { type: "png" });

  fs.writeFileSync("qr_image.png", qr_svg);

  fs.writeFile("URL.txt", url, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  res.render("qr", { qr_image: qr_svg.toString("base64") });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
})
