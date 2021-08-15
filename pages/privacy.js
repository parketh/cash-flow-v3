import DefaultLayout from "@Layouts/DefaultLayout"

const Privacy = () => {
    return (
        <DefaultLayout>
            <div className="bodyTitle">Privacy Policy</div>
            <div className="bodyTextSmall">
                This privacy policy ("Policy") will help you understand how Cash Flow ("Us", "We", "Our") uses and
                protects the data you provide to us when you visit and use https://cash-flow-app.vercel.app ("Website",
                "Service").
            </div>
            <div className="bodyTextSmall">
                We reserve the right to change this policy at any given time, of which you will be promptly updated. If
                you want to make sure that you are up to date with the latest changes, we advise you to frequently visit
                this page.
            </div>
            <div className="bodyTitle">What User Data We Collect</div>
            <div className="bodyTextSmall">
                <div>When you visit the website, we may collect the following data:</div>
                <ul className="list-disc ml-5 my-3">
                    <li>Your IP address.</li>
                    <li>Your contact information and email address. </li>
                    <li>Other information such as interests and preferences. </li>
                    <li>Data profile regarding your online behavior on our website.</li>
                </ul>
                <div>We are collecting your data for several reasons:</div>
                <ul className="list-disc ml-5 mt-3">
                    <li>To better understand your needs.</li>
                    <li>To improve our services and products.</li>
                    <li>
                        To send you promotional emails containing the information we think you will find interesting.
                    </li>
                    <li>To contact you to fill out surveys and participate in other types of market research.</li>
                    <li>To customize our website according to your online behavior and personal preferences.</li>
                </ul>
            </div>
            <div className="bodyTitle">Safeguarding and Securing the Data</div>
            <div className="bodyTextSmall">
                Cash Flow is committed to securing your data and keeping it confidential. Cash Flow has done all in its
                power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies
                and software, which help us safeguard all the information we collect online.
            </div>
            <div className="bodyTitle">Our Cookie Policy</div>
            <div className="bodyTextSmall">
                Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding
                your online behavior (analyze web traffic, web pages you spend the most time on, and websites you
                visit).
            </div>

            <div className="bodyTextSmall">
                The data we collect by using cookies is used to customize our website to your needs. After we use the
                data for statistical analysis, the data is completely removed from our systems. Please note that cookies
                don't allow us to gain control of your computer in any way. They are strictly used to monitor which
                pages you find useful and which you do not so that we can provide a better experience for you.
            </div>
            <div className="bodyTextSmall">
                If you want to disable cookies, you can do it by accessing the settings of your internet browser.
                (Provide links for cookie settings for major internet browsers).
            </div>
            <div className="bodyTitle">Links to Other Websites</div>
            <div className="bodyTextSmall">
                Our website contains links that lead to other websites. If you click on these links Cash Flow is not
                held responsible for your data and privacy protection. Visiting those websites is not governed by this
                privacy policy agreement. Make sure to read the privacy policy documentation of the website you go to
                from our website.
            </div>
            <div className="bodyTitle">Restricting the Collection of your Personal Data</div>
            <div className="bodyTextSmall">
                At some point, you might wish to restrict the use and collection of your personal data.
            </div>
            <div className="bodyTextSmall">
                You can achieve this by doing the following: When you are filling the forms on the website, make sure to
                check if there is a box which you can leave unchecked, if you don't want to disclose your personal
                information.{" "}
            </div>
            <div className="bodyTextSmall">
                If you have already agreed to share your information with us, feel free to contact us via email and we
                will be more than happy to change this for you. Cash Flow will not lease, sell or distribute your
                personal information to any third parties, unless we have your permission.
            </div>
            <div className="bodyTextSmall">
                We might do so if the law forces us. Your personal information will be used when we need to send you
                promotional materials if you agree to this privacy policy.
            </div>
            <div className="h-48"></div>
        </DefaultLayout>
    )
}

export default Privacy
