
// provide setAttribute multiple attributes
export function setMultipleAttr(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}

