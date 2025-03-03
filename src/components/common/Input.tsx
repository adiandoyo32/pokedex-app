import React from 'react'

interface Input {
  label: string
  id: string
  type?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Input> = ({
  label,
  id,
  type = 'text',
  value,
  onChange
}) => {
  return (
    <div className="relative w-full max-w-xs">
      <input
        type={type}
        id={id}
        className="peer block w-full appearance-none rounded-lg border bg-gray-50 px-2.5 pb-1.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor="small_filled"
        className="absolute start-2.5 top-3 z-10 origin-[0] -translate-y-3 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
      >
        {label}
      </label>
    </div>
  )
}

export default Input
