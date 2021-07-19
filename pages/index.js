import React, { useEffect, useRef } from 'react'

const Home = () => {
  const userGuideRef = useRef()
  const heroRef = useRef()

  function handleGetStartedClick() {
      userGuideRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  function handleBackToTopClick() {
      heroRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
      window.scrollTo(0, 0)
  }, [])
  

  return (
      <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-w-2 scrollbar-thumb-rounded-full">
          <div className="h-auto w-full justify-center">
              <div className="h-auto object-cover bg-no-repeat bg-right w-full justify-center flex mb-24" style={{backgroundImage: "url('images/logo-bg.png')", backgroundSize: "300px"}} ref={heroRef}>
                  <div className="w-768 px-5 py-5">
                      <div className="h-12"></div>
                      <div className="text-7xl font-semibold my-10 bg-opacity-0 leading-tight	">
                          <span className="text-theme">Automate</span>
                          <span className="text-theme-dark"> your financial modelling.</span>
                      </div>
                      <div className="bg-accent w-12 h-1 mb-8"></div>
                      <div className="text-2xl pr-3">Building a financial model can be tedious and time-consuming. Cash Flow is a tool to help you jump-start that process.</div>
                      <div onClick={handleGetStartedClick} className="flex items-center space-x-2 col-span-6 cursor-pointer mt-12 animate-bounce">
                          <img onClick={handleGetStartedClick} src="/images/down-arrow.png" alt="down-arrow" className="w-4" />
                          <div onClick={handleGetStartedClick}>Get started</div>
                      </div>
                  </div>
              </div>
                      
              <div className="h-auto w-full justify-center flex bg-gray-200 py-12" ref={userGuideRef}>
                  <div className="w-768 px-5 py-5">
                      <div className="text-4xl font-semibold text-theme mb-8">User Guide</div>
                      <div className="bg-accent w-12 h-1 mb-8"></div>
                      <div className="text-2xl font-semibold mb-8 pt-4">What is Cash Flow?</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">Cash Flow is a tool to help you quickly setup a discounted cash flow model by just configuring a few settings. If you have a Capital IQ subscription, Cash Flow will automatically import financial information into your model, and even calculate beta and debt ratios based on information from a set of your pre-selected comparable companies.</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">You can download and continue working on the model in Excel. You can amend the settings at any time, and of course overlay additional data and analysis as needed.</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">Before proceeding, a quick disclaimer: <strong>Cash Flow is not meant as a replacement for the analysis that goes into building a valuation model.</strong> The output of your model will, as always, depend on the robustness of your assumptions. </div>
                      <div className="italic text-lg mb-8 font-medium text-gray-500">“A good valuation is 75% art and 25% science."</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">You will need to continue to apply your own expertise and judgement in preparing financial forecasts, estimating an appropriate discount rate, amongst other assumptions.</div>
                      <div className="bg-accent w-12 h-1 mb-8"></div>
                      <div className="text-2xl font-semibold mb-8 pt-4">Instructions</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">Cash Flow is really simple to use.</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">
                          <span>First, head over to the</span>
                          <img src="/images/settings.png" className="w-4 mx-2 pb-1 inline" alt="settings"/>
                          <span>Configuration page. There, you'll find all of the settings you need to get started. Once you are done configuring your model, don't forget to hit <strong>Save</strong> so that you don't lose your work. You can always come back to the page to tweak these settings later, we'll store them for you in the meantime.</span>
                      </div>
                      <div className="text-lg mb-8 font-medium text-gray-500">If you are not sure what settings to use, or you are just trying out the tool, you can use use the Sample settings built into the page.</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">
                          <span>Once you're happy with the configurations, you can head over to the</span>
                          <img src="/images/download.png" className="mx-2 pb-1 inline w-4" alt="downloads" />
                          <span>Download page to download your model and continue working on it locally in Excel.</span>
                      </div>
                      <div className="bg-accent w-12 h-1 mb-8"></div>
                      <div className="text-2xl font-semibold mb-8 pt-4">Why I built Cash Flow</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">When I used to work as a financial analyst, I would spend way too much time on tedious tasks in Excel, either building models from scratch or auditing them for errors. This was time and energy taken away from focusing on what's most important: understanding companies and the drivers of their value.</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">Cash Flow is a proof of concept for an idea I've had over the last few years: that we can re-use the models we have built in the past and configure them in programmable ways, so we can get back to solving truly interesting problems in our work.</div>
                      <div className="text-lg mb-8 font-medium text-gray-500">
                          <span>I sincerely hope you enjoy using the tool. I would also appreciate if you share any feedback, including descriptions of any bugs or errors you notice, to my personal email at </span>
                          <span><a className="text-theme" href="mailto:yeungparkhay@gmail.com">yeungparkhay@gmail.com</a></span>.
                      </div>
                      <div className="text-lg mb-8 font-medium text-gray-500"> - Park 👊</div>
                      <div onClick={handleBackToTopClick} className="flex items-center space-x-2 col-span-6 cursor-pointer mt-12">
                          <img onClick={handleBackToTopClick} src="/images/up-arrow.png" alt="up-arrow" className="w-4" />
                          <div onClick={handleBackToTopClick}>Back to top</div>
                      </div>
                      {/* <div className="mt-32 flex justify-between text-center font-medium text-gray-500 border-t-1 border-gray-300 m-4 pt-4">
                          <div><a href="http://parkyeung.com">Website</a></div>
                          <div><a href="https://www.linkedin.com/in/park-yeung-cfa-75b31aa1/">LinkedIn</a></div>
                          <div><a href="https://github.com/yeungparkhay">GitHub</a></div>
                          <div><a href="https://twitter.com/park_yeung">Twitter</a></div>
                      </div> */}
                  </div>
              </div>
          </div>
      </div>
  )
}


export default Home