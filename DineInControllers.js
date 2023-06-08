const DataCustomerModel = require("../models/DataCustomerModel");
const DataCheckoutModel = require("../models/DataCheckoutModel");
const DataMejaModel = require("../models/DataMejaModel");
const DataPemesananModel = require("../models/DataPemesananModel");
const ProductModel = require("../models/ProductModel");
const Paging = require("./../helper/HandlePaging");
const { Db } = require("../../../config/database");


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
    try{
        let data = {...req.body, user_create: res.locals.userId };
        const model = await DataCustomerModel.create(data, { validate: true });


        if(!model) throw model;
        res.status(200).json({
            code:1,
            message: "Successfully insert data pesanan",
            data: model,
        })
    }catch(err){
        res.status(500).json({
            code: -1,
            message: err,
        })
    }
}


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

    try{

        //mencari customer terbaru
        const terbaruCustomer = await DataCustomerModel.findOne({
            limit: 1,
            attributes:['id'],
            order: [ [ 'createdAt', 'DESC' ]]
        });
        var cust =terbaruCustomer.id;
        let permintaan =  await ProductModel.findOne({attributes:['price'],where : {id : req.body.id_product}});
        var sub = permintaan.price*req.body.jumlah_pemesanan;
        //var sub = permintaan.price;

        let data = {...req.body, user_create: res.locals.userId, harga:sub, id_customer:cust};
        const model = await DataPemesananModel.create(data, { validate: true });
        if(!model) throw model;
        res.status(200).json({
            code:1,
            message: "Berhasil memasukkan data menu ke keranjang",
            data: model,
        }) 
 

    }catch(err){
        res.status(500).json({
            code: -1,
            message: err,
        })
    }
}


//update jika ingin menambahkan jumlah produk(misalnya mi rebus 2-menjadi 3)
//method put->body raw
//link localhost:3001/dinein/id, ganti dengan id datapemesanan mu
/*
    {   
        "jumlah_pemesanan":1
    }
*/
const update = async (req, res)=>{
    try{
        
        let permintaan =  await DataPemesananModel.findOne({
            where: { id: req.params.id },
            include: [{model: ProductModel,attributes:['price','name']}]
        });
        var idProduct=permintaan.id_product;
        let product= await ProductModel.findOne({
            where : {id:idProduct}
        });
        var price=product.price;
        var sub = price*req.body.jumlah_pemesanan;
        let data = {...req.body, harga:sub };
        const model = await DataPemesananModel.update(data, { where: { id: req.params.id } } );
        //const model2 = await DataPemesananModel.update(req.body, {subTotal:sub})
        if(model){
            res.status(200).json({
                code:1,
                message: "Successfully update pesanan, dan harga total dan jika melakukan perubahan jumlah pesanan",
                data: req.body
            })
        }
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error server",
            data: err
        })
    }
}

//daftar orderan untuk customer yang baru saja di daftarkan (menampilkan detailnya)
//menampilkan product yang ada pada keranjang (dengan id_customer terbaru yang dibuat oleh user login)
//di sort by createdAt
//method get
//localhost:3001/dinein/keranjang

const getKeranjang = async (req, res) => {
    
        try {
        const terbaruCustomer = await DataCustomerModel.findOne({
            limit: 1,
            attributes:['id'],
            order: [ [ 'createdAt', 'DESC' ]]
        });
        var cust =terbaruCustomer.id;

        var keranjang = await DataPemesananModel.findAll({
            where : {user_create : res.locals.userId, id_customer:cust},
            include: [{model: ProductModel,as : "products",attributes:['price','name',"image"]}], 
            order: [ [ 'createdAt', 'DESC' ]]
        });
        keranjang = JSON.parse(JSON.stringify(keranjang));
        keranjang = keranjang.map((item) => {
            return {
                ...item,
                products: {
                    ...item.products[0],
                    image: process.env.FILE_PATH + item.products[0].image,
                },
            };
        });
        var result = keranjang.reduce((x,y) => x + Number.parseFloat(y.harga), 0);
        let data = {keranjang,result};
        res.json(data);
    
    } catch (error) {
        res.json({ message: error.message });
    }  
    
}

//mengirim id pemesanan ke checkout
//klik Checkout maka pesanan akan diikirim ke chekout
//method POST, otomatis checkout pemesanan untuk id cutomer terbaru

