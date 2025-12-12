import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, RefreshCw, Database, Bell, Shield, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "System configuration has been updated successfully.",
    });
  };

  const handleRetrain = () => {
    toast({
      title: "Retraining Initiated",
      description: "Model is retraining on 'metal_synthetic_dataset.zip'. This may take a few minutes.",
    });
    // Simulate process
    setTimeout(() => {
      toast({
        title: "Training Complete",
        description: "New model version v2.1.0 is now active. Accuracy: 99.4%",
        variant: "default",
        className: "border-emerald-500 text-emerald-500",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-display font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Configure model parameters, thresholds, and notifications.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="models">Models & Training</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Global Configuration</CardTitle>
              <CardDescription>Base settings for the anomaly detection engine.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="station-id">Station ID</Label>
                  <Input id="station-id" defaultValue="STATION-ALPHA-01" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select defaultValue="us-east">
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
                      <SelectItem value="eu-west">EU West (Ireland)</SelectItem>
                      <SelectItem value="ap-south">AP South (Mumbai)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Maintenance Mode</Label>
                  <div className="text-sm text-muted-foreground">
                    Pause all alerts and data collection during maintenance.
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Active Models</CardTitle>
              <CardDescription>Manage the AI models used for detection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Visual Autoencoder v2.0</h4>
                    <p className="text-xs text-muted-foreground">Trained on: metal_synthetic_dataset.zip</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-500">Active</div>
                  <div className="text-xs text-muted-foreground">Last updated: Today</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <ActivityIcon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold">LSTM Sensor Forecast v1.4</h4>
                    <p className="text-xs text-muted-foreground">Input: Vibration, Temp, Pressure</p>
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-sm font-bold text-emerald-500">Active</div>
                   <div className="text-xs text-muted-foreground">Accuracy: 98.2%</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sensitivity Threshold (Anomaly Score)</Label>
                <div className="flex items-center gap-4">
                  <Input type="number" defaultValue="0.75" step="0.01" className="max-w-[100px]" />
                  <span className="text-xs text-muted-foreground">Lower values trigger alerts more easily (higher false positives).</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <h4 className="text-sm font-medium">Retrain on Uploaded Dataset</h4>
                     <p className="text-xs text-muted-foreground">Uses the latest uploaded dataset to refine the model weights.</p>
                  </div>
                  <Button variant="secondary" onClick={handleRetrain} className="gap-2">
                    <RefreshCw className="h-4 w-4" /> Retrain Model
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
           <Card className="glass">
            <CardHeader>
              <CardTitle>Alert Channels</CardTitle>
              <CardDescription>Where should critical anomalies be sent?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label>In-App Notifications</Label>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <Label>Email Alerts (Critical Only)</Label>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
