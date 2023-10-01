function PolyndromCheck(string){
  if (string.toLowerCase().replaceAll(' ', '') === string.toLowerCase().replaceAll(' ', '').reverse()){
    return true;
  }
  else {
    return false;
  }
}
function LengthCheck(string, length){
  if (string.length >= length){
    return true
  }
  else {return false;}
}
