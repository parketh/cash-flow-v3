const DefaultLayout = (props) => {
    return (
        <div className="overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 select-none font-sans flex justify-center">
            <div className="h-auto w-full max-w-768 space-y-2 px-5 py-5">{props.children}</div>
        </div>
    )
}

export default DefaultLayout
