const letterToNum = (letter) => {
    return Math.max(letter.split("").reduce((r, a) => r * 26 + parseInt(a, 36) - 9, 0) - 1, 0)
}

export default letterToNum
