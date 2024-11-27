export default function toCapitalize(text:string) {
  return text[0].charAt(0).toUpperCase() + text.substring(1).toLowerCase();
}