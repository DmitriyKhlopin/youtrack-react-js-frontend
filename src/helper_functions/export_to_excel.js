/*
export static s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf
}*/

import * as XLSX from "xlsx";

export function Workbook() {
    if (!(this instanceof Workbook))
        return new Workbook();
    this.SheetNames = [];
    this.Sheets = {}
}

export const exportToExcel = (data, fileName, pageName) => {
    const wb = new Workbook();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, pageName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};
