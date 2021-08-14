const ConfirmationIndicator = ({ showConfirm, handleShowConfirm }) => {
    if (showConfirm) {
        return (
            <div className="flex py-1.5">
                <img src="/images/check.png" onClick={handleShowConfirm} alt="check" width={20} height={20} />
            </div>
        )
    } else {
        return <></>
    }
}

export default ConfirmationIndicator
