const DefaultLayout = (props) => {
    return (
        <div className="overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 select-none font-sans">
            <div className="h-auto w-full space-y-2 flex justify-center">
                <div className="w-screen max-w-768 px-5 py-5">{props.children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout
