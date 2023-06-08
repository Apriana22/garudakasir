const ProductBrandModel = require('../models/ProductBrandModel');
const productModel = require('../models/ProductModel');
const Paging = require('./../helper/HandlePaging');
const {Db} = require('../../../config/database');

//get all data Data Product Brand //berhasil

//method GET
//localhost:3001/productbrands

const getAll = async function (req, res) {
  try {
    // ATRIBUT SEARCH && SET DATA PAGING
    let atribut = ['name'];
    const queryPage = await Paging(req, atribut);
    // GET TOTAL PAGE
    const total = await ProductBrandModel.count(queryPage.kondisi);
    // QUERY
    const model = await ProductBrandModel.findAll(queryPage.kondisi);
    if (model.length > 0) {
      res.status(200).json({
        code: 1,
        status: 200,
        message: 'Successfully get data Product Brand',
        data: {
          meta: {
            model: 'Product Brand',
            page: queryPage.page,
            total: total,
            limit: queryPage.limit,
            sortBy: `${queryPage.sort} ${queryPage.type}`,
          },
          data: model,
        },
      });
    } else {
      res.status(204);
    }
  } catch (err) {
    res.status(500).json({
      code: -1,
      status: 500,
      message: 'Error',
      data: err,
    });
  }
};

//mendapatkan semua product brand yang memiliki id params brand yang ditentukan
//method GET
//localhost:3001/productbrands/f72153a2-3210-4ee2-91b1-d1a1d8619414
//pilih id brands di localhost
//angka dan huruf setelah diujung adalah id
const getOne = async (req, res) => {
  try {
    const model = await ProductBrandModel.findOne({where: {id: req.params.id}});
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully get data product brand',
      data: {
        meta: {
          model: 'ProductBrand',
          page: 1,
          total: 1,
          limit: 1,
          sort: '',
        },
        data: model,
      },
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: 'Error',
      data: err,
    });
  }
};

//create 1 data product brand
//method POST,body->raw
//localhost:3001/productbrands
//masukkan ini kedalam body pilih raw
/*
{
    "name" : "Le Mineral",
    "description" : "Minuman mineral kemasan"
}

*/
const post = async (req, res) => {
  try {
    let data = {...req.body, user_create: res.locals.userId};
    const model = await ProductBrandModel.create(data, {validate: true});
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully insert data product brand',
      data: model,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: err,
    });
  }
};

//delete 1 data productbrands based on id
//pilih method DELETE
//localhost:3001/productbrands/acc5732b-0615-4556-bbdb-2a172091df61
//id dilihat dulu dilocalhost product brands, atau gunakan id product brands yang baru kita buat tadi
const deleteOne = async (req, res) => {
  try {
    const model = await ProductBrandModel.destroy({where: {id: req.params.id}});
    if (model) {
      res.status(200).json({
        code: 1,
        message: 'Successfully delete',
        data: req.params.id,
      });
    }
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: 'Error server',
      data: err,
    });
  }
};

//update data product brand
//method PUT
//localhost:3001/productbrands/f72153a2-3210-4ee2-91b1-d1a1d8619414
//pilih id product brands di localhost
//input ini di body->raw klik send
/*
{
    "name":"Aqua",
    "description":"Air Minum Mineral 400 ml"
}
*/
const update = async (req, res) => {
  try {
    const model = await ProductBrandModel.update(req.body, {
      where: {id: req.params.id},
    });
    if (model) {
      res.status(200).json({
        code: 1,
        message: 'Successfully update',
        data: req.params.id,
      });
    }
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: 'Error server',
      data: err,
    });
  }
};

module.exports = {getAll, getOne, post, deleteOne, update};
