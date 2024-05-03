import Node from './node.js'
import LinkedList from './linkedList.js'

const BASE_NUM_BUCKETS = 16;

export default class HashMap {
    constructor(num_buckets=4, loadFactor=0.8) {
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

    hasHash (key) {
        return this.buckets[this.hash(key)] ? true : false;
    }

    incrementBuckets (increment) {
        this.num_buckets = increment ? this.num_buckets * 2 : this.num_buckets / 2;
        const clonedBuckets = this.buckets;
        this.length = 0;

        this.buckets = Array.from({length: this.num_buckets}, () => null);
        clonedBuckets.forEach(bucket => {
            // console.log('loop', bucket)
            if (bucket === null) return
            else if (bucket instanceof LinkedList) {
                for (let node of bucket) {
                    const newNode = new Node(node.key, node.value);
                    this.set(newNode.key, newNode.value);
                }
            } else { this.set(bucket.key, bucket.value) }
        });
    }

    // interface

    set (key, value) {
        const keyPresent = this.hasHash(key);
        if (keyPresent) { // hashed key already exists
            const bucket = this.buckets[this.hash(key)];
            if (bucket instanceof Node) { // hashed key is present once
                if (bucket.key === key) { // same unhashed key => update value
                    bucket.value = value;
                } else { // different unhashed key => create new LinkedList and append new key-value pair
                const linkedList = new LinkedList();
                linkedList.append(bucket.key, bucket.value);
                linkedList.append(key, value);
                this.buckets[this.hash(key)] = linkedList;
                this.length++;
                }
            } else { // hashed key is present more than once (LinkedList already exists)
                const keyValueIdx = bucket.find(key);
                keyValueIdx === null ? bucket.append(key, value) : bucket.insertAt(value, keyValueIdx);
            }
        } else {
            this.buckets[this.hash(key)] = new Node(key, value);
            this.length++;
        }

        if (this.length / this.num_buckets >= this.loadFactor) { this.incrementBuckets(true) }
        }

    get (key) {
        return this.buckets[this.hash(key)];
    }

    has (key) {
        return this.buckets[this.hash(key)]?.key === key ? true : false;
    }

    remove (key) {
        if (!this.has(key)) return
        this.buckets[this.hash(key)] = null;
        this.length--;
        if (this.num_buckets > BASE_NUM_BUCKETS && this.length / 2 < this.num_buckets) { this.incrementBuckets(false) }
    }

    length () {
        return this.length;
    }

    clear () {
        this.num_buckets = BASE_NUM_BUCKETS;
        this.length = 0;
        this.buckets = Array.from({length: this.num_buckets}, () => null);
    }

    keys () {
        return this.buckets.filter(bucket => (bucket !== null))
            .map(bucket => {
                if (bucket instanceof LinkedList) {
                    const nodes = [];
                    for (const node of bucket) nodes.push(node.key);
                    return nodes;
                } else { return bucket.key }})
            .flat();
    }

    values () {
        return this.buckets.filter(bucket => (bucket !== null))
            .map(bucket => {
                if (bucket instanceof LinkedList) {
                    const nodes = [];
                    for (const node of bucket) nodes.push(node.value);
                    return nodes;
                } else { return bucket.value }})
            .flat();
    }

    entries () { // flatten entries stored in LinkedList
        return this.buckets.filter(bucket => (bucket !== null))
            .map(bucket => {
                if (bucket instanceof LinkedList) {
                    const nodes = [];
                    for (const node of bucket) nodes.push([node.key, node.value]);
                    return nodes;
                } else { return [bucket.key, bucket.value] }})
            .map(item => item[0] instanceof Array ? item : item);
    }
}