import HashMap from './src/hashMap.js'


const hm = new HashMap();

hm.set('kevin', 'spacey');
hm.set('kevin', 'bacon'); // update value

hm.set('kebin', '2'); // same hashed key

hm.set('aaaaa', '3');
hm.set('bbbbb', '4'); // increase (double) array size
hm.set('ccccc', '5');
hm.set('ddddd', '6');
hm.set('eeeee', '7'); // increase (double) array size


console.log(hm.buckets)
console.log(hm.entries())