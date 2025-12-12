import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export default function ImageAnalysis() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number; isAnomaly: boolean } | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
      setResult(null);
      setProgress(0);
    }
  };

  const runAnalysis = () => {
    if (!image) return;
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis steps
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      setIsAnalyzing(false);
      // Random result
      const isAnomaly = Math.random() > 0.6;
      const score = isAnomaly ? Math.random() * 0.5 + 0.5 : Math.random() * 0.1;
      setResult({ score, isAnomaly });
      
      toast({
        title: isAnomaly ? "Defect Detected" : "No Defects Found",
        description: isAnomaly ? `Anomaly score: ${score.toFixed(4)}` : "Image passed quality inspection.",
        variant: isAnomaly ? "destructive" : "default",
      });
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-display font-bold tracking-tight">Visual Inspection</h2>
        <p className="text-muted-foreground">Upload industrial component images for autoencoder-based anomaly detection.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="glass h-full">
          <CardHeader>
            <CardTitle>Input Image</CardTitle>
            <CardDescription>Upload a .png or .jpg file of the manufactured part.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-6 min-h-[400px]">
            {image ? (
              <div className="relative w-full aspect-square max-w-sm rounded-lg overflow-hidden border border-border group">
                <img src={image} alt="Upload" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" onClick={() => setImage(null)}>Change Image</Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 flex flex-col items-center text-center hover:border-primary/50 transition-colors w-full max-w-sm bg-muted/5">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Drag and drop or click to upload</h3>
                <p className="text-sm text-muted-foreground mb-6">Supports PNG, JPG (Max 10MB)</p>
                <div className="relative">
                  <Button>Select File</Button>
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}

            {image && !result && !isAnalyzing && (
              <Button onClick={runAnalysis} size="lg" className="w-full max-w-xs gap-2">
                <FileUp className="h-4 w-4" />
                Analyze Image
              </Button>
            )}

            {isAnalyzing && (
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Running Autoencoder...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="glass h-full">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>Reconstruction error and heatmap visualization.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
            {!result ? (
              <div className="text-center text-muted-foreground">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full border border-dashed border-muted-foreground/25 flex items-center justify-center">
                  <Loader2 className={`h-6 w-6 ${isAnalyzing ? 'animate-spin' : ''}`} />
                </div>
                <p>{isAnalyzing ? "Processing..." : "Waiting for analysis..."}</p>
              </div>
            ) : (
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div className="flex items-center gap-2">
                      {result.isAnomaly ? (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      )}
                      <span className={`text-xl font-bold font-display ${result.isAnomaly ? 'text-destructive' : 'text-emerald-500'}`}>
                        {result.isAnomaly ? 'DEFECT DETECTED' : 'NORMAL'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Anomaly Score</p>
                    <p className="text-2xl font-mono font-bold tracking-tight">{result.score.toFixed(5)}</p>
                  </div>
                </div>

                <div className="relative aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden border border-border">
                  {/* Base Image */}
                  <img src={image!} alt="Original" className="absolute inset-0 w-full h-full object-cover" />
                  
                  {/* Heatmap Overlay */}
                  <div className="absolute inset-0 mix-blend-color-dodge opacity-70"
                       style={{
                         background: result.isAnomaly 
                           ? `radial-gradient(circle at 40% 60%, rgba(255, 0, 0, 0.8) 0%, transparent 60%)` 
                           : `radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.2) 0%, transparent 70%)`
                       }}
                  ></div>
                  
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-xs text-white rounded font-mono">
                    HEATMAP OVERLAY
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground text-center">
                  Note: Red regions indicate high reconstruction error (anomaly).
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
