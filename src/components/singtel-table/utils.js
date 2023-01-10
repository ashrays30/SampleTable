export const isNumeric = (str) => {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

export const getKeyIndex = (headers) => headers.filter((e) => e.key)

export const getSortLogic = (p1, p2, isDecend) => {
    let bool = 0;
    if (p1 < p2) {
        bool = isDecend ? -1 : 1
    } else if (p1 > p2) {
        bool = isDecend ? 1 : -1
    }
    return bool;
}

export const filterIsSelectedforRadio = (initData) => {
    const initalSelected = initData.find((d => d.isSelected && d.isSelected === true))
    initData.map(d => (
        d.isSelected = initalSelected && (d.tableIndex === initalSelected.tableIndex) ? true : false
    ))
}