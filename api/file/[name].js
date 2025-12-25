const fs = require("fs")
const path = require("path")

export default async function handler(req,res){
  const file = path.join("/tmp", req.query.name)
  if(!fs.existsSync(file)) return res.status(404).send("Not Found")
  res.send(fs.readFileSync(file))
}
