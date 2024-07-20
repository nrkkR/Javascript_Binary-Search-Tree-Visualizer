class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            this.visualize();
            return;
        }
        this.insertNode(this.root, newNode);
        this.visualize();
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    delete(value) {
        this.root = this.deleteNode(this.root, value);
        this.visualize();
    }

    deleteNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                node = null;
            } else if (node.left === null) {
                node = node.right;
            } else if (node.right === null) {
                node = node.left;
            } else {
                const aux = this.findMinNode(node.right);
                node.value = aux.value;
                node.right = this.deleteNode(node.right, aux.value);
            }
        }
        return node;
    }

    findMinNode(node) {
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    }

    traverse(order) {
        const result = [];
        switch (order) {
            case 'inOrder':
                this.inOrder(this.root, result);
                break;
            case 'preOrder':
                this.preOrder(this.root, result);
                break;
            case 'postOrder':
                this.postOrder(this.root, result);
                break;
        }
        showPopup(`Traversal (${order}): ${result.join(', ')}`);
    }

    inOrder(node, result) {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.value);
            this.inOrder(node.right, result);
        }
    }

    preOrder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
    }

    postOrder(node, result) {
        if (node !== null) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push(node.value);
        }
    }

    visualize() {
        const container = document.getElementById('bst-container');
        container.innerHTML = '';
        if (this.root !== null) {
            this.visualizeNode(this.root, container);
        }
    }

    visualizeNode(node, parentElement) {
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.textContent = node.value;

        if (parentElement) {
            parentElement.appendChild(nodeElement);
        }

        if (node.left) {
            const leftEdge = document.createElement('div');
            leftEdge.classList.add('edge', 'left-edge');
            nodeElement.appendChild(leftEdge);

            const leftChildContainer = document.createElement('div');
            leftChildContainer.style.display = 'flex';
            leftChildContainer.style.justifyContent = 'center';
            leftChildContainer.style.alignItems = 'center';
            parentElement.appendChild(leftChildContainer);

            this.visualizeNode(node.left, leftChildContainer);
        }

        if (node.right) {
            const rightEdge = document.createElement('div');
            rightEdge.classList.add('edge', 'right-edge');
            nodeElement.appendChild(rightEdge);

            const rightChildContainer = document.createElement('div');
            rightChildContainer.style.display = 'flex';
            rightChildContainer.style.justifyContent = 'center';
            rightChildContainer.style.alignItems = 'center';
            parentElement.appendChild(rightChildContainer);

            this.visualizeNode(node.right, rightChildContainer);
        }
    }
}

const bst = new BinarySearchTree();

document.getElementById('insert').addEventListener('click', () => {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        bst.insert(value);
    }
});

document.getElementById('delete').addEventListener('click', () => {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        bst.delete(value);
    }
});

document.getElementById('inOrder').addEventListener('click', () => {
    bst.traverse('inOrder');
});

document.getElementById('preOrder').addEventListener('click', () => {
    bst.traverse('preOrder');
});

document.getElementById('postOrder').addEventListener('click', () => {
    bst.traverse('postOrder');
});

document.getElementById('clear').addEventListener('click', () => {
    bst.root = null;
    bst.visualize();
});

function showPopup(message) {
    const popup = document.getElementById('popup');
    const traversalResult = document.getElementById('traversalResult');
    traversalResult.textContent = message;
    popup.style.display = 'block';
}

document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
};
