import { createRoot } from "react-dom/client";
import './tailwind.css' ;

// import frameworkData from "./framework.json";
import SearchBar from "./SearchBar";
import CafeList from "./CafeList";


createRoot(document.getElementById("root"))
    .render(
        <div>
    
           {/* <FrameworkList/> */}
           {/* <FrameworkListSearchFilter/>  */}
           {<CafeList/>}
           {<SearchBar/>}
           {/* <ResponsiveDesign/> */}
        </div>
    )

    