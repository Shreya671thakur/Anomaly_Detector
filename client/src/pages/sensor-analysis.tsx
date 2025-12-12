import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Download } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { generateSensorData, SensorDataPoint } from "@/lib/mockData";
import { downloadMockDataset } from "@/lib/mockData";

export default function SensorAnalysis() {
  const [data, setData] = useState<SensorDataPoint[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Initial data
    setData(generateSensorData(100));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setData(prev => {
          const nextData = [...prev.slice(1)];
          const lastTime = new Date(`2000-01-01 ${prev[prev.length - 1].time}`);
          lastTime.setSeconds(lastTime.getSeconds() + 1);
          
          const time = lastTime.toLocaleTimeString('en-US', { hour12: false });
          let value = Math.sin(Date.now() / 1000) * 10 + 50 + (Math.random() - 0.5) * 5;
          
          // Random anomaly injection
          const isAnomaly = Math.random() > 0.95;
          if (isAnomaly) value += 25;

          nextData.push({
            time,
            value,
            isAnomaly,
            threshold: 65
          });
          return nextData;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Sensor Telemetry</h2>
          <p className="text-muted-foreground">LSTM-based time-series forecasting and anomaly detection.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadMockDataset} className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button 
             variant={isPlaying ? "destructive" : "default"} 
             onClick={() => setIsPlaying(!isPlaying)}
             className="gap-2 w-32"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Stop Live" : "Start Live"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="glass border-primary/20">
          <CardHeader>
             <div className="flex items-center justify-between">
               <div className="space-y-1">
                 <CardTitle className="flex items-center gap-2">
                   Live Vibration Analysis (Hz)
                   {isPlaying && <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>}
                 </CardTitle>
                 <CardDescription>
                   Detecting anomalies in motor vibration frequency. 
                   <span className="text-primary block mt-1">
                     • Normal Range: 45-65 Hz <br/>
                     • Threshold: &gt;65 Hz (Indicates potential bearing failure)
                   </span>
                 </CardDescription>
               </div>
               {isPlaying && (
                 <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/50 rounded-full text-emerald-500 text-xs font-bold animate-pulse">
                   MONITORING ACTIVE
                 </div>
               )}
             </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    interval={10}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[20, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                  />
                  <ReferenceLine y={65} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label={{ position: 'right', value: 'Threshold', fill: 'hsl(var(--destructive))', fontSize: 12 }} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass">
             <CardHeader>
               <CardTitle className="text-sm">Current Value</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-3xl font-mono font-bold">{data[data.length-1]?.value.toFixed(2)} <span className="text-sm text-muted-foreground font-sans font-normal">Hz</span></div>
             </CardContent>
          </Card>
          
          <Card className="glass">
             <CardHeader>
               <CardTitle className="text-sm">Peak (Last 100s)</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-3xl font-mono font-bold text-destructive">
                 {Math.max(...data.map(d => d.value)).toFixed(2)} <span className="text-sm text-muted-foreground font-sans font-normal">Hz</span>
               </div>
             </CardContent>
          </Card>

          <Card className="glass">
             <CardHeader>
               <CardTitle className="text-sm">Model Confidence</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-3xl font-mono font-bold text-emerald-500">99.2%</div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
