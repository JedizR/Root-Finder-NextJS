"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRootFinder } from "@/lib/use-root-finder"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function ResultPanel() {
  const { results, convergenceData } = useRootFinder()

  if (!results) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Newton&apos;s Method</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No results yet</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bisection Method</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No results yet</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Convergence Graph</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <p className="text-muted-foreground">Run the calculation to see the convergence graph</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Newton&apos;s Method</CardTitle>
          </CardHeader>
          <CardContent>
            {results.newton.root !== null ? (
              <>
                <p>Root: {results.newton.root.toFixed(6)}</p>
                <p>Iterations: {results.newton.iterations}</p>
              </>
            ) : (
              <p>Failed to converge</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bisection Method</CardTitle>
          </CardHeader>
          <CardContent>
            {results.bisection.root !== null ? (
              <>
                <p>Root: {results.bisection.root.toFixed(6)}</p>
                <p>Iterations: {results.bisection.iterations}</p>
              </>
            ) : (
              <p>Failed to converge</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Convergence Graph</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={convergenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="iteration" />
              <YAxis scale="log" domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="newtonError"
                name="Newton's Method"
                stroke="hsl(var(--primary))"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="bisectionError"
                name="Bisection Method"
                stroke="hsl(var(--destructive))"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

