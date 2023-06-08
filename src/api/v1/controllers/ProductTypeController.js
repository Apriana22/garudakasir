const ProductTypeModel = require('../models/ProductTypeModel');
const productModel = require('../models/ProductModel');
const Paging = require('./../helper/HandlePaging');
const {Db} = require('../../../config/database');

//get all data Data Product types //berhasil

//method GET
//localhost:3001/producttypes
//get all data product types //berhasil
const getAll = async function (req, res) {
  try {
    // ATRIBUT SEARCH && SET DATA PAGING
    let atribut = ['name', 'description'];
    const queryPage = await Paging(req, atribut);
    // GET TOTAL PAGE
    const total = await ProductTypeModel.count(queryPage.kondisi);
    // QUERY
    const model = await ProductTypeModel.findAll(queryPage.kondisi);
    if (model.length > 0) {
      res.status(200).json({
        code: 1,
        status: 200,
        message: 'Successfully get data Product Type',
        data: {
          meta: {
            model: 'Product',
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

//mendapatkan semua product types yang memiliki id params types yang ditentukan
//method GET
//localhost:3001/producttypes/id
//pilih id types di localhost
//angka dan huruf setelah diujung adalah id
const getOne = async (req, res) => {
  try {
    const model = await ProductTypeModel.findOne({where: {id: req.params.id}});
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully get data product type',
      data: {
        meta: {
          model: 'ProductType',
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

//create 1 data product type
//method POST,body->raw
//localhost:3001/producttypes
//masukkan ini kedalam body pilih raw
/*
{
    "name" : "Dessert",
    "description" : "Makanan Penutup"
}

*/
const post = async (req, res) => {
  try {
    let data = {...req.body, user_create: res.locals.userId};
    const model = await ProductTypeModel.create(data, {validate: true});
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully insert data product type',
      data: model,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: err,
    });
  }
};

//delete 1 data producttypes based on id
//pilih method DELETE
//localhost:3001/producttypes/id
//id dilihat dulu dilocalhost product types, atau gunakan id product types yang baru kita buat tadi
//delete 1 data gift based on id
const deleteOne = async (req, res) => {
  try {
    const model = await ProductTypeModel.destroy({where: {id: req.params.id}});
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
//update data product type
//method PUT
//localhost:3001/producttypes/id
//pilih id product type di localhost
//input ini di body->raw klik send
/*
{
    "name":"Kosmetik",
    "description":"Kosmetik wajah wanita dan pria "
}
*/
const update = async (req, res) => {
  try {
    const model = await ProductTypeModel.update(req.body, {
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
