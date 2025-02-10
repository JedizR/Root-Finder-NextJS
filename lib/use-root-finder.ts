"use client"

import { create } from "zustand"

interface Results {
  newton: {
    root: number | null
    iterations: number
  }
  bisection: {
    root: number | null
    iterations: number
  }
}

interface RootFinderState {
  results: Results | null
  convergenceData: Array<{
    iteration: number
    newtonError: number | null
    bisectionError: number | null
  }>
  isCalculating: boolean
  error: string | null
  calculateRoots: (expression: string, start: number, end: number, epsilon: number) => Promise<void>
  clearError: () => void
}

export const useRootFinder = create<RootFinderState>((set) => ({
  results: null,
  convergenceData: [],
  isCalculating: false,
  error: null,
  calculateRoots: async (expression, start, end, epsilon) => {
    set({ isCalculating: true, error: null })
    try {
      console.log("Sending request with:", { expression, start, end, epsilon })
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression,
          start,
          end,
          epsilon,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("API response not OK:", { status: response.status, data })
        throw new Error(data.error || `Calculation failed with status ${response.status}`)
      }

      console.log("Received data:", data)

      set({
        results: data.results,
        convergenceData: data.convergenceData,
        error: null,
      })
    } catch (error) {
      console.error("Error calculating roots:", error)
      set({
        error: error.message || "Failed to calculate roots. Please try again.",
        results: null,
        convergenceData: [],
      })
    } finally {
      set({ isCalculating: false })
    }
  },
  clearError: () => set({ error: null }),
}))

