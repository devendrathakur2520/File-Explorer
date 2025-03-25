import { createSlice } from "@reduxjs/toolkit";
import folderData from "../data/folderData"; 

const initialState = {
  explorerData: folderData, 
  selectedFile: null,
  searchQuery: "",
};

const findNodeById = (node, id) => {
  if (node.id === id) return node;
  if (!node.items) return null;
  for (let item of node.items) {
    const found = findNodeById(item, id);
    if (found) return found;
  }
  return null;
};

const fileExplorerSlice = createSlice({
  name: "fileExplorer",
  initialState,
  reducers: {
    insertNode: (state, action) => {
      const { parentId, name, isFolder } = action.payload;
      const parentNode = findNodeById(state.explorerData, parentId);
      if (parentNode) {
        parentNode.items.push({
          id: Date.now().toString(),
          name,
          isFolder,
          items: isFolder ? [] : undefined,
        });
      }
    },
    deleteNode: (state, action) => {
      const { id } = action.payload;
      const recursiveDelete = (node, id) => {
        if (!node.items) return;
        node.items = node.items.filter(item => item.id !== id);
        node.items.forEach(item => recursiveDelete(item, id));
      };
      recursiveDelete(state.explorerData, id);
    },
    updateNode: (state, action) => {
      const { id, newName } = action.payload;
      const node = findNodeById(state.explorerData, id);
      if (node) node.name = newName;
    },
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; 
    },
  },
});

export const { insertNode, deleteNode, updateNode, selectFile, setSearchQuery } = fileExplorerSlice.actions;
export default fileExplorerSlice.reducer;
