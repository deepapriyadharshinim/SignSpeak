import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Play, Pause, Download, Settings, Type, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Import assets
import heroImage from "@assets/generated_images/hero_image_of_sign_language_interpreter.png";
import signA from "@/assets/sign-language/a.png";
import signB from "@/assets/sign-language/b.png";
import signC from "@/assets/sign-language/c.png";
import signGeneric from "@assets/generated_images/generic_hand_ready_to_sign.png";
import signD from "@/assets/sign-language/d.png";
import signE from "@/assets/sign-language/e.png";
import signF from "@/assets/sign-language/f.png";
import signG from "@/assets/sign-language/g.png";
import signH from "@/assets/sign-language/h.png";
import signI from "@/assets/sign-language/i.png";
import signJ from "@/assets/sign-language/j.png";
import signK from "@/assets/sign-language/k.png";
import signL from "@/assets/sign-language/l.png";
import signM from "@/assets/sign-language/m.png";
import signN from "@/assets/sign-language/n.png";
import signO from "@/assets/sign-language/o.png";
import signP from "@/assets/sign-language/p.png";
import signQ from "@/assets/sign-language/q.png";
import signR from "@/assets/sign-language/r.png";
import signS from "@/assets/sign-language/s.png";
import signT from "@/assets/sign-language/t.png";
import signU from "@/assets/sign-language/u.png";
import signV from "@/assets/sign-language/v.png";
import signW from "@/assets/sign-language/w.png";
import signX from "@/assets/sign-language/x.png";
import signY from "@/assets/sign-language/y.png";
import signZ from "@/assets/sign-language/z.png";
// How to add your own images:
// 1. Upload your images to the 'client/src/assets/sign-language' folder
// 2. Name them 'a.png', 'b.png', etc.
// 3. Import them here: import mySignA from "@/assets/sign-language/a.png";
// 4. Update the SIGN_MAP object below with your new imports.

// Map available signs (mockup: only A, B, C are real, others generic)
const SIGN_MAP: Record<string, string> = {
  a: signA,
  b: signB,
  c: signC,
  // Mapping other letters to generic for prototype
  d: signD, e: signE, f: signF, g: signG,
  h: signH, i: signI, j: signJ, k: signK,
  l: signL, m: signM, n: signN, o: signO,
  p: signP, q: signQ, r: signR, s: signS,
  t: signT, u: signU, v: signV, w: signW,
  x: signX, y: signY, z: signZ
};

export default function Home() {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSign, setCurrentSign] = useState<string | null>(null);
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [speed, setSpeed] = useState([1]); // seconds
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  
  const processRef = useRef<number | null>(null);

  // Web Speech API Handling
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Your browser does not support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setIsListening(false);
      toast({ title: "Heard", description: `"${transcript}"` });
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
      toast({ title: "Error", description: "Could not hear you properly.", variant: "destructive" });
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const playAnimation = async () => {
    if (!text.trim()) {
      toast({ title: "Empty input", description: "Please enter some text first.", variant: "destructive" });
      return;
    }

    setIsPlaying(true);
    const words = text.toLowerCase().split(/\s+/);
    const delay = speed[0] * 1000;

    try {
      for (const word of words) {
        const cleanWord = word.replace(/[^a-z]/g, '');
        if (!cleanWord) continue;

        for (let i = 0; i < cleanWord.length; i++) {
          const char = cleanWord[i];
          
          // Brief blink (clear sign)
          setCurrentSign(null);
          setCurrentLetter("");
          await new Promise(r => setTimeout(r, delay * 0.15));

          setCurrentLetter(char.toUpperCase());
          const signImg = SIGN_MAP[char];
          setCurrentSign(signImg || signGeneric);

          await new Promise(r => setTimeout(r, delay * 0.85));
        }
        
        // Pause between words
        setCurrentSign(null);
        setCurrentLetter("Space");
        await new Promise(r => setTimeout(r, delay / 2));
      }
    } catch (error) {
      console.error("Animation error:", error);
    } finally {
      setIsPlaying(false);
      setCurrentSign(null);
      setCurrentLetter("");
    }
  };

  const downloadAnimation = () => {
    toast({
      title: "Downloading Animation...",
      description: "Capturing and saving your sign language sequence.",
    });
    
    setTimeout(() => {
      toast({
        title: "Prototype Mode",
        description: "In the full application, this would export a video or GIF of the animation sequence.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
      
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg font-display">S</div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">SignSpeak</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">Documentation</Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Controls & Input */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Turn your text or voice into <br />
              <span className="text-primary">Sign Language</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              An intelligent tool that converts speech and text into Indian Sign Language animations instantly. Perfect for learning and accessibility.
            </p>
          </div>

          <Card className="p-6 shadow-xl border-border/50 bg-white/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400" />
            
            <div className="space-y-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type here or use voice..." 
                    className="h-14 px-4 text-lg bg-gray-50 border-gray-200 focus:ring-primary/20 transition-all pr-12"
                    data-testid="input-text"
                  />
                  <Type className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                </div>
                
                <Button 
                  size="icon" 
                  className={`h-14 w-14 shrink-0 transition-all ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : ''}`}
                  onClick={startListening}
                  data-testid="button-mic"
                >
                  <Mic className={`w-6 h-6 ${isListening ? 'animate-bounce' : ''}`} />
                </Button>
              </div>

              <div className="flex items-center justify-between gap-6 p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Speed</span>
                </div>
                <Slider 
                  value={speed} 
                  onValueChange={setSpeed} 
                  min={0.2} 
                  max={2} 
                  step={0.1} 
                  className="flex-1 max-w-[200px]"
                />
                <span className="text-sm font-mono w-12 text-right">{speed[0]}s</span>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={playAnimation} 
                  disabled={isPlaying}
                  className="flex-1 h-14 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                  data-testid="button-play"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2 animate-pulse" /> Animate Text
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" /> Play Animation
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 border-gray-200"
                  onClick={downloadAnimation}
                  title="Download Animation"
                  data-testid="button-download-anim"
                >
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Visualization */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-blue-500/10 rounded-full blur-3xl transform -translate-y-10" />
          
          <Card className="relative overflow-hidden aspect-[4/3] rounded-3xl border-0 shadow-2xl bg-white flex flex-col items-center justify-center group">
            
            {/* Display Area */}
            <AnimatePresence mode="wait">
              {currentSign ? (
                <motion.div
                  key="sign"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full flex items-center justify-center bg-white p-8"
                >
                  <img 
                    src={currentSign} 
                    alt={`Sign for ${currentLetter}`} 
                    className="max-h-full max-w-full object-contain drop-shadow-xl"
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-full text-2xl font-bold font-display shadow-lg backdrop-blur-md">
                    {currentLetter}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="hero"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full h-full"
                >
                  <img 
                    src={heroImage} 
                    alt="Hero" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-8">
                    <p className="text-white text-lg font-medium bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      Ready to translate
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status Indicator */}
            <div className="absolute top-6 right-6">
              {isPlaying ? (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600 animate-pulse shadow-lg shadow-green-500/20">
                  Translating...
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-white/80 backdrop-blur text-xs">
                  Idle
                </Badge>
              )}
            </div>

          </Card>

          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Status</p>
                <p className="text-sm font-medium">System Online</p>
              </div>
            </div>
          </div>

        </div>

      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>© 2026 SignSpeak Project. All rights reserved.</p>
      </footer>
    </div>
  );
}
