import fs from 'fs';
import path from 'path';

export const jsonEditor = (req, res, next) => {
    req.jsonReaderFile = function (filename) {
        try{
            let data = fs.readFileSync(path.join(process.cwd(), 'src', 'database', filename + '.json'), "UTF-8")
            data = data ? JSON.parse(data) : []
            return data
        } catch(err){
            return next(err);
        }
    }

    req.jsonWriterFile = function (filename, what) {
        try{
            fs.writeFileSync(path.join(process.cwd(), 'src', 'database', filename + '.json'), JSON.stringify(what, null, 4))
        } catch(err){
            return next(err);
        }
    }
    next()
}
