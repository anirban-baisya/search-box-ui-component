import React, { useState } from "react";
import {
  FiSearch,
  FiSettings,
  FiUser,
  FiFile,
  FiCopy,
  FiExternalLink,
} from "react-icons/fi";

function highlightMatchLetter(name, query) {
  if (!query) return name;
  const regex = new RegExp(`(${query})`, "gi");
  return name.replace(
    regex,
    '<mark class="bg-yellow-100 rounded px-1">$1</mark>'
  );
}

export default function SearchComponent({ allCategories, searchResults }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ files: true, people: true });
  const [copiedId, setCopiedId] = useState(null);

  // Tabs to show based on filter toggles
  const filteredCategories = allCategories.filter((cat) => filters[cat.key]);
  const tabs = [{ key: "all", name: "All" }, ...filteredCategories];

  // Filtered results
  const filteredResults = searchResults
    .filter((r) => {
      if (activeTab === "All") return true;
      if (activeTab === "Files") return r.type === "file";
      if (activeTab === "People") return r.type === "person";
      return true;
    })
    .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-[410px] font-sans">
      {/* Search bar */}
      <div className="flex items-center bg-gray-100 rounded-lg p-2 mb-5">
        <FiSearch className="text-gray-400 text-xl mr-2" />
        <input
          className="bg-transparent flex-1 placeholder:text-gray-400 text-base outline-none"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="ml-2 text-gray-400 text-sm"
            onClick={() => setQuery("")}
          >
            Clear
          </button>
        )}
      </div>

      {/* Tabs + Settings */}
      {query && (
        <div className="flex gap-2 items-center mb-2">
          {/* Tabs on the left */}
          <div className="flex gap-2 items-center">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`px-4 py-1 rounded-lg text-gray-600 bg-gray-100 transition ${
                  activeTab === tab.name
                    ? "bg-white shadow font-semibold text-gray-900"
                    : ""
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Settings button + dropdown (aligned right) */}
          <div className="relative ml-auto">
            <button
              className="p-2 bg-gray-100 rounded-lg"
              onClick={() => setShowFilter((f) => !f)}
            >
              <FiSettings />
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg px-5 py-2 flex flex-col gap-2 z-10">
                {allCategories.map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={filters[item.key]}
                      onChange={() => {
                        const newFilters = {
                          ...filters,
                          [item.key]: !filters[item.key],
                        };
                        setFilters(newFilters);
                        if (
                          Object.values(newFilters).some((v) => v === false)
                        ) {
                          setActiveTab("All");
                        }
                      }}
                      className="accent-blue-500"
                    />
                    {item.key === "files" ? <FiFile /> : <FiUser />}
                    <span>{item.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Result list: only if there is a search value */}
      {query && (
        <div className="mt-4 flex flex-col gap-2">
          {filteredResults.length === 0 ? (
            <div className="text-gray-400 text-center py-6">
              No results found
            </div>
          ) : (
            filteredResults.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2 min-h-[58px] relative group"
              >
                <div className="text-2xl">
                  {r.type === "person" ? <FiUser /> : <FiFile />}
                </div>
                <div className="flex-1">
                  <span
                    className="text-base font-medium text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatchLetter(r.name, query),
                    }}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {r.type === "person" ? (
                      r.status
                    ) : (
                      <>
                        <span>{r.location}</span> &middot; {/*middot - use to add a middle dot  */}
                        <span>{r.editedAt}</span>
                        {r.fileCount && (
                          <span className="bg-indigo-100 text-indigo-600 ml-2 px-2 py-0.5 rounded-lg text-xs font-semibold">
                            {r.fileCount} Files
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {r.type === "person" && (
                  <span
                    className={`absolute right-4 top-4 w-2.5 h-2.5 rounded-full ${
                      r.status.includes("Active")
                        ? "bg-green-400"
                        : "bg-yellow-400"
                    }`}
                  />
                )}

                {/* File controls: ShowOnly on hover AND for type 'file' */}
                {r.type === "file" && (
                  <div className="flex gap-1 items-center absolute right-4 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Copy Link Button */}
                    <button
                      className="p-1 rounded hover:bg-gray-200"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://abc.com/file/${r.id}`
                        );
                        setCopiedId(r.id);
                        setTimeout(() => setCopiedId(null), 1500);
                      }}
                      title="Copy link"
                    >
                      <FiCopy className="text-gray-600" />
                    </button>
                    {/* Show "Link copied!" feedback if just clicked */}
                    {copiedId === r.id && (
                      <span className="text-xs bg-gray-800 text-white rounded px-2 py-0.5 ml-2 absolute -top-6 right-0 shadow z-10">
                        Link copied!
                      </span>
                    )}

                    {/* New Tab Button */}
                    <a
                      className="p-1 rounded hover:bg-gray-200 flex items-center"
                      href={`https://abc.com/file/${r.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in new tab"
                    >
                      <FiExternalLink className="text-gray-600 ml-1" />
                      <span className="text-xs ml-1 text-gray-500">
                        New Tab
                      </span>
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
