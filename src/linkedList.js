import Node from './node.js'

export default class LinkedList {
    head = null;
    tail = null;
    length = 0;

    append (key, value) {
        const node = new Node(key, value);
        this.length++;
        
        if (!this.head) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
    }

    preppend (key, value) {
        const node = new Node(key, value);
        this.length++;

        if (!this.tail) {
            this.tail = node;
        } else {
            node.next = this.head;
        }

        this.head = node;
    }

    at (idx) {
        if (idx > this.length - 1) { return 'Out of range' }

        let i = 0;
        let currentNode = this.head;
        while (i != idx) {
            i++;
            currentNode = currentNode.next;
        }

        return [currentNode.key, currentNode.value]
    }

    pop () {
        let popped = null;
        if (this.length === 0) { return 'No items in the list' }
        else if (this.length === 1) {
            popped = this.head;
            this.head = null;
            this.tail = null;
        } else {
            popped = this.tail;
            this.tail = this.getNewTail(popped);
        }
        
        this.tail.next = null;
        this.length--;
        return [popped.key, popped.value]
    }

    contains (key) {
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.key == key) { return true }
            currentNode = currentNode.next;
        }

        return false
    }

    find (key) {
        let currentNode = this.head;
        let idx = 0;
        while (currentNode) {
            if (currentNode.key == key) { return idx}
            idx++;
            currentNode = currentNode.next;
        }
        
        return null;
    }

    toString () {
        let currentNode = this.head;
        let string = '';

        while (currentNode) {
            string += `(${[currentNode.key, currentNode.value]}) --> `;
            currentNode = currentNode.next;
        }
        string += 'null';
        console.log(string);
    }

    getNewTail (currentTail) {
        let currentNode = this.head;
        while (currentNode.next != currentTail) {
            currentNode = currentNode.next;
        }
        return currentNode
    }

    insertAt (value, idx) {
        if (idx > this.length - 1) { return 'Out of range' }

        let i = 0;
        let currentNode = this.head;
        console.log(currentNode)
        while (i < idx) {
            i++;
            currentNode = currentNode.next;
        }
        console.log(currentNode)
        currentNode.value = value;
    }

    removeAt (idx) {}
}