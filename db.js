const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_HOST}/wirvsvirus`);
