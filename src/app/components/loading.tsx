const Loading = () => {
    return (
        <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
            <div className="p-4 bg-gradient-to-tr animate-spin from-red-500 to-blue-500 via-purple-500 rounded-full">
                <div className="bg-white rounded-full">
                    <div className="w-18 h-18 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading;