export default class LinkedList {
    head = null;
    tail = null;
    length = 0;

    append (value) {
        const node = new Node(value);
        this.length++;
        
        if (!this.head) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
    }

    preppend (value) {
        const node = new Node(value);
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

        return currentNode.value
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
        return popped.value
    }

    contains (value) {
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value == value ) { return true }
            currentNode = currentNode.next;
        }

        return false
    }

    find (value) {
        let currentNode = this.head;
        let idx = 0;
        while (currentNode) {
            if (currentNode.value == value) { return idx}
            idx++;
            currentNode = currentNode.next;
        }
        
        return null;
    }

    toString () {
        let currentNode = this.head;
        let string = '';

        while (currentNode) {
            string += `(${currentNode.value}) --> `;
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

    insertAt (value, idx) {}

    removeAt (idx) {}
}