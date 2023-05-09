const { handlerProduct } = require("../handlers")
const { Router } = require("express")


const product = Router()

product.get("/",handlerProduct)

// products.get("/:id",getProductId)
// products.post("/",creatProduct)
// products.put("/:id")


module.exports = product