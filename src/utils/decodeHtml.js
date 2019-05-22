export default function(str) {
  if (typeof str === 'string') {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }
  return null;
}
