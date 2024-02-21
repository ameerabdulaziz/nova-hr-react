import TreeNode from './TreeNode';

class Tree {
  // Tree constructor
  constructor(id, value = id) {
    this.root = new TreeNode(id, value);
  }

  // Pre-order traversal as an array
  preOrderTraversal(node = this.root) {
    const result = [node];
    if (node.children.length) {
      node.children.forEach((child) => {
        result.push(...this.preOrderTraversal(child));
      });
    }
    return result;
  }

  // Post-order traversal as an array
  postOrderTraversal(node = this.root) {
    const result = [];
    if (node.children.length) {
      node.children.forEach((child) => {
        result.push(...this.postOrderTraversal(child));
      });
    }
    result.push(node);
    return result;
  }

  // Clone method to create a new instance with the same structure
  clone() {
    const newTree = new Tree(); // Create a new instance of the Tree
    newTree.root = this.root.clone(); // Assume a clone method exists in TreeNode
    return newTree;
  }

  // Insert a new node with the given id and value under the specified parent id
  insert(parentNodeId, id, value = id) {
    const nodes = this.preOrderTraversal();
    nodes.forEach((node) => {
      if (node.id === parentNodeId) {
        node.children.push(new TreeNode(id, value, node));
      }
    });
  }

  // Remove a node with the given id from the tree
  remove(id) {
    const nodes = this.preOrderTraversal();
    nodes.forEach((node) => {
      const filtered = node.children.filter((child) => child.id !== id);
      node.children = filtered;
    });
  }

  // Find and return the first node with the specified id
  find(id) {
    const nodes = this.preOrderTraversal();
    return nodes.find((node) => node.id === id);
  }

  // Add isCheck property to the specified node and disable its children and nested levels
  addIsCheckProperty(id, isCheck) {
    const nodeToSet = this.find(id);
    if (nodeToSet) {
      const traverse = (node) => {
        node.isCheck = isCheck;
        if (node.hasChildren) {
          node.children.forEach((child) => {
            child.disabled = isCheck; // Disable children based on the isCheck value
            traverse(child); // Recursively apply to nested levels
          });
        }
      };

      traverse(nodeToSet);
    }
  }

  // Get checked items that don't have children without the parent property
  getCheckedLeafNodes() {
    const checkedLeafNodes = [];

    const traverse = (node) => {
      if (node.isCheck) {
        checkedLeafNodes.push({
          id: node.id,
          value: node.value,
          isCheck: node.isCheck,
          disabled: node.disabled,
        });
      } else if (node.hasChildren) {
        node.children.forEach((child) => {
          traverse(child);
        });
      }
    };

    traverse(this.root);
    return checkedLeafNodes;
  }

  // Static method to build the tree from an array representation
  static buildTreeFromArray(treeArray) {
    if (!treeArray) {
      return new Tree();
    }

    const buildNode = (data, parent = null) => {
      const { id, value = id, children = [] } = data;
      const node = new TreeNode(id, value, parent);
      children.forEach((childData) => {
        const childNode = buildNode(childData, node);
        node.children.push(childNode);
      });
      return node;
    };

    const tree = new Tree(); // Instantiating the Tree class without initial id and value parameters
    tree.root = buildNode(treeArray);
    return tree;
  }
}

export default Tree;
