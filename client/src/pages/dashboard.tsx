import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardStats, mockRecentAlerts, generateSensorData } from "@/lib/mockData";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, AlertTriangle, CheckCircle2, Eye, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadMockDataset } from "@/lib/mockData";
import factoryImage from "@assets/generated_images/industrial_factory_floor_schematic.png";

export default function Dashboard() {
  const sensorData = generateSensorData(20); // Small dataset for dashboard chart

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-1">Real-time monitoring of industrial assets and anomaly detection systems.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2" onClick={downloadMockDataset}>
             <Download className="h-4 w-4" />
             Download Dataset
           </Button>
           <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
             Generate Report
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inspections</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{mockDashboardStats.totalInspections.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="glass hover:border-destructive/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Defect Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-destructive">{mockDashboardStats.defectRate}%</div>
            <p className="text-xs text-muted-foreground">-0.4% improvement</p>
          </CardContent>
        </Card>
        
        <Card className="glass hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sensors</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{mockDashboardStats.activeSensors}</div>
            <p className="text-xs text-muted-foreground">All systems online</p>
          </CardContent>
        </Card>
        
        <Card className="glass hover:border-emerald-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-emerald-500">{mockDashboardStats.systemHealth}%</div>
            <p className="text-xs text-muted-foreground">Optimal performance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Anomaly Trends (Live)</CardTitle>
              <CardDescription>Real-time sensor vibration analysis over the last 20 cycles.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sensorData}>
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
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      domain={[40, 80]}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                      itemStyle={{ color: 'hsl(var(--primary))' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass overflow-hidden relative">
            <img src={factoryImage} alt="Factory Floor" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="relative z-10 p-6">
               <div className="flex items-center gap-2 mb-2">
                 <Info className="h-5 w-5 text-primary" />
                 <h3 className="text-lg font-bold font-display">Active Zones</h3>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-background/80 backdrop-blur-sm p-3 rounded border border-border">
                   <div className="text-xs text-muted-foreground uppercase">Assembly Line A</div>
                   <div className="text-emerald-500 font-bold">Normal</div>
                 </div>
                 <div className="bg-background/80 backdrop-blur-sm p-3 rounded border border-border">
                   <div className="text-xs text-muted-foreground uppercase">Paint Shop</div>
                   <div className="text-emerald-500 font-bold">Normal</div>
                 </div>
                 <div className="bg-background/80 backdrop-blur-sm p-3 rounded border border-border">
                   <div className="text-xs text-muted-foreground uppercase">Packaging</div>
                   <div className="text-yellow-500 font-bold">Warning</div>
                 </div>
                 <div className="bg-background/80 backdrop-blur-sm p-3 rounded border border-border">
                   <div className="text-xs text-muted-foreground uppercase">Logistics</div>
                   <div className="text-emerald-500 font-bold">Normal</div>
                 </div>
               </div>
            </div>
          </Card>
        </div>

        <Card className="col-span-3 glass">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest anomalies detected across all units.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-3 rounded-lg border border-border bg-background/50 hover:bg-accent/50 transition-colors">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-destructive' : 
                    alert.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{alert.type}</p>
                      <p className="text-xs font-mono text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
