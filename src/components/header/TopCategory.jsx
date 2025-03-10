import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryData } from "../../features/category/categoryThunk";
import { useNavigate } from "react-router-dom";
import { fetchProfile, updateProfile } from "../../features/profile/profileThunk";


function TopCategory() {
    const navigate = useNavigate()
    const [subcategory, setSubCategory] = useState(false);
    const [activeCategory, setActiveCategory] = useState(''); // Track the active category

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.items);

    const profile = useSelector((state) => state.profile.data);


    useEffect(() => {
        dispatch(categoryData());
        dispatch(fetchProfile());
    }, [dispatch]);

    const parts = (text, category) => {
        const parts = text.split(",");
        return category ? parts[0].trim() : parts[1].trim();

    }

    const uniqueCategory = [];
    const seenNames = new Set();
    category.forEach((user) => {
        if (!seenNames.has(parts(user.category, true))) {
            seenNames.add(parts(user.category, true));
            uniqueCategory.push(user);
        }
    });
    const lastCategory = uniqueCategory.slice(-20);

    const handleMouseOver = (name) => {
        setSubCategory(true);
        setActiveCategory(name);
    };
    const handleMouseOut = () => {
        setSubCategory(false);
        setActiveCategory('');
    };

    const handleSearch = async (val) => {
        if (val.trim()) {
            navigate(`/search?query=${encodeURIComponent(val)}`);
        }
        const oldvalues = profile?.[0]?.searchHistory?.history || '';
        const updatedValues = oldvalues.includes(val)
            ? oldvalues
            : [...(oldvalues.length >= 10 ? oldvalues.slice(1) : oldvalues), val];
        await dispatch(updateProfile(
            {
                searchHistory: {
                    history: updatedValues
                }
            }
        ));
        await dispatch(fetchProfile());
    };
    return (
        <div className="h-auto ">
            <div className="flex w-full h-12 bg-[#ebebeb] justify-center items-center shadow-lg shadow-[#bcbcbc]">
                <div className="flex h-full w-11/12 flex-row justify-start overflow-x-scroll text-nowrap items-center">
                    {
                        lastCategory.map(
                            (item, id) => (
                                <div key={id} onMouseOver={() => handleMouseOver(parts(item.category, true))} onMouseOut={() => handleMouseOut()} className="flex flex-col text-sm h-full items-center px-5 cursor-pointer justify-center relative">{parts(item.category, true)}
                                    {(subcategory && (activeCategory == parts(item.category, true))) &&
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
                        <div onMouseOver={() => { handleMouseOver(activeCategory) }} onMouseLeave={handleMouseOut} className="flex overflow-x-scroll h-full w-11/12 flex-row justify-start text-nowrap gap-x-10 items-center">
                            {
                                category
                                    .filter((item) => parts(item.category, true) == activeCategory)
                                    .slice(-20)
                                    .map(
                                        (item, id) => (
                                            <div key={id} onClick={() => { handleSearch(item.category) }} className="flex text-sm cursor-pointer text-white hover:text-[#bad5f6]">{parts(item.category, false)}</div>
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