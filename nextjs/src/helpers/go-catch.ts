async function goCatch<T>(promise: Promise<T>): Promise<[T | null, null | Error]> {
  try {
    const result: Awaited<T> = await promise
    return [result, null]
  } catch (err) {
    return [null, err as Error]
  }
}


export default goCatch