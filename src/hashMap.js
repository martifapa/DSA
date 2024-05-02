export default class HashMap {
    constructor(num_buckets=16, loadFactor=0.8) {
        this.length = 0;
        this.loadFactor = loadFactor;
        this.num_buckets = num_buckets;
        this.buckets = Array.from({length: num_buckets}, () => null);
    }

    // helpers

    hash (key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        
        return hashCode % this.num_buckets;
    }

    incrementBuckets (increment) {
        increment ? this.num_buckets * 2 : this.num_buckets / 2;
        const newBucketArray = Array.from({length: this.num_buckets}, () => null);
    }

    // interface

    set (key, value) { //increase num buckets?
        this.buckets[this.hash(key)] = new Node(key, value);
        this.length++;
    }

    get (key) {
        return this.buckets[this.hash(key)];
    }

    has (key) {
        return this.buckets[this.hash(key)] ? true : false;
    }

    remove (key) { //decrease num buckets?
        if (!this.has(key)) return
        this.buckets[this.hash(key)] = null;
        this.length--;
    }

    length () {
        return this.length;
    }

    clear () {
        this.num_buckets = 16;
        this.length = 0;
        this.buckets = Array.from({length: this.num_buckets}, () => null);
    }

    keys () {
        return this.buckets.filter(bucket => {
            if (bucket instanceof LinkedList) {
                //handle LL case
            } else {
                if (bucket !== null) return bucket;
            }
        })
        .map(bucket => bucket.key);
    }

    values () {
        return this.buckets.filter(bucket => {
            if (bucket instanceof LinkedList) {
                //handle LL case
            } else {
                if (bucket !== null) return bucket;
            }
        })
        .map(bucket => bucket.value);
    }

    entries () {}
}