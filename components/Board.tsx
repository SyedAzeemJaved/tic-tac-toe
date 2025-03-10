'use client'

import { useState, useCallback, useEffect } from 'react'

import Square from './Square'

type Value = 'X' | 'O' | null

const randomGenerate = (): boolean => Math.round(Math.random()) === 1

const winningLogics = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export default function Board(): React.ReactElement {
  const [board, setBoard] = useState<Array<Value>>(Array(9).fill(null))
  const [isPlayerXTurn, setIsPlayerXTurn] = useState<boolean>(false)
  const [winningIdx, setWinningIdx] = useState<
    [number, number, number] | undefined
  >(undefined)

  const insertAtIndex = useCallback((value: Value, idx: number) => {
    setBoard((prev) => [...prev.slice(0, idx), value, ...prev.slice(idx + 1)])
  }, [])

  const handleClick = (idx: number) => {
    insertAtIndex(isPlayerXTurn ? 'X' : 'O', idx)
    setIsPlayerXTurn((prev) => !prev)
  }

  const handleReset = useCallback(() => {
    setBoard(Array(9).fill(null))
    setIsPlayerXTurn((prev) => !prev)
    setWinningIdx(undefined)
  }, [])

  useEffect(() => {
    if (winningIdx) return

    for (let i = 0; i < winningLogics.length; i++) {
      const [a, b, c] = winningLogics[i]

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningIdx([a, b, c])
      }
    }
  }, [board, winningIdx])

  useEffect(() => {
    setIsPlayerXTurn(randomGenerate())
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-y-hidden bg-zinc-800">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <p className="text-lg text-white lg:text-3xl">
          {isPlayerXTurn ? 'X' : 'O'}
        </p>
        <div className="grid min-w-72 grid-cols-3 gap-1">
          {Array(9)
            .fill(null)
            .map((_, idx) => (
              <Square
                key={idx}
                idx={idx}
                value={board[idx]}
                handleClick={handleClick}
                winningIdx={winningIdx}
              />
            ))}
        </div>
        <button
          className="cursor-pointer rounded-md bg-blue-300 px-6 py-2 text-lg text-blue-900 transition-opacity delay-50 duration-300 hover:opacity-75 lg:text-3xl"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
