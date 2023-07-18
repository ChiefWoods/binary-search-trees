import Tree from "./Tree.js";

function generateArray(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    let num = Math.floor(Math.random() * 100);
    while (arr.includes(num)) {
      num = Math.floor(Math.random() * 100);
    }
    arr.push(num);
  }  
  arr.sort((a, b) => a - b);
  return arr;
}

const tree = new Tree(generateArray(10));
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
tree.prettyPrint();
generateArray(5).forEach(ele => tree.insert(ele));
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
tree.prettyPrint();
