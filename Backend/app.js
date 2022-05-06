const express = require('express')
const app = express()
const cors = require('cors')
const config  = require('./config')
const apiRoute = require('./routes/apiRoute')
const sequelize = require("./db.js")
const MicroController = require('./models/MicroControllerModel')
const Badge = require('./models/BadgeModel')
const dotEnv = require('dotenv').config()

app.use(express.json());
app.use(cors(config.corsOptions))
app.use('/api', apiRoute);

try {
    sequelize.authenticate();

    MicroController.belongsToMany(Badge, {
        through: "historique",
        as: "badges",
        foreignKey: "microc_id",
    });

    Badge.belongsToMany(MicroController, {
        through: "historique",
        as: "microcs",
        foreignKey: "badge_id",
    });

    sequelize.sync()
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} ...`));