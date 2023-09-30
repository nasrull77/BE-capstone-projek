import { error } from "console";
import Promo from "../models/PromoModel.js";
import path from "path";
import fs from "fs";

export const getPromo = async (req, res) => {
  try {
    const response = await Promo.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.massage);
  }
};

export const getPromoById = async (req, res) => {
  try {
    const response = await Promo.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.massage);
  }
};

export const savePromo = (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedTypes = [".png", ".jpg", ".jpeg"];

  if (!allowedTypes.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image size exceeds 5 MB" });

  file.mv(`./public/images/${fileName}`, async (error) => {
    if (error) return res.status(500).json({ msg: error.message });
    try {
      await Promo.create({ name: name, image: fileName, url: url });
      res.status(201).json({ msg: "Promo Created Successfuly" });
    } catch (error) {
      console.log(error.massage);
    }
  });
};

export const updatePromo = (req, res) => {};

export const deletePromo = async (req, res) => {
  const promo = await Promo.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!promo) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${promo.image}`;
    fs.unlinkSync(filepath);
    await Promo.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Promo Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
