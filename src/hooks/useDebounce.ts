import { useEffect, useState } from 'react'

// const useDebounce = <T>(value: T, delay: number = 500) => {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)

//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay])

//   return debouncedValue
// }

// eslint-disable-next-line @typescript-eslint/ban-types
// function useDebounce<T>(func: T, delay: number = 500): T {
//   const [debouncedFunc, setDebouncedFunc] = useState<T>(func)

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setDebouncedFunc(func)
//     }, delay)

//     return () => clearTimeout(timeoutId)
//   }, [func, delay])

//   return debouncedFunc
// }

type DebouncedFunction = (...args: any[]) => void

function useDebounce(fn: DebouncedFunction, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<any>(null)

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedValue !== null) {
        fn(debouncedValue) // Call the function with debounced value after the delay
      }
    }, delay)

    // Cleanup on component unmount or when debouncedValue changes
    return () => {
      clearTimeout(handler)
    }
  }, [debouncedValue, fn, delay])

  const updateValue = (value: any) => {
    setDebouncedValue(value) // Update the debounced value
  }

  return updateValue
}

export default useDebounce
