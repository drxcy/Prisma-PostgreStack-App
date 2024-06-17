import "dotenv/config";
import express,{Router} from 'express';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.get('/', (req, res) => {
   return res.send('Hello World');
});

import routes from './Routes/index.js';
app.use(routes);
app.listen( PORT,() => console.log(`listening port on ${PORT}`));
// export default Router ;