const DataCustomerModel = require('../models/DataCustomerModel');
const DataCheckoutModel = require('../models/DataCheckoutModel');
const DataMejaModel = require('../models/DataMejaModel');
const DataPemesananModel = require('../models/DataPemesananModel');
const ProductModel = require('../models/ProductModel');
const Paging = require('./../helper/HandlePaging');
const {Db} = require('../../../config/database');

//controller untuk dinein dan takeaway
//mengikuti alur desain aplikasi di figma
//kita pilih dineIn, maka klik menu dineIn, lalu
//masuk kehalaman isi data nama, pilih no meja, nama customer,
//method POST
/*
{
    "nama_customer":"Ahmad Dani",
    "id_meja":"b3844742-c686-4d07-8311-810027e5731f"
}
*/
const postCustomer = async (req, res) => {
  try {
    let data = {...req.body, userCreate: res.locals.userId};
    const model = await DataCustomerModel.create(data, {validate: true});

    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully insert data pesanan',
      data: model,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: err,
    });
  }
};

//setelah itu pilih makanan(add product ke keranjang)
//productId dimasukkan ke id_product, dalam table data_pemesanan(sebagai keranjang)
//masukkan id menu(id_product), id customer barusan(yang pesan meja),
//menambahkan product ke keranjang
//hitung harga barang dikali jumlah pesanan

//localhost:3001/dinein/add
/*
{
    "id_product":"361c9e36-33c3-43ef-a809-20d86d384de0",
    "jumlah_pemesanan":"2"
}
*/
//masukkan data pemesanan ke tabel data pemesanan, jadi saat create pemesanan maka id pemesanan otomatis tersimpan ke data_customer
//ini berarti satu pemesanan hanya memiliki 1 product(jumlah terserah), jika mau menambahkan product lagi maka id pemesanan menjadi ganda
//pada tabel id_pemesanan di data_customer, apakah bentuknya jadi array atau bagaimana?
//

const addProduct = async (req, res) => {
  try {
    //mencari customer terbaru
    const terbaruCustomer = await DataCustomerModel.findOne({
      limit: 1,
      attributes: ['id'],
      order: [['createdAt', 'DESC']],
    });
    var cust = terbaruCustomer.id;
    let permintaan = await ProductModel.findOne({
      attributes: ['price'],
      where: {id: req.body.productId},
    });
    var sub = permintaan.price * req.body.quantityOrder;
    //var sub = permintaan.price;

    let data = {
      ...req.body,
      userCreate: res.locals.userId,
      total: sub,
      salesOrderId: cust,
    };
    const model = await DataPemesananModel.create(data, {validate: true});
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Berhasil memasukkan data menu ke keranjang',
      data: model,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: err,
    });
  }
};

