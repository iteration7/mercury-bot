export default (num) => {
const suffix = ["", "k", "m", "b", "t", "q", "s", "o"];
    var char = "";
    var dec = false;
    var slice = null;

    for (var i in suffix) {
      i = Number(i);
      const max = 1000 ** (i + 1);
      const min = 1000 ** i;
      if (num >= min && num < max) {
        //a tenth
        if (num >= max / 10) {
          slice = 3;
          
        }
        //a hundreth
        else if (num >= max / 100) {
          slice = 2;
          
        }
        //a thousandth
        else {
          slice = 1;
          dec=true;
        }

        char = suffix[i];
        break;
      }
    }
    var fixedNum;
    
    if (num < 1000) {
      if(num > 0) fixedNum = num.toFixed(1);
      else fixedNum=num;
    }
    else fixedNum = String(num).slice(0, slice);
    if (dec && num>=1000) fixedNum += '.' + String(num).slice(slice, slice+1);
    
    return fixedNum + char;
};
