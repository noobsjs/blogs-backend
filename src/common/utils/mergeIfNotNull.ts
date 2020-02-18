type StringKeyObject = { [key: string]: any }

export default (target: StringKeyObject, source: StringKeyObject) => {

  for (const key in source) {
    if (source[key] !== undefined && source[key] !== null) {
      target[key] = source[key]
    }
  }
}