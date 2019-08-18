'use strict'

const obj = {
    name: 'Alex',
    age: 33,
    locality: {
        country: 'UA',
        city: 'Dnipro'
    }
};

let clone = copy(obj);

function copy(object) {
    let newObject = {};

    for (let key in object) {
        
        if (typeof(object[key]) != 'object') {
            newObject[key] = object[key]
        } else {
            newObject[key] = copy(object[key]);
        }       
    }

    return newObject;
}