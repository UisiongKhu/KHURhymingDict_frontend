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

export const getToneNameHanji = (tone: number) => {
    // For Formosan Taigi
    switch(tone){
        case 1:
            return "陰平";
        case 2:
            return "陰上";
        case 3:
            return "陰去";
        case 4:
            return "陰入";
        case 5:
            return "陽平";
        case 6:
            return "陽上";
        case 7:
            return "陽去";
        case 8:
            return "陽入";
        default:
            return "未知聲調";
    }
}