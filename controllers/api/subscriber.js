const Subscriber = require('../../models/subscriber');

module.exports = {
    create,
};
  
async function create(req, res) {
  try {
    const subscriber = await Subscriber.create(req.body);
    console.log("create subscriber");
  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
}