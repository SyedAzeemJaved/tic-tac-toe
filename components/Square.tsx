'use client'

type Value = 'X' | 'O' | null

type Props = {
  idx: number
  value: Value
  handleClick: (idx: number) => void
  winningIdx: [number, number, number] | undefined
}

export default function Square({
  idx,
  value,
  handleClick,
  winningIdx,
}: Props): React.ReactElement {
  return (
    <button
      className={
        'relative size-24 cursor-pointer rounded-md border border-blue-300 text-5xl font-semibold text-white transition-colors delay-50 duration-300 hover:border-blue-400 hover:bg-blue-300 disabled:cursor-default disabled:border-blue-300 disabled:bg-gray-500 ' +
        `${winningIdx && winningIdx.includes(idx) ? 'disabled:border-green-300 disabled:bg-green-500' : null}`
      }
      disabled={!!value}
      onClick={() => handleClick(idx)}
    >
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {value}
      </span>
    </button>
  )
}
