function LengthCheck(string , length) {
  if (string.length >= length){
    return true;
  }
  else {
    return false;
  }
}

function stringPolyndrom(string){
  string.replaceAll('', '');
  string.ToLowerCase();
  if (string === string.reverse()){
    return true;
  }
  else {return false;
  }
}
