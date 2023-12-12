export default (num) => {
    const suffix = ["", "k", "m", "b", "t", "q", "s", "o"];
    var char = "";
    var slice = null;

    for(var i in suffix) {
      i=Number(i);
      const max = 1000**(i+1);
      const min = 1000**(i)
      if(num>=min&&num<max) {
        //a tenth
        if(num>=max/10) {
          slice=3
        }
        //a hundreth
        else if(num>=max/100) {
          slice=2
        }
        //a thousandth
        else {
          slice=1
        }

        char=suffix[i];
        break;
      } 
    }

    if(num<1000) num=num;
    else num=String(num).slice(0, slice)+"."+String(num).slice(slice, slice+1)

    return num+char;
  }
