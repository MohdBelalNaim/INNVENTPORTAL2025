const cds = require('@sap/cds');
const cors = require('cors');
const cov2ap = require("@sap/cds-odata-v2-adapter-proxy");

cds.on('bootstrap', (app) => {
    console.debug("Use: cors middleware");
    app.use(cors());
    app.use(cov2ap());
})
module.exports = cds.server;