const addCheckout = async (req, res) => {

    try{
        var terbaruCustomer = await DataCustomerModel.findOne({
            limit: 1,
            attributes:['id'],
            order: [ [ 'createdAt', 'DESC' ]]
        });
        var cust =terbaruCustomer.id;

        var keranjang = await DataPemesananModel.findAll({
            where : {user_create : res.locals.userId, id_customer:cust},
            order: [ [ 'createdAt', 'DESC' ]]
        });

        var result = JSON.parse(JSON.stringify(keranjang)).reduce((x,y) => x + Number.parseFloat(y.harga), 0);
        var values = JSON.stringify(Object.values(keranjang.map(function(elem){return elem.id}))); 

        let data = {user_create: res.locals.userId,total:result,id_pemesanan:values};
        const model = await DataCheckoutModel.create(data, { validate: true });
        if(!model) throw model;

        res.status(200).json({
            code:1,
            message: "Berhasil checkout data pesanan",
            data: data,
        }) 
 
    }catch(err){
        res.status(500).json({
            code: -1,
            message: err,
        })
    }
}

//menampilkan semua data pemesanan yang user_create:res.local.userId
//method GET
//localhost:3001/dinein/history

const getHistory = async (req, res) => {
    try {
        var arr = [];
        //ambil nilai id_pemesanan di checkout
        const history = await DataCheckoutModel.findAll({    
            where : {user_create : res.locals.userId},
            order: [ [ 'createdAt', 'DESC' ]]

        });
        var idCheckout=Object.values(history.map(function(elem){return elem.id_checkout}));

        for (i=0; i<idCheckout.length; i++){
            let checkout = await DataCheckoutModel.findOne({    
                where : { id_checkout : idCheckout[i] },
                order: [ [ 'createdAt', 'DESC' ]]
            });

            var salahSatuId=JSON.parse(checkout.id_pemesanan);
            var salahSatu=salahSatuId[0]; 
            var arrPesanan = [];
            for (a=0; a<salahSatuId.length; a++){
                var satu=salahSatuId[a]; 
                let semuaPemesanan = await DataPemesananModel.findOne({
                    where : {id:satu},
                    attributes:["harga"]
                });
                arrPesanan.push(semuaPemesanan)
            };
            
            var result = JSON.parse(JSON.stringify(arrPesanan)).reduce((x,y) => x + Number.parseFloat(y.harga), 0);
            
            let pesan = await DataPemesananModel.findOne({
                where : {id:salahSatu},
            });
            var idProduct = pesan.id_product;
            let product = await ProductModel.findOne({
                where : {id:idProduct},
                attributes:["image","price"]
            });
            product= process.env.FILE_PATH + product.image;
            var idCustomer = pesan.id_customer;
            let customer = await DataCustomerModel.findOne({
                where : {id:idCustomer},
                attributes:["nama_customer","id_meja"]
            });

            var idMeja = customer.id_meja;
            let meja = await DataMejaModel.findOne({
            where : {id_meja:idMeja},
            attributes: ["nama_meja"]
            });
            if ( meja == null){
                var nama_meja ="Takeaway";
            } else {
                var nama_meja ="Meja :"+meja.nama_meja;
            }
            let data = {checkout,pesan,product,customer,result,nama_meja};
            obj = JSON.parse(JSON.stringify(data));
            arr.push(obj)

            
        };
        res.send({
            status: "success",
            data: arr
        });
        
        //res.end();

    } catch (error) {
        res.json({ message: error.message });
    }  
}

//menampilkan semua data pemesanan yang user_create:res.local.userId
//method GET
//localhost:3001/dinein/historyPesanan

const getHistoryPesanan = async (req, res) => {
    try {
        var arr = [];            var pesanan = [];
        //ambil nilai id_pemesanan di checkout
        const history = await DataCheckoutModel.findAll({    
            where : {user_create : res.locals.userId},
            order: [ [ 'createdAt', 'DESC' ]]

        });
        var idCheckout=Object.values(history.map(function(elem){return elem.id_checkout}));

    for (i=0; i<idCheckout.length;i++){
            let checkout = await DataCheckoutModel.findOne({    
                where : { id_checkout : idCheckout[i] },
                order: [ [ 'createdAt', 'DESC' ]]
            });
            var salahSatuId=JSON.parse(checkout.id_pemesanan);

        for (a=0; a<salahSatuId.length; a++){
            var salahSatu=salahSatuId[a]; 
            let pesan = await DataPemesananModel.findOne({
                where : {id:salahSatu},
            });
            var idProduct = pesan.id_product;
            let product = await ProductModel.findOne({
                where : {id:idProduct},
                attributes:["name","image","price"]
            });
            productImage= process.env.FILE_PATH + product.image;
            product ={product,productImage}
            var idCustomer= pesan.id_customer;
            let customer = await DataCustomerModel.findOne({
                where : {id:idCustomer},
                attributes:["nama_customer","id_meja"]
            });

            var idMeja = customer.id_meja;
            let meja = await DataMejaModel.findOne({
            where : {id_meja:idMeja},
            attributes: ["nama_meja"]
            });
            if ( meja == null){
                var nama_meja ="Takeaway";
            } else {
                var nama_meja ="Meja : "+meja.nama_meja;
            }
            let dataProduk = {pesan,product,customer,nama_meja}
            produkArr = JSON.parse(JSON.stringify(dataProduk))
            pesanan.push(produkArr)
        
        }
            let data = {checkout,pesanan}
            obj = JSON.parse(JSON.stringify(data))
            arr.push(obj)
    };
        res.send({
            status: "success",
            data: arr
        });

    } catch (error) {
        res.json({ message: error.message });
    }  
}

