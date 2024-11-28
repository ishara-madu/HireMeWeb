import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryData } from "../../features/category/categoryThunk";


function TopCategory() {
    const [subcategory, setSubCategory] = useState(false);
    const [activeCategory, setActiveCategory] = useState(''); // Track the active category

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.items);


    useEffect(() => {
        dispatch(categoryData());
    }, [dispatch]);
    const uniqueCategory = [];
    const seenNames = new Set();
    category.forEach((user) => {
        if (!seenNames.has(user.name)) {
            seenNames.add(user.name);
            uniqueCategory.push(user);
        }
    });
    const lastTenCategory = uniqueCategory.slice(-10);

    const handleMouseOver = (name) => {
        setSubCategory(true);
        setActiveCategory(name);
    };
    const handleMouseOut = () => {
        setSubCategory(false);
        setActiveCategory('');
    };
    return (
        <div className="h-auto ">
            <div className="flex w-full h-12 bg-[#ebebeb] justify-center items-center shadow-lg shadow-[#bcbcbc]">
                <div className="flex h-full w-11/12 flex-row justify-center items-center">
                    {
                        lastTenCategory.map(
                            (item, id) => (
                                <div key={id} className="flex flex-col text-sm h-full items-center px-5 cursor-pointer justify-center relative" onMouseOver={() => handleMouseOver(item.name)} onMouseLeave={handleMouseOut}>{item.name}
                                    {(subcategory && (activeCategory == item.name)) &&
                                        <div className="absolute bottom-0" style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '8px solid #373737' }}></div>
                                    }
                                </div>
                            )
                        )
                    }
                </div>
            </div>

            {
                subcategory && (
                    <div className="flex absolute w-full h-12 bg-[#373737] justify-center items-center z-50">
                        <div onMouseOver={() => { handleMouseOver(activeCategory) }} onMouseLeave={handleMouseOut} className="flex overflow-x-scroll h-full w-11/12 flex-row justify-center items-center">
                            {
                                category
                                    .filter((item) => item.name === activeCategory)
                                    .map(
                                        (item, id) => (
                                            <div className="flex h-full w-full flex-row gap-x-10 justify-start text-nowrap items-center" key={id}>{
                                                item.subCategories.slice(-10).map((item, id) => (
                                                    <div key={id} className="flex text-sm cursor-pointer text-white hover:text-[#bad5f6]">{item.name}</div>
                                                ))
                                            }
                                            </div>
                                        )
                                    )
                            }
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default TopCategory