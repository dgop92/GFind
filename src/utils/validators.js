export function isEmpty({ value, errorMessage = "El campo no puede estar vacío" }) {
  if (value === "") {
    throw Error(errorMessage);
  }
}

export function validateStringRange({
  value,
  minLenght = 0,
  maxLenght,
  errorMessage = "El campo no puede estar vacío",
}) {
  if (value.length < minLenght || value.length > maxLenght) {
    throw Error(errorMessage);
  }
}
