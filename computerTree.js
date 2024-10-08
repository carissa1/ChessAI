class Node {
    // constructor
    constructor(element) {
        this.element = element;
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.size = 0
    }
 
    // adds an element at the end of list
    add(element) {
        // creates a new node
        let node = new Node(element)
 
        // to store current node
        let current = 0
 
        // if list is Empty add the element and make it head
        if (this.head == null)
            this.head = node
        else {
            current = this.head
 
            // iterate to the end of the list
            while (current.next) {
                current = current.next
            }
 
            // add node
            current.next = node
        }
        this.size++
    }
 
    // insert element at the position index of the list
    insertAt(element, index) {
        if (index < 0 || index > this.size) {
            return console.log("Please enter a valid index.")
        }
        else {
            // creates a new node
            let node = new Node(element)
            let prev = 0
 
            let curr = this.head
 
            // add the element to the first index
            if (index == 0) {
                node.next = this.head
                this.head = node
            } 
            else {
                curr = this.head
                let it = 0
 
                // iterate over the list to find the position to insert
                while (it < index) {
                    it++
                    prev = curr
                    curr = curr.next
                }
 
                // adding an element
                node.next = curr
                prev.next = node
            }
            this.size++
        }
    }
 
    // removes an element at index
    removeFrom(index) {
        if (index < 0 || index >= this.size) {
            return console.log("Please Enter a valid index")
        }
        else {
            let it = 0;
            let curr = this.head
            let prev = curr
 
            // deleting first element
            if (index === 0) {
                this.head = curr.next
            } 
            else {
                // iterate over the list to the position to removce an element
                while (it < index) {
                    it++
                    prev = curr
                    curr = curr.next
                }
 
                // remove the element
                prev.next = curr.next
            }
            this.size--
 
            // return the remove element
            return curr.element
        }
    }
 
    // removes a given element from the list
    removeElement(element) {
        let current = this.head
        let prev = null
 
        // iterate over the list
        while (current != null) {
            // comparing element with current element if found then remove the and return true
            if (current.element === element) {
                if (prev == null) {
                    this.head = current.next
                } 
                else {
                    prev.next = current.next
                }
                this.size--
                return current.element
            }
            prev = current
            current = current.next
        }
        return -1
    }
 
 
    // finds the index of element
    indexOf(element) {
        let count = 0
        let current = this.head
 
        // iterate over the list
        while (current != null) {
            // compare each element of the list with given element
            if (current.element === element) {
                return count
            }
            count++
            current = current.next
        }
 
        // not found
        return -1
    }
 
    // checks the list for empty
    isEmpty() {
        return this.size == 0
    }
 
    // gives the size of the list
    listSize() {
        return this.size
    }
 
 
    // prints the list items
    printList() {
        let curr = this.head;
        while (curr) {
            // str += curr.element + " ";
            // curr = curr.next;
            console.log(curr.element)
            curr = curr.next
        }
        // console.log(str);
    }

    // puts linkedList in list
    makeList() {
        let curr = this.head
        let lst = []
        while (curr) {
            lst.push(curr.element)
            curr = curr.next
        }
        return lst
    }
 
}

class Tree {
    constructor() {
      this.root = null;
    }
    
    // goes through every node
    traverse(callback) {
        function goThrough(node) {
            callback(node);
            node.children.forEach((child) => {
                goThrough(child);
            });
        }
        goThrough(this.root);
    }

    // goes through every node in branch in reverse
    traverseReverse(callback, nodeGiven) {
        function goThrough(node) {
            if (node.parent != null) {
                callback(node);
                goThrough(node.parent)
            }
        }
        goThrough(nodeGiven);
    }
  
    // adds a node
    addNode(value, parentNum, number, score) {
        let parent = 0
        if (parentNum == null) {
            parent = null
        }
        else {
            parent = this.search(parentNum)
        }

        let newNode = {
            value,
            children: [],
            number,
            parent,
            score
        }
    
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let pushedChild = false
        if (parent.children.length == 0) {
            parent.children.push(newNode)
        }
        else {
            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children[i].score >= newNode.score) {
                    parent.children.splice(i, 0, newNode)
                    pushedChild = true
                    break
                }
            }
            if (!pushedChild) {
                parent.children.push(newNode)
            }
        }
    
        // this.traverse((node) => {
        //     if (node.number === parentNum) {
        //         node.children.push(newNode);
        //     }
        // });
    }
    
    // removes a node
    removeNode(number) {
        // this.traverse((node) => {
        //     node.children.forEach((childNode, index) => {
        //         if (childNode.number == number) {
        //             node.children.splice(index, 1);
        //         }
        //     });
        // })
        this.root.children.forEach((childNode, index) => {
            if (childNode.number == number) {
                this.root.children.splice(index, 1);
            }
        });
    }
    
    // searches for a number
    search(num) {
        let returnNode = 'Not Found';
        this.traverse((node) => {
            if (node.number === num) {
                returnNode = node;
            }
        });
        return returnNode;
    }

    // searches for a score
    searchScore(score) {
        let returnNodes = [];
        this.traverse((node) => {
            if (GetScore(node.value) == score) {
                returnNodes.push(node);
            }
        });
        return returnNodes;
    }

    getMove(nodeGiven) {
        // let nodeGiven = this.search(num)
        let returnNode = "Not Found"
        this.traverseReverse((node) => {
            let parentNode = node.parent
            if (parentNode.number == this.root.number) {
                returnNode = node
            }
        }, nodeGiven)
        return returnNode
    }
    
    // prints all the leafs of a node (all the last children)
    displayLeafs(parentValue) {
        let parentNode = typeof parentValue === 'string' ? this.search(parentValue) : parentValue ;
        let leafsRet = [];
        if (parentValue.children && !parentValue.children.length) {
            return parentValue;
        }
  
        parentNode.children.forEach((child) => {
            leafsRet.push(this.displayLeafs(child));
        });
  
        return leafsRet.flat();
    }
}
