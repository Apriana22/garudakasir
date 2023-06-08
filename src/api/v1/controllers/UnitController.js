const Paging = require('./../helper/HandlePaging');
const {Db} = require('../../../config/database');

const getAll = async (req, res) => {
  try {
    const units = await UnitModel.findAll();
    res.json(units);
  } catch (error) {
    res.json({message: error.message});
  }
};

//get one based on id
const getOne = async (req, res) => {
  try {
    const model = await UnitModel.findOne({where: {id: req.params.id}});
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully get data unit',
      data: {
        meta: {
          model: 'unit',
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

const post = async (req, res) => {
  try {
    let data = {...req.body, user_create: res.locals.userId};
    const model = await UnitModel.create(data, {validate: true});
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully insert data unit',
      data: model,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: err,
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const model = await UnitModel.destroy({where: {id: req.params.id}});
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

const update = async (req, res) => {
  try {
    const model = await UnitModel.update(req.body, {
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
