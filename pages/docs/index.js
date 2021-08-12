import React from "react"
import Link from "next/link"

const Docs = () => {
    return (
        <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-w-2 scrollbar-thumb-rounded-full select-none font-sans">
            <div className="h-auto w-full justify-center flex">
                <div className="w-768 px-5 py-5">
                    <div className="bodyTextSmall">
                        To get started, please select the option that best applies to you.
                    </div>
                    <div className="grid-rows-3 bg-gray-100 rounded-lg p-5 space-y-5">
                        <Link href="/docs/starter" passHref>
                            <div className="h-18 bg-green-50 flex items-center justify-center text-center shadow hover:bg-green-100 cursor-pointer">
                                <span className="text-lg p-3 font-medium text-green-700">
                                    🍃 I'm new to valuation and financial modelling
                                </span>
                            </div>
                        </Link>{" "}
                        <Link href="/docs/refresher" passHref>
                            <div className="h-18 bg-yellow-50 flex items-center justify-center text-center shadow hover:bg-yellow-100 cursor-pointer">
                                <span className="text-lg p-3 font-medium text-yellow-700">
                                    ✏️ I have some experience with financial modelling but would like a refresher
                                </span>
                            </div>
                        </Link>
                        <Link href="/docs/expert" passHref>
                            <div className="h-18 bg-red-50 flex items-center justify-center text-center shadow hover:bg-red-100 cursor-pointer">
                                <span className="text-lg p-3 font-medium text-red-700">
                                    💪 I'm an experienced financial analyst
                                </span>
                            </div>
                        </Link>
                        <Link href="/docs/audit" passHref>
                            <div className="h-18 bg-blue-50 flex items-center justify-center text-center shadow hover:bg-blue-100 cursor-pointer">
                                <span className="text-lg p-3 font-medium text-theme">
                                    😎 I'm just auditing the tool
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Docs
