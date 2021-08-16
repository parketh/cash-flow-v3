import React from "react"
import Link from "next/link"
import Image from "next/image"

import DefaultLayout from "@Layouts/DefaultLayout"

const Docs = () => {
    return (
        <DefaultLayout>
            <div className="bg-gray-100 rounded-lg p-5 mb-12">
                <div className="text-sm font-semibold text-gray-800m mb-2">Your selection:</div>
                <Link href="/docs" passHref>
                    <div className="h-18 bg-blue-50 flex items-center justify-center text-center shadow hover:bg-blue-100 cursor-pointer">
                        <span className="text-lg p-3 font-medium text-theme">😎 I'm just auditing the tool</span>
                    </div>
                </Link>
            </div>
            <div className="bg-gray-50 p-5">
                <div className="text-xl font-semibold mb-6 pt-4">1 - Getting Started</div>
                <div className="bodyTextSmall">
                    Cash Flow is not just an automated valuation tool, it is also a training tool to help you learn to
                    value companies and build robust financial models.
                </div>
                <div className="bodyTextSmall">
                    As you're new to valuation and financial modelling, take the valuation crash course first before you
                    get stuck in. Otherwise, continue by reading the documentation below.
                </div>
                <div className="text-xl font-semibold mb-6 pt-4">2 - Layout of the web app</div>
                <div className="bodyTextSmall">
                    Let's first run through the layout of this web app so that you know your way around. There are four
                    main pages, all of which are accessible from the menubar at the top of the page:
                </div>
                <div className="bodyTextSmall ml-4">
                    <Image height={16} width={16} src="/images/docs.png" alt="docs" />
                    <span className="text-theme"> Documentation</span>
                    <span>
                        : the page you're on right now—includes instructions on how to use the Cash Flow app, based on
                        your level of experience.
                    </span>
                </div>
                <div className="bodyTextSmall ml-4">
                    <Image height={16} width={16} src="/images/course.png" alt="course" />
                    <span className="text-theme"> Course</span>
                    <span>
                        : the valuation crash course we have designed from scratch to allow anyone to start valuing
                        companies and building financial models. You don't need any prior knowledge of finance to take
                        this course. It's also a great refresher of the fundamental concepts that even experienced
                        analysts often get wrong.
                    </span>
                </div>
                <div className="bodyTextSmall ml-4">
                    <Image height={16} width={16} src="/images/config.png" alt="config" />
                    <span className="text-theme"> Configuration</span>
                    <span>
                        : the control panel for your financial model—this is where you'll configure all of your settings
                        and model assumptions. You can also save your work and pick it up later.
                    </span>
                </div>
                <div className="bodyTextSmall ml-4">
                    <Image height={16} width={16} src="/images/download.png" alt="config" />
                    <span className="text-theme"> Download</span>
                    <span>
                        : the page to download your model once it is configured. You can also find a feedback form on
                        this page in case you have any comments or would like to report a bug.
                    </span>
                </div>
                <div className="bodyTextSmall">
                    <span>
                        You can also return to the <span className="text-theme">Home page</span> by clicking the{" "}
                    </span>
                    <Image height={16} width={16} src="/images/logo.png" alt="logo" />
                    <span> icon at the top left hand corner of your screen at any time.</span>
                </div>
                <div className="bodyTextSmall">Have a flick through all of the pages now!</div>
                <div className="text-xl font-semibold mb-6 pt-4">3 - Learn</div>
                <div className="bodyTextSmall">It's time to start learning.</div>
                <div className="bodyTextSmall">
                    <span>Head to the </span>
                    <Link href="/course" passHref>
                        <span className="textLink">Course page</span>
                    </Link>{" "}
                    and follow along. By the end of the course, you will have learned all of the valuation concepts you
                    need to start using Cash Flow to build financial models.
                </div>
                <div className="bodyTextSmall">
                    Once you are done, return to this page to learn how to start creating your own financial models.
                </div>
                <div className="text-xl font-semibold mb-6 pt-4">4 - Building your first financial model</div>
                <div className="bodyTextSmall">
                    Building your first financial model with Cash Flow is as easy as a few clicks. First, head over the
                    the Configuration page and specify your model inputs and assumptions. The form is broken up into
                    five sections, each of which deal with a specific part of the valuation model.
                </div>
                <div className="bodyTextSmall">
                    If you're not sure how to configure a particular setting, please refer to this page from the crash
                    course. If that doesn't answer your question, please drop me a message via the feedback form.
                </div>
                <div className="bodyTextSmall">
                    A couple of important points. The settings you've entered into the model won't be saved unless you
                    hit the Save button at the bottom of the page. Morever, you won't be allowed to save the form unless
                    you have correctly filled out each part.
                </div>
                <div className="bodyTextSmall">
                    If you've filled out the form correctly, you should see a confirmation when hitting Save, like so.
                </div>
                <div className="ml-4 w-60 h-10 rounded bg-green-700 font-bold text-white items-center flex mb-8">
                    <div className="text-center w-full">Success!</div>
                </div>
                <div className="bodyTextSmall">
                    If you've filled out the form incorrectly, you should see an error notification as follows.
                </div>
                <div className="ml-4 w-60 h-10 rounded bg-accent-dark font-bold text-white items-center flex mb-8">
                    <div className="text-center w-full">Missing fields</div>
                </div>
                <div className="bodyTextSmall">
                    To resolve the error, go back through the form and fix any fields you have filled out incorrectly,
                    which should be highlighted as shown below.
                </div>
                <div className="ml-4 font-bold text-xs mb-1">Company Name</div>
                <input type="text" className="ml-4 inputField w-60 border-1 border-accent" disabled />
                <div className="ml-4 text-xs text-accent">Company Name cannot be blank!</div>
                <div className="bodyTextSmall mt-8">
                    If you're not yet sure what settings you would like to use, or you don't have a Capital IQ
                    subscription, you can use the Sample settings by clicking the button at the bottom of the page.
                    Don't forget to hit save after you do so, otherwise the settings won't be put into use.
                </div>
                <div className="bodyTextSmall mt-8">
                    If you would like to start over at any point, you can also use the Clear settings button at the
                    bottom of the page.
                </div>
                <div className="text-xl font-semibold mb-6 pt-4">5 - Downloading your model</div>
                <div className="bodyTextSmall">
                    Once your settings are saved, you can head over to the Download page to download your financial
                    model. When you first open the Excel file, you may need to refresh all formulae by hitting the F9
                    key.
                </div>
                <div className="bodyTextSmall">
                    You should now have a brand new valuation model created based on your chosen settings. However,
                    you're not done! There are a few more things you need to complete in Excel in order to finish off
                    your model. Before getting into that, let's first understand the structure of the model.
                </div>
                <div className="text-xl font-semibold mb-6 pt-4">6 - Structure of your model</div>
                <div className="bodyTextSmall">
                    The model is broken up into three parts, based on the principle of the seperation of concerns. These
                    are denoted with dividers coloured in blue.
                </div>
                <div className="bodyTextSmall ml-4">
                    <span className="text-theme">Data</span>: this section contains all of your raw input data,
                    including financial and operational information about the company you are valuing, and other market
                    information. Everything in the input sheets should be hard-coded—you should never perform any
                    calculations in these sheets.
                    <div className="mt-4">In this section, you will find three sheets:</div>
                    <div className="mt-4 ml-4">
                        <span className="text-theme">IS</span>, which contains information from the subject company's
                        income statements
                    </div>
                    <div className="mt-4 ml-4">
                        <span className="text-theme">BS</span>, which contains information from the subject company's
                        balance sheet, and
                    </div>
                    <div className="mt-4 ml-4">
                        <span className="text-theme">CFS</span>, which contains information from the subject company's
                        cash flow statement.
                    </div>
                </div>
                <div className="bodyTextSmall ml-4">
                    <span className="text-theme">Analysis</span>: sheets containing all of your analysis and
                    calculations. These calculations should be performed based on data from your Input sheets. The
                    principle of seperation of concerns works both ways. You should try to minimise the amount of raw
                    input data stored in these sheets.
                    <div className="mt-4">In this section, you will find four sheets:</div>
                    <div className="mt-4 ml-4">
                        <span className="text-theme">Discount rate</span>, which contains a bottom-up calculation of the
                        discount rate
                    </div>
                    <div className="mt-4 ml-4">
                        <span className="text-theme">Beta</span>, which contains an estimate of the company's beta based
                        on information from your selected comparable companies
                    </div>
                    <div className="mt-4 ml-4">
                        <span className="text-theme">Comps</span>, which contains information about your selected
                        comparable companies, and
                    </div>
                    <div className="mt-4 ml-4">
                        <span className="text-theme">Forecasts</span>, which contains your financial forecasts for the
                        company.
                    </div>
                </div>
                <div className="bodyTextSmall ml-4">
                    <span className="text-theme">Output</span>: the sheet that brings together all of the work in your
                    model and sets out your valuation conclusions. In our case, this is where the DCF is constructed.
                </div>
                <div className="bodyTextSmall">
                    You will also find an <span className="text-theme">Assumptions</span> sheet upfront containing all
                    of your configured settings. These assumptions can be changed at any time—the model will
                    automatically update based on your new settings.
                </div>
                <div className="bodyTextSmall">
                    One last thing to note—it is important not to confuse input data with assumptions. Input data
                    contains factual information about your company, whereas assumptions are often subjective
                    conclusions arrived at based on your judgement.
                </div>

                <div className="text-xl font-semibold mb-6 pt-4">7 - Finishing your model in Excel</div>
                <div className="bodyTextSmall">
                    As mentioned, there are a few additional inputs you need to configure in Excel. These are in the
                    Beta tab, as conveniently highlighted in yellow.
                </div>
                <div className="bodyTextSmall">
                    <div className="mt-4 ml-4">
                        1. Tax rates: Capital IQ does not currently provide the corporate tax rates for companies. You
                        will have to manually insert these yourself. You can refer to the{" "}
                        <a
                            className="text-theme"
                            href="https://home.kpmg/xx/en/home/services/tax/tax-tools-and-resources/tax-rates-online/corporate-tax-rates-table.html"
                        >
                            KPMG corporate tax tables
                        </a>{" "}
                        for more information.{" "}
                    </div>
                    <div className="mt-4 ml-4">
                        2. Beta: the model calculates beta based on two-year weekly market returns. Other types of beta
                        calculations are not currently supported, however if you are particularly saavy in Excel it is
                        relatively simple to configure it to use other frequencies.
                    </div>
                </div>
                <div className="bodyTextSmall">You should now have a working financial model! 🙌</div>

                <div className="text-xl font-semibold mb-6 pt-4">8 - Supported devices</div>
                <div className="bodyTextSmall">
                    Cash Flow runs as a web application and is designed to be used across both Mac and Windows devices.
                    For best results, please run Cash Flow on Google Chrome.
                </div>

                <div className="bodyTextSmall">
                    You can also run the app from a mobile device (both iOS and Android), but this has not been
                    extensively tested and may yield unpredictable results.
                </div>
                <div className="bodyTextSmall">
                    The Excel model can only be used on Windows, as the Capital IQ plugin is currently not supported on
                    Mac. However, you can continue to use the model as a template and enter the inputs manually if you
                    are working on a Mac device.
                </div>
            </div>
            <div className="h-24"></div>
        </DefaultLayout>
    )
}

export default Docs
