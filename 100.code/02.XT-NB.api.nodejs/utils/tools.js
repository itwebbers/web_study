'use strict'

/**
 * 数组/对象去重
 */
function RemoveSameArray(arr) {
    const obj = {}
    return arr.reduce((element, next) => {
        obj[next.key] ? '' : obj[next.name] = true && element.push(next)
        return element;
    }, [])
}


/**
 * 数去去重
 * @param {*} arr 
 * @param {*需要指定去重的属性值} u_key 
 */
function unique(arr, u_key) {
    let map = new Map()
    arr.forEach((item, index) => {
        if (!map.has(item[u_key])) {
            map.set(item[u_key], item)
        }
    })
    return [...map.values()]
}


module.exports = {
    RemoveSameArray: RemoveSameArray,
    unique: unique
}