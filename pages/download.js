// Import UI components
import DownloadSection from "@Sections/DownloadSection"
import FeedbackFormSection from "@Sections/FeedbackFormSection"
import DefaultLayout from "@Layouts/DefaultLayout"

const Download = ({ formId }) => {
    return (
        <DefaultLayout>
            <DownloadSection formId={formId} />
            <FeedbackFormSection />
            <div className="h-24"></div>
        </DefaultLayout>
    )
}

export default Download
