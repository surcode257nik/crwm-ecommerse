import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap:{},
});

export const CategoriesProvider = ({children}) =>{
    const [ categoriesMap, setCategoriesMap ] = useState({});
    // need the below useeffect only once to store the data in our database so we commented it out
    // useEffect(()=>{
    //     addCollectionsAndDocuments('categories',SHOP_DATA);
    // },[])

    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[])

    const value = {categoriesMap};

    return <CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>
}