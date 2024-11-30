import { CiBookmarkCheck } from "react-icons/ci"

function Keypoints() {
    const whatYouLearn = [
        "Create beautiful spreadsheets with amazing formatting tricks",
        "Connect multiple Google Sheets together using a single formula",
        "Learn to build incredible data visualizations using charts",
        "Learn formulas that work in both Google Sheets & Excel!",
        "Learn to manipulate text in formulas",
        "Analyze data sets with ease using complex functions & formulas",
        "Feel completely comfortable in a spreadsheet environment",
    ];
    return (
        <div className='flex w-full h-auto bg-[#ebebeb] py-8 justify-center items-center'>
            <div className="flex w-10/12 h-auto">
                <div className="flex w-7/12 gap-y-3 border flex-col border-[#959494] p-5 rounded-sm">
                    <div className="flex text-xl font-bold mb-3">What you wll learn</div>
                    <div className="grid grid-cols-2 gap-4">
                        {
                            whatYouLearn.map(val =>
                                <div key={val} className="flex text-sm gap-x-1">
                                    <CiBookmarkCheck size={20} />
                                    {val}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Keypoints