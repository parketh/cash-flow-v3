// Import UI components
import DownloadSection from "@Sections/DownloadSection"
import FeedbackFormSection from "@Sections/FeedbackFormSection"
import DefaultLayout from "@Layouts/DefaultLayout"

const Download = () => {
    const allowDL = true // TODO - rework temporary controller

    return (
        <DefaultLayout>
            <DownloadSection allowDL={allowDL} />
            <FeedbackFormSection />
        </DefaultLayout>
    )
}

export default Download
