import SectionHeader from "@Elements/SectionHeader"
import Footnote from "@Elements/Footnote"

import AddComparables from "@Modules/AddComparables"
import ComparablesList from "@Modules/ComparablesList"

const CompsFormSection = ({ responses, setResponses }) => {
    return (
        <>
            {<SectionHeader title="VALUATION ASSUMPTIONS" subtitle="Comparable companies" />}
            <div className="sectionHeader">
                <Footnote text="Note: These comparable companies are used to estimate the beta of the subject company." />
                <div className="divide-y-2">
                    <AddComparables responses={responses} setResponses={setResponses} />
                    <ComparablesList responses={responses} setResponses={setResponses} />
                </div>
            </div>
        </>
    )
}

export default CompsFormSection
