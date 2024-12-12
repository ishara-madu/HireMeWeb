import { useDispatch, useSelector } from "react-redux";
import BasedOnRatings from "./basedOnRatings";
import BasedOnSearchResult from "./BasedOnSearchResult";
import { useEffect } from "react";
import { fetchBasedOnSearchResult } from "../../features/basedOnSearchResult/basedOnSearchResultThunk";
import { fetchProfile } from '../../features/profile/profileThunk';
import { filterLocation } from "../../features/basedOnSearchResult/basedOnSearchResultSlice";

function HorizontalMenus() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.data);
    useEffect(() => {
        const val = async () => {
            await dispatch(fetchProfile());
        }
        val();
    }, [dispatch]);

    const history = JSON.parse(sessionStorage.getItem("history")) || [];
    const firstValue = history[0] ?? null;

    useEffect(() => {
        const val = async () => {
            await dispatch(fetchBasedOnSearchResult());
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude,word:firstValue,key:0 }));
        }
        val();
    }, [profile])

    return (
        <div className="mb-5">
            <BasedOnRatings />
            {
                firstValue &&
                <BasedOnSearchResult val={firstValue} title={`Featured courses in `} key={0}/>
            }
            
        </div>
    )
}

export default HorizontalMenus