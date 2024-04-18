class TreeNode {
  // TreeNode constructor
  constructor(id, value = id, parent = null) {
    this.id = id;
    this.value = value;
    this.parent = parent;
    this.children = [];
    this.isCheck = false;
    this.disabled = false;
  }

  // Check if the node is a leaf (has no children)
  get isLeaf() {
    return this.children.length === 0;
  }

  // Check if the node has children
  get hasChildren() {
    return !this.isLeaf;
  }

  // Clone method to create a new instance with the same structure
  clone() {
    const newNode = new TreeNode(this.id, this.value, this.parent);
    newNode.isCheck = this.isCheck;
    newNode.disabled = this.disabled;
    newNode.children = this.children.map((child) => child.clone());
    return newNode;
  }
}

export default TreeNode;
