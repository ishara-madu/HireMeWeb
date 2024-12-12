import BasedOnRatings from "./basedOnRatings";
import BasedOnSearchResult from "./BasedOnSearchResult";

function HorizontalMenus() {

    const history = JSON.parse(sessionStorage.getItem("history")) || [];
    const firstValue = history[0] ?? null;
    const secondValue = history[1] ?? null;

    return (
        <div className="mb-5">
            <BasedOnRatings />
            {
                firstValue &&
                <BasedOnSearchResult val={firstValue} title={`Featured courses in `} />
            }
        </div>
    )
}

export default HorizontalMenus