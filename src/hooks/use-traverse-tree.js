const useTraverseTree = () => {
  function insertNode(tree, folderId, itemName, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: itemName,
        isFolder,
        items: [],
      });
      return tree;
    }

    tree.items.map((obj) => {
      let res = insertNode(obj, folderId, itemName, isFolder);
      if (res) {
        return res;
      }
    });
  }
  function deleteNode(tree, folderId) {

    if (tree.id === folderId) {
      return null;
    }

    if (tree.items && tree.items.length > 0) {
      tree.items = tree.items.map((child) => deleteNode(child, folderId));
      tree.items = tree.items.filter(Boolean);
    }

    return { ...tree };
  }
  function updateNode(tree, folderId, itemName, isFolder) {
    if (tree.id === folderId) {
      return {
        ...tree,
        name: itemName,
      };
    }

    if (tree.items && tree.items.length > 0) {
      tree.items = tree.items.map((child) =>
        updateNode(child, folderId, itemName)
      );
    }

    return { ...tree };
  }
  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
