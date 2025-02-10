"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRootFinder } from "@/lib/use-root-finder"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

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
          <CardContent className="h-[400px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{ iteration: 0, newtonError: 0, bisectionError: 0 }]}>
                <defs>
                  <linearGradient id="newtonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="bisectionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis 
                  dataKey="iteration" 
                  className="text-muted-foreground fill-muted-foreground text-xs"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  scale="log" 
                  domain={[0.0001, 1]}
                  className="text-muted-foreground fill-muted-foreground text-xs"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow)",
                    fontSize: "12px"
                  }}
                  labelStyle={{
                    color: "hsl(var(--foreground))",
                    fontWeight: "500",
                    marginBottom: "4px"
                  }}
                  itemStyle={{
                    padding: "2px 0"
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    fontSize: "12px",
                    paddingTop: "8px"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="newtonError"
                  name="Newton's Method"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  fill="url(#newtonGradient)"
                  animationDuration={300}
                />
                <Area
                  type="monotone"
                  dataKey="bisectionError"
                  name="Bisection Method"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  fill="url(#bisectionGradient)"
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
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
                <p className="">Root: {results.newton.root.toFixed(6)}</p>
                <p className="text-black/50">Iterations: {results.newton.iterations}</p>
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
                <p className="text-black/50">Iterations: {results.bisection.iterations}</p>
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
            <AreaChart data={convergenceData}>
              <defs>
                <linearGradient id="newtonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="bisectionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="iteration"
                className="text-muted-foreground fill-muted-foreground"
              />
              <YAxis 
                scale="log" 
                domain={["auto", "auto"]}
                className="text-muted-foreground fill-muted-foreground"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
                labelStyle={{
                  color: "hsl(var(--foreground))"
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="newtonError"
                name="Newton's Method"
                stroke="hsl(var(--success))"
                fill="url(#newtonGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="bisectionError"
                name="Bisection Method"
                stroke="hsl(var(--destructive))"
                fill="url(#bisectionGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}