//selanjutnya menampilkan detail dari checkout tadi
//localhost:3001/dinein/checkout/id
const detailCheckout = async (req, res) => {
    try{
        //pilih id checkout dengan param
        var cekout = await DataCheckoutModel.findOne({
            where : {id_checkout:req.params.id},
            attributes:["id_pemesanan"]
        });
        var salahSatuId=JSON.parse(cekout.id_pemesanan);
        var salahSatu=salahSatuId[0];
        const pesan = await DataPemesananModel.findOne({
            where : {id:salahSatu},
            attributes:["id_customer"]
        });
    
        var idCustomer = pesan.id_customer;
        let model = await DataPemesananModel.findAll({
            where : {id_customer:idCustomer},
            include: [
                {
                    model: ProductModel,
                    as: "products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt",],
                    },
                }
            ],
        });
        let nama_customer = await DataCustomerModel.findOne({
            where :{id:idCustomer},
            attributes:["nama_customer","id_meja"]
        });
        model = JSON.parse(JSON.stringify(model));
            var idMeja = nama_customer.id_meja;
            let meja = await DataMejaModel.findOne({
            where : {id_meja:idMeja},
            attributes: ["nama_meja"]
            });
            if ( meja == null){
                var nama_meja ="Takeaway";
            } else {
                var nama_meja ="Meja : "+meja.nama_meja;
            }
        data= model.map((item) => {
            return {
                ...item,
                products: {
                    ...item.products[0],
                    image: process.env.FILE_PATH + item.products[0].image,
                },
            };
        });
        var totalHarga = JSON.parse(JSON.stringify(model)).reduce((x,y) => x + Number.parseFloat(y.harga), 0);
        let data1={data,totalHarga,nama_customer,nama_meja};
        res.json(data1);

    } catch (error) {
        res.json({ message: error.message });
    }  
}


const Test = async (req,res)=>{
    try{
        let permintaan =  await DataPemesananModel.findOne({

        } );
 
        res.json(permintaan);
    
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error server",
            data: err
        })
    }
}

//update data pemesanan
//jika mau nambah JUMLAH pesanan/mengurangi
const updateCheckout = async (req, res)=>{
    try{
        
        let permintaan =  await DataPemesananModel.findOne({
            where: { id: req.params.id } ,
            include: [{model: ProductModel,attributes:['price','name']}], 
        } );
        var idProduct=permintaan.id_product;
        let product= await ProductModel.findOne({
            where : {id:idProduct}
        });
        var price=product.price;
        var sub = price*req.body.jumlah_pemesanan;
        let data = {...req.body, harga:sub };
        const model = await DataPemesananModel.update(data, { where: { id: req.params.id } } );
        if(model){
            res.status(200).json({
                code:1,
                message: "Successfully update pesanan, dan harga sub total jika melakukan perubahan jumlah pesanan",
                data: req.body
            })
        }
    }catch(err){
        res.status(500).json({
            code: -1,
            message: "Error server",
            data: err
        })
    }
}

const addBulkProduct = async (req, res) => {
    try {
      const cartItems = req.body.cartItems; 
      const terbaruCustomer = await DataCustomerModel.findOne({
        limit: 1,
        attributes: ['id'],
        order: [['createdAt', 'DESC']]
      });
  
      for (const item of cartItems) {
        await DataPemesananModel.create({
          id_customer: terbaruCustomer.id,
          user_create: res.locals.userId,
          id_product: item.id_product,
          jumlah_pemesanan: item.jumlah_pemesanan,
          harga: item.harga 
        });
      }
  
      res.status(200).json({
        code:1,
        message: "Successfully insert new row loh",
        data: req.body
    })
    } catch (error) {
        res.status(500).json({
            code: -1,
            message: "Error server",
            cartItems
        })
    }
  };

module.exports = {postCustomer, addBulkProduct, addProduct, getKeranjang, update, addCheckout, getHistory,getHistoryPesanan, detailCheckout, updateCheckout, Test };

