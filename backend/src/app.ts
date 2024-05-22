import express from 'express';
import bodyParser from 'body-parser'
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import path from 'path';


const swaggerDocument = YAML.load(path.join(__dirname, './openApi/v1/swagger.yaml'))

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use('/api-doc-v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.listen(4000, () => {
  console.log(`Server is running on 4000`);
});