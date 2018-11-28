import {appRouter} from "../../index";

export default ()=>{
    appRouter.get('/product/:code', (req, res)=>{
        const message = `information sur le produit ${req.params.code}`
        return res.json({
            "message": message
        });
    });
};