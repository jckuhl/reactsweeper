export default function flatten(array) {
    let flat = true;
    do {
        array = array.reduce((result, arr) => result.concat(arr), []);
        flat = array.every(arr => !(Array.isArray(arr)));
    } while(!flat);
    return array;
}