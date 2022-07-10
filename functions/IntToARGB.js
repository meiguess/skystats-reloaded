module.exports = (num) => {
  num >>>= 0;
  var b = num & 0xFF, g = (num & 0xFF00) >>> 8, r = (num & 0xFF0000) >>> 16, a = ( (num & 0xFF000000) >>> 24 ) / 255 ;
  return {
    r: r,
    g: g,
    b: b,
  };
}