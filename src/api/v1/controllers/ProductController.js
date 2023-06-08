const ProductBrandModel = require('../models/ProductBrandModel');
const ProductTypeModel = require('../models/ProductTypeModel');
const ProductModel = require('../models/ProductModel');
const StockModel = require('../models/StockModel');
const Paging = require('./../helper/HandlePaging');
const {Db} = require('../../../config/database');

//get all data Data Product //berhasil
//method GET
//localhost:3001/products
//menggunakan fungsi include untuk memanggil brand dan type produk
const getAll = async (req, res) => {
  try {
    let data = await ProductModel.findAll({
      include: [
        {model: ProductBrandModel, as: 'id_merek'},
        {model: ProductTypeModel, as: 'id_jenis'},
      ],
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
    res.json({message: error.message});
  }
};

//get one based on id, include id merek dan id jenis
//mendapatkan semua product yang memiliki id product yang ditentukan
//method GET
//localhost:3001/products/400422df-a5bd-4b83-8876-8b3d46319ccd
//angka dan huruf setelah diujung adalah id, pilih id di localhost

const getOne = async (req, res) => {
  try {
    let data = await ProductModel.findOne({
      where: {id: req.params.id},
      include: [
        {model: ProductBrandModel, as: 'id_merek'},
        {model: ProductTypeModel, as: 'id_jenis'},
      ],
    });
    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
    };
    res.send({
      status: 'success',
      data,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: 'Error',
      data: err,
    });
  }
};

//create 1 data productS
//method POST,body->raw
//localhost:3001/products
//masukkan ini kedalam body pilih raw
/*
{
    "code" : "ITM-8",
    "name" : "Wardah clay face mask",
    "brandId" : "uhuhh73u-hu7y-t6gy-y7huu8r4",
    "typeId" : "400422df-a5bd-4b83-8876-8v4d46319ccd"
}

*/
const post = async (req, res) => {
  try {
    const data = req.body;

    let newProduct = await ProductModel.create({
      ...data,
      image: req.file.filename,
      user_create: res.locals.userId,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    newProduct = JSON.parse(JSON.stringify(newProduct));

    newProduct = {
      ...newProduct,
      image: process.env.FILE_PATH + newProduct.image,
    };

    // code here
    res.send({
      status: 'success',
      data: {
        newProduct,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

//delete 1 data products based on id
//pilih method DELETE
//localhost:3001/products/400422df-a5bd-4b83-8876-8b3d46319ccd
//id dilihat dulu dilocalhost products, atau gunakan id product yang baru kita buat tadi
const deleteOne = async (req, res) => {
  try {
    const model = await ProductModel.destroy({where: {id: req.params.id}});
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

//update data products
//method PUT
//localhost:3001/products/85076de5-d326-4f00-b73d-b670fcd7ca1b
//pilih id product di localhost
//input ini di body->raw klik send
/*
{
    "name":"mi goreng indomie, telur mata sapi",
    "description":"satu porsi indomi goreng plus telur mata sapi",
    "price" : 10000.0000,
    "image" : indomi.jpg
}
*/
const update = async (req, res) => {
  try {
    const {id} = req.params;
    const data = req.body;

    await ProductModel.update(
      {
        ...data,
        image: req.file.filename,
        user_create: res.locals.userId, //dari token
      },

      {
        where: {id},
      },
    );

    res.send({
      status: 'success',
      message: `Update product id: ${id} finished`,
      data: {
        image: req.file.filename,
        description: req.body.description,
        name: req.body.name,
        price: req.body.price,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

//menampilkan produk yang sama berdasar id type params
//method get
//lihat id product type di database
//localhost:3001/products/type/20d2c405-c07c-4dcc-bed6-6eefba0b930e
const getType = async (req, res) => {
  try {
    let data = await ProductModel.findAll({
      where: {typeId: req.params.typeId},
      include: [
        {model: ProductBrandModel, as: 'id_merek'},
        {model: ProductTypeModel, as: 'id_jenis'},
      ],
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
    res.json({message: error.message});
  }
};
//menemukan produk yang sama berdasar id brand params
//method GET
//lihat id product brand di database
//localhost:3001/products/brand/uhuhh73u-hu7y-t6gy-y7huu8r4
const getBrand = async (req, res) => {
  try {
    const products = await ProductModel.findAll({
      where: {brandId: req.params.brandId},
      include: [
        {model: ProductBrandModel, as: 'id_merek'},
        {model: ProductTypeModel, as: 'id_jenis'},
      ],
    });
    res.json(products);
  } catch (error) {
    res.json({message: error.message});
  }
};

//add value for products.stock
//mengubah nilai quantity untuk tabel stock dengan id product yang diinput di body
//method
//localhost:3001/products/stok
/*
[
    {
        "productId":"cc39c736-6bae-4708-83ce-6343fe8899d0",
        "quantity":11
    },
    {
        "productId":"85076de5-d326-4fa00-b73d-b670fcd7ca1b",
        "quantity":13
    }
]
*/

const addStockQuantity = async (req, res) => {
  let t = await Db.transaction();
  try {
    let tmpErrorRespon = [];
    let tmpSuccessRespon = [];
    for (let i = 0; i < req.body.length; i++) {
      let model = await StockModel.create(req.body[i], {
        validate: true,
        transaction: t,
      });
      if (model) {
        tmpSuccessRespon.push(req.body[i].productId);
        let updateStok = await ProductModel.update(
          {stok: Db.literal(`stok + ${req.body[i].quantity}`)},
          {
            where: {id: req.body[i].productId},
            transaction: t,
          },
        );
        if (!updateStok) {
          throw updateStok;
        }
      } else {
        tmpErrorRespon.push(req.body[i].productId);
      }
    }
    await t.commit();
    res.status(200).json({
      message: 'Success add stok quantity',
      data: {
        success: tmpSuccessRespon,
        error: tmpErrorRespon,
      },
    });
  } catch (error) {
    res.status(500).json({
      meesage: error,
    });
  }
};

module.exports = {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
  getType,
  getBrand,
  addStockQuantity,
};
