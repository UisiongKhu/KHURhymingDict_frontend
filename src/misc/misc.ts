export const to10KCommaString = (num:number)=>{
    if (typeof num !== 'number' || isNaN(num)) {
        return "無效的數字"; // 處理非數字輸入
    }

    const numStr = String(Math.floor(Math.abs(num))); // 取絕對值的整數部分轉為字串
    let result = "";
    const len = numStr.length;

    for (let i = 0; i < len; i++) {
        const char = numStr[len - 1 - i]; // 從個位數開始往前處理
        result = char + result; // 將字元加到結果的前面

        if ((i + 1) % 4 === 0 && (i + 1) !== len) {
        result = "," + result;
    }
  }

  if (num < 0) {
    result = "-" + result;
  }

  return result;
};

export const isHanji = (str : string) => {
    const regex =  /[\u4e00-\u9fa5\uF900-\uFAFF\u{20000}-\u{2A6DF}]/u;
    return regex.test(str);
};

export const getLomajiArr = (str : string) => {
    const lowercasedStr = str.toLowerCase();
    const cleanedStr = lowercasedStr.replace(/[-.,;?!–—]/g, ' ');
    const resultArr = cleanedStr.split(/\s+/).filter(word => word.length > 0);

    return resultArr;
};

export const getSyllableAmount = (str : string) => {
    const lowercasedStr = str.toLowerCase();
    const cleanedStr = lowercasedStr.replace(/[-.,;?!–—]/g, ' ');
    const resultArr = cleanedStr.split(/\s+/).filter(word => word.length > 0);

    return resultArr.length;
};