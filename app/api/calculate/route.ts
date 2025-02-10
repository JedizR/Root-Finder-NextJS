import { NextResponse } from "next/server"

// Helper function to parse mathematical expressions
function parseExpression(expr: string): string {
  return expr
    // Handle constants first
    .replace(/π/g, 'Math.PI')
    .replace(/\be\b/g, 'Math.E') // \b ensures we match 'e' as a word boundary, not inside other words
    // Handle implicit multiplication with x
    .replace(/(\d)x/g, '$1*x')
    // Handle implicit multiplication with constants
    .replace(/(\d)π/g, '$1*Math.PI')
    .replace(/(\d)e/g, '$1*Math.E')
    .replace(/π(\d)/g, 'Math.PI*$1')
    .replace(/e(\d)/g, 'Math.E*$1')
    // Handle absolute value
    .replace(/\|([^|]+)\|/g, 'Math.abs($1)')
    // Convert exponents
    .replace(/\^/g, '**')
    // Handle sqrt
    .replace(/sqrt\((.*?)\)/g, 'Math.sqrt($1)')
    // Handle trig functions
    .replace(/sin\((.*?)\)/g, 'Math.sin($1)')
    .replace(/cos\((.*?)\)/g, 'Math.cos($1)')
    .replace(/tan\((.*?)\)/g, 'Math.tan($1)')
    // Handle log functions
    .replace(/ln\((.*?)\)/g, 'Math.log($1)')
    .replace(/log\((.*?)\)/g, 'Math.log10($1)')
}

// Helper function to evaluate the expression
function evaluateExpression(expr: string, x: number): number {
  try {
    const parsedExpr = parseExpression(expr)
    const safeExpr = parsedExpr.replace(/x/g, `(${x})`)
    return Function(`'use strict'; return (${safeExpr})`)()
  } catch (error) {
    console.error("Error evaluating expression:", error)
    throw new Error("Invalid mathematical expression")
  }
}

// Helper function to calculate the derivative
function evaluateDerivative(expr: string, x: number, h = 1e-8): number {
  const fx = evaluateExpression(expr, x)
  const fxh = evaluateExpression(expr, x + h)
  return (fxh - fx) / h
}

export async function POST(req: Request) {
  try {
    const { expression, start, end, epsilon } = await req.json()

    console.log("Received parameters:", { expression, start, end, epsilon })

    if (!expression || typeof start !== "number" || typeof end !== "number" || typeof epsilon !== "number") {
      return NextResponse.json({ error: "Invalid input parameters" }, { status: 400 })
    }

    const f = (x: number) => evaluateExpression(expression, x)
    const f_prime = (x: number) => evaluateDerivative(expression, x)

    // Newton's method
    let newtonRoot = start
    const newtonErrors = []
    let newtonIterations = 0
    const maxIterations = 100

    while (newtonIterations < maxIterations) {
      const fx = f(newtonRoot)
      const fpx = f_prime(newtonRoot)

      if (Math.abs(fpx) < epsilon) {
        break // Avoid division by zero
      }

      const nextX = newtonRoot - fx / fpx
      const error = Math.abs(nextX - newtonRoot)
      newtonErrors.push(error)

      if (error < epsilon) {
        newtonRoot = nextX
        break
      }

      newtonRoot = nextX
      newtonIterations++
    }

    console.log("Newton's method result:", { root: newtonRoot, iterations: newtonIterations })

    // Bisection method
    let a = start
    let b = end
    const bisectionErrors = []
    let bisectionIterations = 0

    let fa = f(a)
    let fb = f(b)

    if (fa * fb >= 0) {
      return NextResponse.json(
        { error: "Function must have opposite signs at interval endpoints for bisection method" },
        { status: 400 },
      )
    }

    while (bisectionIterations < maxIterations) {
      const c = (a + b) / 2
      const fc = f(c)

      const error = Math.abs(b - a)
      bisectionErrors.push(error)

      if (Math.abs(fc) < epsilon || error < epsilon) {
        a = c
        break
      }

      if (fa * fc < 0) {
        b = c
        fb = fc
      } else {
        a = c
        fa = fc
      }

      bisectionIterations++
    }

    const bisectionRoot = a
    console.log("Bisection method result:", { root: bisectionRoot, iterations: bisectionIterations })

    // Prepare convergence data
    const maxDataPoints = Math.max(newtonErrors.length, bisectionErrors.length)
    const convergenceData = Array.from({ length: maxDataPoints }, (_, i) => ({
      iteration: i + 1,
      newtonError: i < newtonErrors.length ? newtonErrors[i] : null,
      bisectionError: i < bisectionErrors.length ? bisectionErrors[i] : null,
    }))

    return NextResponse.json({
      results: {
        newton: {
          root: newtonRoot,
          iterations: newtonIterations,
        },
        bisection: {
          root: bisectionRoot,
          iterations: bisectionIterations,
        },
      },
      convergenceData,
    })
  } catch (error) {
    console.error("Unhandled error in calculation:", error)
    return NextResponse.json({ error: error.message || "Failed to calculate roots" }, { status: 500 })
  }
}