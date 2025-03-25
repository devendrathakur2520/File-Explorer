
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Folder from "./components/Folder";
import { insertNode, deleteNode, updateNode, selectFile, setSearchQuery } from "./redux/fileExplorerSlice";

function App() {
  const explorerData = useSelector((state) => state.fileExplorer.explorerData);
  const selectedFile = useSelector((state) => state.fileExplorer.selectedFile);
  const searchQuery = useSelector((state) => state.fileExplorer.searchQuery);

  const dispatch = useDispatch();
  console.log(selectFile);


  const handleInsertNode = (folderId, itemName, isFolder) => {
    dispatch(insertNode({ parentId: folderId, name: itemName, isFolder }));
  };

  const handleDeleteNode = (folderId) => {
    dispatch(deleteNode({ id: folderId }));
  };

  const handleUpdateFolder = (id, updatedValue) => {
    dispatch(updateNode({ id, newName: updatedValue }));
  };

  const handleSelectFile = (file) => {
    dispatch(selectFile(file));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const filterFiles = (node, query) => {
    if (!query) return node;
    if (node.name.toLowerCase().includes(query.toLowerCase())) return node;
    if (node.items) {
      const filteredItems = node.items.map((item) => filterFiles(item, query)).filter(Boolean);
      if (filteredItems.length > 0) return { ...node, items: filteredItems };
    }
    return null;
  };

  const filteredExplorerData = filterFiles(explorerData, searchQuery);

  return (
    <div className="App">
      <div className="folderContainerBody">
        <div className="folder-container">
          <p className="font-bold text-white">File Explorer</p>
          <input
            type="text"
            placeholder="Search files or folders..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="py-1 border-gray outline-none"
          />
          {filteredExplorerData ? (
            <Folder
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleUpdateFolder={handleUpdateFolder}
              explorerData={filteredExplorerData}
              onSelectFile={handleSelectFile}
            />
          ) : (
            <p>No results found</p>
          )}
        </div>
        <div className="empty-state">
          {selectedFile ? <div>Opened File: {selectedFile.name}</div> : <div>Your content will be here</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
