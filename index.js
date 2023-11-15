const express = require('express')
const logger = require('./utils/logger')(module)


const app  = express()
app.use(express.json({limit: '50mb'}))

app.get('*', async (req, res) =>{
        res.send({service: true})
})

const PORT = process.env.PORT || 4343
app.listen(PORT, () =>{
        logger.info(`App is now running on port ${PORT}!!!`);
        logger.info(`The following profiles are active: ${process.env.NODE_ENV}`);
})