const fs = require("fs")
const path = require("path")

export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({ error:"Method not allowed" })

  const buffers = []
  for await (const chunk of req) buffers.push(chunk)
  const data = Buffer.concat(buffers)

  const boundary = req.headers["content-type"].split("boundary=")[1]
  const part = data.toString().split(boundary)[1]

  const name = Date.now()+"-"+Math.random().toString(36).slice(2)
  const fileData = part.split("\r\n\r\n")[1].split("\r\n--")[0]

  const filePath = path.join("/tmp", name)
  fs.writeFileSync(filePath, fileData, "binary")

  res.json({ url: `https://${req.headers.host}/api/file/${name}` })
}
