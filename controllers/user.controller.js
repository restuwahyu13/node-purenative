const userSchema = require("../models/user.models");
const flash = require("../helpers/flashMessage");
const {body, query} = require("../helpers/bodyParser");

/**
* @method GET
* @route /result
* @description route method for result users data
*/

exports.resultsController = async(req, res) => {

    const resultsData  = await userSchema.find().lean();

    if(!resultsData) flash(res, 404, {msg: "Data not found in database"});
    flash(res, 200, {msg: "Data already to use", results: resultsData});
}

/**
* @method POST
* @route /insert
* @description route method for insert user data
*/

exports.createController =  (req, res) => {

    body(req, async (data) => {
      const userData = await userSchema.findOne({name: data.name});
      if(userData) flash(res, 409, {msg: "Data already exists"});

      const dataBody = new userSchema({
          name: data.name,
          age: data.age,
          hobby: data.hobby,
          country: data.country,
          state: data.state,
      });

      const savingData = await dataBody.save()

      if(!savingData) flash(res, 200, {msg: "Data failed store to database"});
      flash(res, 201, {msg: "Data successfuly store to database", data: savingData});
    });
}

/**
* @method GET
* @route /result/?id=5eb057078ab8f41734220d60
* @description route method for result user data
*/

exports.resultController = (req, res) => {

    query(req, async(data) => {
      const resultData = await userSchema.findOne({_id: data.id});

      if(!resultData) flash(res, 404, {msg: "Data not found in database"});
      flash(res, 200, {msg: "Data ready to use", data: resultData});
    });
}

/**
* @method DELETE
* @route /delete/?id=5eb057078ab8f41734220d60
* @description route method for delete user data
*/

exports.deleteController = (req, res) => {

    query(req, async(data) => {
      const resultData = await userSchema.findOne({_id: data.id});

      if(!resultData) flash(res, 404, {msg: "Data not found in database"});
      await userSchema.deleteOne({_id: resultData._id});

      flash(res, 200, {msg: "Data successfuly to deleted"});
    });
}

/**
* @method PUT
* @route /update/?id=5eb057078ab8f41734220d60
* @description route method for update user data
*/

exports.updateController = (req, res) => {

    query(req, async(id) => {

      let resultData = await userSchema.findOne({_id: id.id});
      if(!resultData) flash(res, 404, {msg: "Data not found in database"});

        body(req, async(data) => {

          let updateData = await userSchema.updateOne({_id: resultData._id},
            {$set: {name: data.name, age: data.age, hobby: data.hobby, country: data.country, state: data.state}});

            flash(res, 200, {msg: "Data successfuly to updated"});
        });
    });
}