//update jika ingin menambahkan jumlah produk(misalnya mi rebus 2-menjadi 3)
//method put->body raw
//link localhost:3001/dinein/id, ganti dengan id datapemesanan mu
/*
    {
        "jumlah_pemesanan":1
    }
*/
const update = async (req, res) => {
  try {
    let permintaan = await DataPemesananModel.findOne({
      where: {id: req.params.id},
      include: [{model: ProductModel, attributes: ['price', 'name']}],
    });
    var idProduct = permintaan.productId;
    let product = await ProductModel.findOne({
      where: {id: idProduct},
    });
    var price = product.price;
    var sub = price * req.body.quantityOrder;
    let data = {...req.body, total: sub};
    const model = await DataPemesananModel.update(data, {
      where: {id: req.params.id},
    });
    //const model2 = await DataPemesananModel.update(req.body, {subTotal:sub})
    if (model) {
      res.status(200).json({
        code: 1,
        message:
          'Successfully update pesanan, dan harga total dan jika melakukan perubahan jumlah pesanan',
        data: req.body,
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

//daftar orderan untuk customer yang baru saja di daftarkan (menampilkan detailnya)
//menampilkan product yang ada pada keranjang (dengan id_customer terbaru yang dibuat oleh user login)
//di sort by createdAt
//method get
//localhost:3001/dinein/keranjang

const getKeranjang = async (req, res) => {
  try {
    const terbaruCustomer = await DataCustomerModel.findOne({
      limit: 1,
      attributes: ['id'],
      order: [['createdAt', 'DESC']],
    });
    var cust = terbaruCustomer.id;

    var keranjang = await DataPemesananModel.findAll({
      where: {userCreate: res.locals.userId, salesOrderId: cust},
      include: [
        {
          model: ProductModel,
          as: 'products',
          attributes: ['price', 'name', 'image'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    keranjang = JSON.parse(JSON.stringify(keranjang));
    keranjang = keranjang.map(item => {
      return {
        ...item,
        products: {
          ...item.products[0],
          image: process.env.FILE_PATH + item.products[0].image,
        },
      };
    });
    var result = keranjang.reduce((x, y) => x + Number.parseFloat(y.harga), 0);
    let data = {keranjang, result};
    res.json(data);
  } catch (error) {
    res.json({message: error.message});
  }
};

//mengirim id pemesanan ke checkout
//klik Checkout maka pesanan akan diikirim ke chekout
//method POST, otomatis checkout pemesanan untuk id cutomer terbaru

const addCheckout = async (req, res) => {
  try {
    var terbaruCustomer = await DataCustomerModel.findOne({
      limit: 1,
      attributes: ['id'],
      order: [['createdAt', 'DESC']],
    });
    var cust = terbaruCustomer.id;

    var keranjang = await DataPemesananModel.findAll({
      where: {userCreate: res.locals.userId, salesOrderId: cust},
      order: [['createdAt', 'DESC']],
    });

    var result = JSON.parse(JSON.stringify(keranjang)).reduce(
      (x, y) => x + Number.parseFloat(y.total),
      0,
    );
    var quantityOrderCheck = keranjang.reduce(
      (total, item) => total + item.quantityOrder,
      0,
    );
    // var values = JSON.stringify(
    //   Object.values(
    //     keranjang.map(function (elem) {
    //       return elem.salesOrderId;
    //     }),
    //   ),
    // );
    const uniqueSalesOrderIds = [
      ...new Set(keranjang.map(elem => elem.salesOrderId)),
    ];
    const values = uniqueSalesOrderIds.join(',');

    // values = values.replace(/\[|\]/g, '');
    // values = values.replace(/"/g, '');

    let data = {
      userCreate: res.locals.userId,
      subTotal: result,
      salesId: values,
      quantityOrder: quantityOrderCheck,
    };
    const model = await DataCheckoutModel.create(data, {validate: true});
    //const modelsales = await DataCheckoutModel.create(data, { validate: true });
    if (!model) {
      throw model;
    }

    res.status(200).json({
      code: 1,
      message: 'Berhasil checkout data pesanan',
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: err,
    });
  }
};

//menampilkan semua data pemesanan yang user_create:res.local.userId
//method GET
//localhost:3001/dinein/history

// const getHistory = async (req, res) => {
//   try {
//     var arr = [];
//     //ambil nilai id_pemesanan di checkout
//     const history = await DataCheckoutModel.findAll({
//       where: {userCreate: res.locals.userId},
//       order: [['createdAt', 'DESC']],
//     });
//     var idCheckout = Object.values(
//       history.map(function (elem) {
//         return elem.id;
//       }),
//     );

//     console.log(idCheckout);

//     for (i = 0; i < idCheckout.length; i++) {
//       let checkout = await DataCheckoutModel.findOne({
//         where: {id: idCheckout[i]},
//         order: [['createdAt', 'DESC']],
//       });
//       // let checkout1 = await DataPemesananModel.findAll({
//       //   where: {salesOrderId: idCheckout[i]},
//       //   order: [['createdAt', 'DESC']],
//       // });

//       var salahSatuId = checkout.map(elem => elem.id);
//       var salahSatu = salahSatuId[0];
//       var arrPesanan = [];
//       for (a = 0; a < salahSatuId.length; a++) {
//         var satu = salahSatuId[a];
//         let semuaPemesanan = await DataPemesananModel.findOne({
//           where: {id: satu},
//           attributes: ['price'],
//         });
//         arrPesanan.push(semuaPemesanan);
//       }

//       var result = JSON.parse(JSON.stringify(arrPesanan)).reduce(
//         (x, y) => x + Number.parseFloat(y.price),
//       );

//       let pesan = await DataPemesananModel.findOne({
//         where: {id: salahSatu},
//       });
//       var idProduct = pesan.productId;
//       let product = await ProductModel.findOne({
//         where: {id: idProduct},
//         attributes: ['image', 'price'],
//       });
//       product = process.env.FILE_PATH + product.image;
//       var idCustomer = pesan.salesOrderId;
//       let customer = await DataCustomerModel.findOne({
//         where: {id: idCustomer},
//         attributes: ['name', 'memberLevel'],
//       });
//       console.log(idCustomer);
//       var idMeja = customer.memberLevel;
//       let meja = await DataMejaModel.findOne({
//         where: {id_meja: idMeja},
//         attributes: ['nama_meja'],
//       });
//       if (meja == null) {
//         var nama_meja = 'Takeaway';
//       } else {
//         var nama_meja = 'Meja :' + meja.nama_meja;
//       }
//       let data = {
//         checkout,
//         salahSatu,
//         pesan,
//         product,
//         customer,
//         result,
//         nama_meja,
//       };
//       obj = JSON.parse(JSON.stringify(data));
//       arr.push(obj);
//     }
//     res.send({
//       status: 'success',
//       data: arr,
//     });

//     //res.end();
//   } catch (error) {
//     res.json({message: error.message});
//   }
// };

const getHistory = async (req, res) => {
  try {
    var arr = [];
    // Ambil nilai id_pemesanan di checkout
    const history = await DataCheckoutModel.findAll({
      where: {userCreate: res.locals.userId},
      order: [['createdAt', 'DESC']],
    });
    var idCheckout = history.map(elem => elem.id);

    console.log(idCheckout);

    for (let i = 0; i < idCheckout.length; i++) {
      let checkout = await DataCheckoutModel.findOne({
        where: {id: idCheckout[i]},
        order: [['createdAt', 'DESC']],
      });

      console.log(checkout);

      var salahSatuId = checkout.salesId;
      // console.log(salahSatuId);
      var arrPesanan = [];
      var pemesanan = await DataPemesananModel.findAll({
        where: {salesOrderId: salahSatuId},
        attributes: ['total'],
      });
      arrPesanan.push(...pemesanan);
      // console.log(pemesanan);

      var result = arrPesanan.reduce(
        (x, y) => x + Number.parseFloat(y.total),
        0,
      );
      // console.log(result);

      let pesan = await DataPemesananModel.findOne({
        where: {salesOrderId: salahSatuId},
      });
      // console.log(pesan);
      var idProduct = pesan.productId;
      // console.log(idProduct);
      let product = await ProductModel.findOne({
        where: {id: idProduct},
        attributes: ['image', 'price'],
        // attributes: ['price'],
      });

      // console.log(product);
      product.image = process.env.FILE_PATH + product.image;
      // console.log(product.image);
      var idCustomer = pesan.salesOrderId;
      let customer = await DataCustomerModel.findOne({
        where: {id: idCustomer},
        attributes: ['name', 'memberLevel'],
      });
      // console.log(idCustomer);
      var idMeja = customer.memberLevel;
      let meja = await DataMejaModel.findOne({
        where: {id_meja: idMeja},
        attributes: ['nama_meja'],
      });
      var nama_meja = 'Takeaway';
      if (meja) {
        nama_meja = 'Meja: ' + meja.nama_meja;
      }

      let data = {
        checkout,
        product,
        customer,
        result,
        nama_meja,
      };
      arr.push(data);
    }

    res.send({
      status: 'success',
      data: arr,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message: 'Failed to fetch product data'});
  }
};

//menampilkan semua data pemesanan yang user_create:res.local.userId
//method GET
//localhost:3001/dinein/historyPesanan

const getHistoryPesanan = async (req, res) => {
  try {
    var arr = [];
    var pesanan = [];
    //ambil nilai id_pemesanan di checkout
    const history = await DataCheckoutModel.findAll({
      where: {userCreate: res.locals.userId},
      order: [['createdAt', 'DESC']],
    });
    var idCheckout = Object.values(
      history.map(function (elem) {
        return elem.id;
      }),
    );

    console.log(idCheckout);

    for (i = 0; i < idCheckout.length; i++) {
      let checkout = await DataCheckoutModel.findOne({
        where: {id: idCheckout[i]},
        order: [['createdAt', 'DESC']],
      });
      var salahSatuId = JSON.parse(checkout.salesId);

      console.log(salahSatuId);

      for (a = 0; a < salahSatuId.length; a++) {
        var salahSatu = salahSatuId[a];
        let pesan = await DataPemesananModel.findOne({
          where: {id: salahSatu},
        });
        var idProduct = pesan.productId;
        let product = await ProductModel.findOne({
          where: {id: idProduct},
          attributes: ['name', 'image', 'price'],
        });
        productImage = process.env.FILE_PATH + product.image;
        product = {product, productImage};
        var idCustomer = pesan.salesOrderId;
        let customer = await DataCustomerModel.findOne({
          where: {id: idCustomer},
          attributes: ['name', 'memberLevel'],
        });

        var idMeja = customer.memberLevel;
        let meja = await DataMejaModel.findOne({
          where: {id_meja: idMeja},
          attributes: ['nama_meja'],
        });
        if (meja == null) {
          var nama_meja = 'Takeaway';
        } else {
          var nama_meja = 'Meja : ' + meja.nama_meja;
        }
        let dataProduk = {pesan, product, customer, nama_meja};
        produkArr = JSON.parse(JSON.stringify(dataProduk));
        pesanan.push(produkArr);
      }
      let data = {checkout, pesanan};
      obj = JSON.parse(JSON.stringify(data));
      arr.push(obj);
    }
    res.send({
      status: 'success',
      data: arr,
    });
  } catch (error) {
    res.json({message: error.message});
  }
};

//selanjutnya menampilkan detail dari checkout tadi
//localhost:3001/dinein/checkout/id
const detailCheckout = async (req, res) => {
  try {
    //pilih id checkout dengan param
    var cekout = await DataCheckoutModel.findOne({
      where: {salesId: req.params.id},
      attributes: ['salesId'],
    });

    console.log(cekout);
    var salahSatuId = cekout.salesId;
    var salahSatu = salahSatuId[0];
    console.log(salahSatu);
    // console.log(req.params.id);
    // var cekout = await DataCheckoutModel.findOne({
    //   where: {salesId: req.params.id},
    //   attributes: ['salesId'],
    // });
    // console.log(cekout);

    // var salahSatuId = cekout ? cekout.salesId : null;
    // var salahSatu = salahSatuId ? salahSatuId[0] : null;
    // if (cekout && cekout.salesId) {
    //   // var salahSatuId = cekout.salesId;
    //   // var salahSatu = salahSatuId[0];
    //   // console.log(salahSatu);
    //   console.log(salahSatuId);
    // } else {
    //   console.log('cekout atau cekout.salesId tidak ditemukan');
    // }
    const pesan = await DataPemesananModel.findOne({
      where: {salesOrderId: salahSatuId},
      attributes: ['salesOrderId'],
    });
    console.log(pesan);
    // const pesan = salahSatuId
    //   ? await DataPemesananModel.findOne({
    //       where: {salesOrderId: salahSatuId},
    //       attributes: ['salesOrderId'],
    //     })
    //   : null;
    // console.log(pesan);

    var idCustomer = pesan.salesOrderId;
    console.log(idCustomer);
    let model = await DataPemesananModel.findAll({
      where: {salesOrderId: idCustomer},
      include: [
        {
          model: ProductModel,
          as: 'products',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });
    console.log(model);
    let nama_customer = await DataCustomerModel.findOne({
      where: {id: idCustomer},
      attributes: ['name', 'memberLevel'],
    });
    console.log(nama_customer);
    let data = [];
    model = JSON.parse(JSON.stringify(model));
    var idMeja = nama_customer.memberLevel;
    let meja = await DataMejaModel.findOne({
      where: {id_meja: idMeja},
      attributes: ['nama_meja'],
    });
    if (meja == null) {
      var nama_meja = 'Takeaway';
    } else {
      var nama_meja = 'Meja : ' + meja.nama_meja;
    }
    data = model.map(item => {
      return {
        ...item,
        products: {
          ...item.products[0],
          image: process.env.FILE_PATH + item.products[0].image,
        },
      };
    });
    console.log(data);
    // // console.log(model);
    // // let nama_customer = await DataCustomerModel.findOne({
    // //   where: {id: idCustomer},
    // //   attributes: ['name', 'memberLevel'],
    // // });
    // // // console.log(nama_customer);
    // // model = JSON.parse(JSON.stringify(model));
    // // // console.log(model);
    // // var idMeja = nama_customer.memberLevel;
    // // let meja = await DataMejaModel.findOne({
    // //   where: {id_meja: idMeja},
    // //   attributes: ['nama_meja'],
    // // });
    // // // console.log(meja);
    // // if (meja == null) {
    // //   var nama_meja = 'Takeaway';
    // // } else {
    // //   var nama_meja = 'Meja : ' + meja.nama_meja;
    // // }
    // // data = model.map(item => {
    // //   return {
    // //     ...item,
    // //     products: {
    // //       ...item.products[0],
    // //       image: process.env.FILE_PATH + item.products[0].image,
    // //     },
    // //   };
    // // });
    // // console.log(nama_meja);
    var totalHarga = JSON.parse(JSON.stringify(model)).reduce(
      (x, y) => x + Number.parseFloat(y.total),
      0,
    );
    console.log(totalHarga);
    let data1 = {data, totalHarga, nama_customer, nama_meja};
    res.json(data1);
    console.log(data1);
  } catch (error) {
    console.log('Error in detailCheckout:', error);
    res.json({message: error.message});
  }
};

const Test = async (req, res) => {
  try {
    let permintaan = await DataPemesananModel.findOne({});

    res.json(permintaan);
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: 'Error server',
      data: err,
    });
  }
};

//update data pemesanan
//jika mau nambah JUMLAH pesanan/mengurangi
const updateCheckout = async (req, res) => {
  try {
    let permintaan = await DataPemesananModel.findOne({
      where: {id: req.params.id},
      include: [{model: ProductModel, attributes: ['price', 'name']}],
    });
    var idProduct = permintaan.productId;
    let product = await ProductModel.findOne({
      where: {id: idProduct},
    });
    var price = product.price;
    var sub = price * req.body.quantityOrder;
    let data = {...req.body, total: sub};
    const model = await DataPemesananModel.update(data, {
      where: {id: req.params.id},
    });
    if (model) {
      res.status(200).json({
        code: 1,
        message:
          'Successfully update pesanan, dan harga sub total jika melakukan perubahan jumlah pesanan',
        data: req.body,
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

//menambahkan pesanan multiple dari cart
const addBulkProduct = async (req, res) => {
  try {
    const cartItems = req.body.cartItems;
    const terbaruCustomer = await DataCustomerModel.findOne({
      limit: 1,
      attributes: ['id'],
      order: [['createdAt', 'DESC']],
    });
    var idcust = terbaruCustomer.id;

    for (const item of cartItems) {
      await DataPemesananModel.create({
        salesOrderId: idcust,
        userCreate: res.locals.userId,
        productId: item.productId,
        quantityOrder: item.quantityOrder,
        price: item.price,
        total: item.total,
      });
    }

    res.status(200).json({
      code: 1,
      message: 'Successfully insert new row loh',
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      code: -1,
      message: 'Error server',
      cartItems,
    });
  }
};

module.exports = {
  postCustomer,
  addBulkProduct,
  addProduct,
  getKeranjang,
  update,
  addCheckout,
  getHistory,
  getHistoryPesanan,
  detailCheckout,
  updateCheckout,
  Test,
};
