const {customerService} = require('../services')


const getAll = async ()=>{
    let data = await customerService.getAll();
    return {
        data:data,
        success:true
    };
}


module.exports = {
    getAll:getAll
}