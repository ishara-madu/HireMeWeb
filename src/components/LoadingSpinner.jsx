
// eslint-disable-next-line react/prop-types
const LoadingSpinner = ({ val }) => {
    return (
        <div className="flex items-center justify-center">
                <div className="rounded-full h-20 w-20 bg-green-500 animate-ping" style={{ height: val, width: val }}></div>
        </div>
    );
};

export default LoadingSpinner;
