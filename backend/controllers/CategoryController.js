import { configuration } from "../config/config.js";

// Models
import { Category } from '../models/category.js'
import { Server } from "../models/server.js";

export const CreateCategory = async (req, res) => {
  try {
    if(!req.body.category_name){
        return res.status(400).json({ok: false,msg: 'Category Name Required.'})
    }

    const isCategoryCreated = await Category.create({
        server: req.params.server_id,
        name: req.body.category_name
    })

    if(!isCategoryCreated){
        return res.status(400).json({ok:false,msg:'Unable to create category'})
    }

    await Server.findByIdAndUpdate(req.params.server_id, {
        $push: {
            categroies: isCategoryCreated._id 
        }
    })

    res.status(200).json({ok: true, msg: 'Category Created Successfully.'})
  } catch (error) {
    if (configuration.IS_DEV_ENV) {
      console.log("Error in CreateCategory Function\n" + error);
    } else {
      res.status(500).json({ ok: false, msg: "Internal Server Error" });
    }
  }
};
