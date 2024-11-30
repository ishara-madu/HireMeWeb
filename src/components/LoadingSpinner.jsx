
// eslint-disable-next-line react/prop-types
const LoadingSpinner = ({val}) => {
    return (
        <div className="flex items-center justify-center">
            <div className={` w-16 h-16 border-t-2 border-purple-500 border-solid rounded-full animate-spin`} style={{height:val,width:val}}></div>
        </div>
    );
};

export default LoadingSpinner;
