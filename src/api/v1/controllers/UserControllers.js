const UserModel = require('./../models/UserModel');
const bcrypt = require('bcrypt');
const Paging = require('./../helper/HandlePaging');

//get all data user
const getAll = async (req, res) => {
  try {
    let data = await UserModel.findAll();
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

//get one based on id
const getOne = async (req, res) => {
  try {
    let data = await UserModel.findOne({where: {id: req.params.id}});
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

//create new user
const post = async function (req, res) {
  const salt = await bcrypt.genSalt();
  const newPass = await bcrypt.hash(req.body.password, salt);
  const data = {...req.body, password: newPass};

  try {
    let newUser = await UserModel.create({
      ...data,
      image: req.file.filename,
    });

    newUser = JSON.parse(JSON.stringify(newUser));

    newUser = {
      ...newUser,
      image: process.env.FILE_PATH + newUser.image,
    };

    // code here
    res.send({
      status: 'success',
      data: {
        newUser,
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

const deleteOne = async function (req, res) {
  try {
    const model = await UserModel.destroy({
      where: {id: req.params.id},
      force: true,
    });
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully delete',
      data: req.params.id,
    });
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
    const model = await UserModel.update(req.body, {
      where: {id: req.params.id},
    });
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully update user',
      data: {
        meta: {
          model: 'User',
          page: 1,
          total: model[0],
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: 'Error server',
      data: err,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const model = await UserModel.update(req.body, {
      where: {id: res.locals.userId},
    });
    if (!model) {
      throw model;
    }
    res.status(200).json({
      code: 1,
      message: 'Successfully update user profile',
      data: {
        meta: {
          model: 'User',
          page: 1,
          total: model[0],
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: 'Error server',
      data: err,
    });
  }
};

const updatePP = async (req, res) => {
  try {
    const data = req.body;

    await UserModel.update(
      {
        ...data,
        image: req.file.filename,
      },

      {
        where: {id: res.locals.userId},
      },
    );

    res.send({
      status: 'success',
      message: 'Update user profile pic success',
      data: {
        image: req.file.filename,
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

//get one based on id
const profile = async (req, res) => {
  try {
    let idProfile = res.locals.userId;
    let data = await UserModel.findOne({where: {id: idProfile}});
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

module.exports = {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
  profile,
  updateProfile,
  updatePP,
};
