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
    const secondValue = history[1] ?? null;
    const thirdValue = history[2]?? null;
    const fourthValue = history[3]?? null;
    const fifthValue = history[4]?? null;
    const sixthValue = history[5]?? null;
    const seventhValue = history[6]?? null;
    const eighthValue = history[7]?? null;
    const ninthValue = history[8]?? null;
    const tenthValue = history[9]?? null;

    useEffect(() => {
        const val = async () => {
            await dispatch(fetchBasedOnSearchResult());
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: firstValue, key: 0 }));
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: secondValue, key: 1 }));
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: thirdValue, key: 2 }));
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: fourthValue, key: 3 }));
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: fifthValue, key: 4 }));
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: sixthValue, key: 5 }));
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: seventhValue, key: 6 }));
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: eighthValue, key: 7 }));
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: ninthValue, key: 8 }));
            await dispatch(filterLocation({ lat: profile?.[0]?.latitude, lng: profile?.[0]?.longitude, word: tenthValue, key: 9 }));
        }
        val();
    }, [profile])

    return (
        <div className="mb-5">
            <BasedOnRatings />
            {
                firstValue &&
                <BasedOnSearchResult val={firstValue} title={`Featured courses in `} numb={0} />
            }
            {
                secondValue &&
                <BasedOnSearchResult val={secondValue} title={`New and noteworthy in`} numb={1} />
            }
            {
                thirdValue &&
                <BasedOnSearchResult val={thirdValue} title={`Top courses in`} numb={2} />
            }
            {
                fourthValue &&
                <BasedOnSearchResult val={fourthValue} title={`Featured courses in `} numb={3} />
            }
            {
                fifthValue &&
                <BasedOnSearchResult val={fifthValue} title={`Because you searched`} numb={4} />
            }


        </div>
    )
}

export default HorizontalMenus