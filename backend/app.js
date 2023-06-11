const express=require("express")
const fs = require("fs");
const path = require("path");
const cors=require("cors")
require('dotenv').config();
const bodyparser=require("body-parser")
const sequelize=require("./util/database")
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");


const expenseDetails=require("./routes/expenses")
const premiumFeatureDetails = require("./routes/premium-feature-route");
const premiumDetails = require("./routes/premium-route");
const userDetails = require("./routes/user-routes");
const resetPassword = require("./routes/reset-password")


const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");
const forgotPassword = require("./models/forgotpassword");
const downloadFile = require("./models/download");

const accessLogStream = fs.createWriteStream(path.join(
    __dirname, 'access.log'), 
    {flags: 'a'}
    );

const app=express();
app.use(cors());
app.use(bodyparser.json());
app.use(helmet());
app.use(compression());
app.use(morgan('combined', 
{
    stream: accessLogStream
}
)

);

app.use(expenseDetails)
app.use(userDetails);
app.use(premiumDetails);
app.use(premiumFeatureDetails);
app.use(resetPassword);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgotPassword);
forgotPassword.belongsTo(User);

User.hasMany(downloadFile);
downloadFile.belongsTo(User);

console.log(process.env.NODE_ENV);

sequelize.sync().then(()=>{
    app.listen(process.env.PORT || 2500);
})