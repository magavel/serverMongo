import {appRouter} from "../../index";

export default ()=>{
    appRouter.get('/comment', (req, res)=>{
        return res.json({
            "commentaire": 'c\'ets goud'
        });
    });
};