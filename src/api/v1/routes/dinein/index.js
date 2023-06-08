const express = require('express');
const router = express.Router();

const dinein = require('./../../controllers/DineInControllers');

//menambahkan data pemesanan meja
router.post('/', dinein.postCustomer);
//menambahkan produk kekeranjang untuk dine in
router.post('/add', dinein.addProduct);
router.post('/addbulk', dinein.addBulkProduct);
//menampilkan produk dikeranjang
router.get('/keranjang', dinein.getKeranjang);
//mengubah jumlah atau nilai lain di keranjang
router.put('/:id', dinein.update);
router.post('/checkout', dinein.addCheckout);
router.get('/history', dinein.getHistory);
router.get('/historyPesanan', dinein.getHistoryPesanan);
router.get('/checkout/:id', dinein.detailCheckout);
router.put('/checkout/:id', dinein.updateCheckout);
router.get('/test', dinein.Test);

module.exports = router;
