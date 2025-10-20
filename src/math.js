import CustomError from "./error.js";

function sumar(a,b){

    if(!a){
        throw new CustomError('a is invalid', 400)
    }
    else if(!b){
        throw new CustomError('b is invalid', 400)
    }

    return a+b
}

export default sumar