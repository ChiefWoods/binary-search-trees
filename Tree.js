import Node from './Node.js';

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);
    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      let previous = null;
      let temp = this.root;
      while (temp) {
        if (temp.value > value) {
          previous = temp;
          temp = temp.left;
        } else {
          previous = temp;
          temp = temp.right;
        }
      }
      if (previous.value > value) {
        previous.left = new Node(value);
      } else {
        previous.right = new Node(value);
      }
    }
  }

  delete(value) {
    let previous = null;
    let temp = this.root;
    while (temp.value !== value) {
      if (temp.value > value) {
        previous = temp;
        if (!temp.left) {
          return console.log("Node doesn't exist");
        }
        temp = temp.left;
      } else {
        previous = temp;
        if (!temp.right) {
          return console.log("Node doesn't exist");
        }
        temp = temp.right;
      }
    }
    if (!temp.left && !temp.right) {
      temp = null;
    } else if (temp.left && !temp.right) { // target only has left subtree 
      previous.right = temp.left;
    } else if (!temp.left && temp.right) { // target only has right subtree    
      previous.left = temp.right;
    } else { // target has both left and right subtrees
      let targetParent = previous;
      let target = temp;
      previous = target.right;
      if (previous.left) {
        temp = previous.left;
        while (temp.left) {
          previous = temp;
          temp = temp.left;
        }
        previous.left = temp.right;
        if (targetParent) {
          targetParent.value > value ? targetParent.left = temp : targetParent.right = temp;
        } else {
          this.root = temp;
        }
        temp.left = target.left;
        temp.right = target.right;
      } else {
        if (targetParent) {
          targetParent.value > value ? targetParent.left = previous : targetParent.right = previous;
        }
        previous.left = target.left;
      }
    }
  }

  find(value) {
    let temp = this.root;
    while (temp.value !== value) {
      if (temp.value > value) {
        if (!temp.left) {
          return "Node doesn't exist";
        }
        temp = temp.left;
      } else {
        if (!temp.right) {
          return "Node doesn't exist";
        }
        temp = temp.right;
      }
    }
    return temp;
  }

  // levelOrder(callback = null) { // iterative
  //   if (!this.root) {
  //     return;
  //   }
  //   let node = null;
  //   let arr = [];
  //   let queue = [this.root];
  //   while (queue.length) {
  //     node = queue[0];
  //     callback ? callback(node) : arr.push(node.value);
  //     if (node.left) {
  //       queue.push(node.left);
  //     }
  //     if (node.right) {
  //       queue.push(node.right);
  //     }
  //     queue.shift();
  //   }
  //   if (!callback) {
  //     return arr;
  //   }
  // }

  levelOrder(callback = null, arr = [], queue = [], node = this.root) { // recursive
    if (!node) {
      return;
    }
    callback ? callback(node) : arr.push(node.value);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    while (queue.length) {
      node = queue[0];
      queue.shift();
      this.levelOrder(callback, arr, queue, node);
    }
    if (!callback) {
      return arr;
    }
  }

  inorder(callback = null, arr = [], node = this.root) {
    if (!node) {
      return;
    }
    this.inorder(callback, arr, node.left);
    callback ? callback(node) : arr.push(node.value);
    this.inorder(callback, arr, node.right);
    if (!callback) {
      return arr;
    }
  }

  preorder(callback = null, arr = [], node = this.root) {
    if (!node) {
      return;
    }
    callback ? callback(node) : arr.push(node.value);
    this.preorder(callback, arr, node.left);
    this.preorder(callback, arr, node.right);
    if (!callback) {
      return arr;
    }
  }

  postorder(callback = null, arr = [], node = this.root) {
    if (!node) {
      return;
    }
    this.postorder(callback, arr, node.left);
    this.postorder(callback, arr, node.right);
    callback ? callback(node) : arr.push(node.value);
    if (!callback) {
      return arr;
    }
  }

  height(node = this.root) {
    if (typeof (node) === 'string') {
      return node;
    }
    if (!node) {
      return -1;
    }
    let leftHeight = this.height(node.left) + 1;
    let rightHeight = this.height(node.right) + 1;
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  depth(node) { // iterative
    if (typeof (node) === 'string') {
      return node;
    }
    let nodeDepth = 0;
    let temp = this.root;
    while (temp !== node) {
      if (temp.value > node.value) {
        temp = temp.left;
        nodeDepth++;
      } else {
        temp = temp.right;
        nodeDepth++;
      }
    }
    return nodeDepth;
  }

  // depth(node, temp = this.root) { // recursive
  //   if (typeof (node) === 'string') {
  //     return node;
  //   }
  //   if (node.value === temp.value) {
  //     return 0;
  //   }
  //   if (node.value < temp.value) {
  //     return this.depth(node, temp.left) + 1;
  //   } else {
  //     return this.depth(node, temp.right) + 1;
  //   }
  // }

  isBalanced() {
    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);
    return Math.abs(leftHeight - rightHeight) < 2;
  }

  rebalance() {
    let sortedArr = this.levelOrder().sort((a, b) => a - b);
    this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1);
  }
}
