// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

// console.log("Welcome to Programiz!");

//Helper function to build a tree from a list of JSON items
const getTree = (list) => {
    //Create a object to hold the mapping of the nodes
    let nodes = {}
    //Create a variable to store later the root of the whole tree
    let root = undefined
    //Iterate in the list of json elements
    list.forEach((json) => {
        //Create a new instance of the Node class from the json
        let node = new Node(json)
        //We will map it using the id
        nodes[`${json.id}`] = node
        //If there is no parentId key in the json item it means is the root node
        if (!json.parentId) {
            root = node
        }
    })

    //Iterate on each one of the keys of the nodes mapped
    Object.keys(nodes).map((id) => {
        //Retrieve the node from the map corresponding to the current key
        let node = nodes[id]
        //Check if it has a parent
        if (node.parentId) {
            //Retrieve the parent from the map and set the relation
            nodes[`${node.parentId}`].setNode(node)
        }
    })
    return root
}

class Node {
    constructor({ id, name, parentId }) {
        this.id = id;
        this.name = name;
        this.parentId = parentId
        this.left = null;
        this.right = null;
        this.parent = null
    }

    setNode(node) {
        if (!this.left) {
            this.left = node
        } else {
            this.right = node
        }
    }

    get left() {
        return this._left
    }

    set left(node) {
        this._left = node
        if (node) {
            node.parent = this
        }
    }

    get right() {
        return this._right
    }

    set right(node) {
        this._right = node
        if (node) {
            node.parent = this
        }
    }

    search(wantedID) {
        var self = this;
        let result;
        if (self.id === wantedID) {
            // console.log(self.id)
            return self;
        }
        else {
            if (self.left) {
                result = self.left.search(wantedID);
                if (result) {
                    return result;
                }
            }
            if (self.right) {
                result = self.right.search(wantedID);
            }
        }

        return result;

    }

    getDescendantsInLevel(level) {
        let result = [];
        if (level === 0) {
            result.push(this);
        }
        else {
            if (this.left) {
                this.left.getDescendantsInLevel(level - 1);
            }
            if (this.right) {
                this.right.getDescendantsInLevel(level - 1);
            }
        }
        return result;
    }
}

let treeJson = [
    { id: 1, name: "Pedro A" },
    { id: 2, name: "Pedro H", parentId: 1 },
    { id: 3, name: "Lorena", parentId: 1 },
    { id: 4, name: "Luis", parentId: 2 },
    { id: 5, name: "Jimena", parentId: 3 },
    { id: 6, name: "Lucia", parentId: 2 },
    { id: 7, name: "Augusto", parentId: 6 },
    { id: 8, name: "Hsing Li", parentId: 6 },
    { id: 9, name: "Carmen", parentId: 8 },
    { id: 10, name: "Gabriel", parentId: 7 },
    { id: 11, name: "Juan", parentId: 7 },
    { id: 12, name: "Isabella", parentId: 5 },
    { id: 13, name: "Cristina", parentId: 5 },
    { id: 14, name: "Julia", parentId: 10 },
    { id: 15, name: "Javier", parentId: 11 },
]

const tree = getTree(treeJson);

let result = tree.search(6);
// console.log(result);

let descendants = tree.getDescendantsInLevel(2)
console.log(descendants);

// console.log(tree);