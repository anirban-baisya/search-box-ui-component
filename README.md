
# 📦 Search Box UI Component

A modern, reusable React search box UI component featuring tabs, filters, animated highlights, and action buttons for files—styled with Tailwind CSS and React Icons.

**Live Demo:**  
[https://search-box-ui-component.netlify.app/](https://search-box-ui-component.netlify.app/)

***

## Features

-  Smart search bar with clear button and instant results  
-  Filterable tabs (All, Files, People) with dynamic visibility  
-  Settings dropdown to toggle result categories  
-  Result highlighting with smooth animations  
-  File results show "Copy link" & "New Tab" actions (hover only)  
-  Tailwind CSS styling for pixel-perfect UI  
-  React Icons for intuitive visuals  
-  Fully customizable and easy to integrate

***

## Tech Stack

- **React 18+**
- **Tailwind CSS**
- **React Icons**

***

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/anirban-baisya/search-box-ui-component.git
   cd search-box-ui-component
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run development server:**

   ```bash
   npm start
   ```

***

## Usage

```jsx
import SearchComponent from "./SearchComponent";
import "./search.css"; // Tailwind should be configured

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <SearchComponent />
    </div>
  );
}
```

Tailwind CSS must be installed and configured .

***

## Demo

For a fully interactive demo, visit:  
[https://search-box-ui-component.netlify.app/](https://search-box-ui-component.netlify.app/)

***
