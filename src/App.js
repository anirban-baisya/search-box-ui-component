import SearchPanel from "./components/SearchPanel";
import { allCategories, results } from "./data/data";

function App() {
  return (
    <div className="App">
      <div
        style={{
          background: "#ededee",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchPanel allCategories={allCategories} searchResults={results} />
      </div>
    </div>
  );
}

export default App;
