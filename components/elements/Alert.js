const Alert = ({ showAlert, label }) => {
    if (showAlert) {
        return (
            <div className="text-accent text-xs">
                <strong>Error! </strong>
                <span>{label} cannot be blank</span>
            </div>
        )
    } else {
        return <></>
    }
}

export default Alert
