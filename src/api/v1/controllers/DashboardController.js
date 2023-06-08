const DataCustomerModel = require('../models/DataCustomerModel');
const DataPemesananModel = require('../models/DataPemesananModel');
const ProductBrandModel = require('../models/ProductBrandModel');
const ProductTypeModel = require('../models/ProductTypeModel');
const ProductModel = require('../models/ProductModel');
const Paging = require('./../helper/HandlePaging');
const {Db} = require('../../../config/database');
const {Op} = require('sequelize');

//localhost:3000/dashboard/search
const getSearch = async (req, res) => {
  try {
    const {search} = await req.body;
    let data = await ProductModel.findAll({
      where: {
        name: {[Op.like]: `%${search}%`},
      },
      //include: [{ model: , as: "Tweets" }],
      raw: true,
    });
    data = JSON.parse(JSON.stringify(data));
    data = data.map(item => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image,
      };
    });

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

//popular menu, menampilkan data produk yang populer
//localhost:3001/dashboard/populer
const getFrequent = async (req, res) => {
  try {
    let data = await DataPemesananModel.findAll({
      include: [
        {
          model: ProductModel,
          as: 'products',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['quantityOrder', 'DESC']],
      limit: 7,
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map(item => {
      return {
        ...item,
        products: {
          ...item.products[0],
          image: process.env.FILE_PATH + item.products[0].image,
        },
      };
    });

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

//popular menu, menampilkan data produk yang populer
//localhost:3001/dashboard/slider
const getSlider = async (req, res) => {
  try {
    let data = await DataPemesananModel.findAll({
      include: [
        {
          model: ProductModel,
          as: 'products',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['quantityOrder', 'DESC']],
      limit: 3,
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map(item => {
      return {
        ...item,
        products: {
          ...item.products[0],
          image: process.env.FILE_PATH + item.products[0].image,
        },
      };
    });

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
module.exports = {getFrequent, getSearch, getSlider};
