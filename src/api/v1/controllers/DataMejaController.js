const Paging = require('./../helper/HandlePaging');
const {Db} = require('../../../config/database');
const DataMejaModel = require('../models/DataMejaModel');

//get all data Data Meja //berhasil

//method GET
//localhost:3001/datameja
const getAll = async function (req, res) {
  try {
    // ATRIBUT SEARCH && SET DATA PAGING
    let atribut = ['nama_meja'];
    const queryPage = await Paging(req, atribut);
    // GET TOTAL PAGE
    const total = await DataMejaModel.count(queryPage.kondisi);
    // QUERY
    const model = await DataMejaModel.findAll(queryPage.kondisi);
    if (model.length > 0) {
      res.status(200).json({
        code: 1,
        status: 200,
        message: 'Successfully get data Data Meja',
        data: {
          meta: {
            model: 'Data Meja',
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

//mendapatkan semua Meja sesuai id_meja params
//method GET
//localhost:3001/datameja/b3844742-c686-4d07-8311-810027e5731f
//angka dan huruf setelah diujung adalah id_meja

const getOne = async (req, res) => {
  try {
    const model = await DataMejaModel.findOne({
      where: {id_meja: req.params.id_meja},
    });
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully get data Data Meja',
      data: {
        meta: {
          model: 'Data Meja',
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

//create 1 data Data Meja
//method post,body->raw
//localhost:3001/datameja
//masukkan ini kedalam body pilih raw
/*{
    "nama_meja" : "No 4"
}
*/
const post = async (req, res) => {
  try {
    let data = {...req.body};
    const model = await DataMejaModel.create(data, {validate: true});
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully insert data Data Meja',
      data: model,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: err,
    });
  }
};

//delete 1 data MEJA based on id_meja
//pilih method DELETE
//localhost:3001/datameja/bb7988ae-414d-4671-bb17-ad7991fd98b7
//id_meja dilihat dulu dilocalhost, atau gunakan id_meja yang baru kita buat tadi

const deleteOne = async (req, res) => {
  try {
    const model = await DataMejaModel.destroy({
      where: {id_meja: req.params.id_meja},
    });
    if (model) {
      res.status(200).json({
        code: 1,
        message: 'Successfully delete',
        data: req.params.id_meja,
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
//update data Data Meja
//method PUT
//localhost:3001/datameja/bb7988ae-414d-4671-bb17-ad7991fd98b7
//pilih id_meja di localhost
//input ini di body->raw klik send
/*
{
    "nama_meja":"No 1"
}
*/
const update = async (req, res) => {
  try {
    const model = await DataMejaModel.update(req.body, {
      where: {id_meja: req.params.id_meja},
    });
    if (model) {
      res.status(200).json({
        code: 1,
        message: 'Successfully update',
        data: req.params.id_meja,
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
