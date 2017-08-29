var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// let db = {
//   localhost: 'mongodb://localhost:27017/TodoApp',
//   mlab: 'mongodb://peacefu-dbuser:peacefu-dbuser123123@ds161503.mlab.com:61503/todoapp20170829'
// };
// mongoose.connect(db.localhost || db.mlab);

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
