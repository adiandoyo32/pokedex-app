import { useEffect, useState } from 'react'

/** Returns `value` once it has stopped changing for `delay` ms. */
function useDebouncedValue<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}

export default useDebouncedValue
