from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import speech_recognition as sr

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Backend running"}

@app.get("/speech-to-text")
def speech_to_text():
    r = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            audio = r.listen(source)
        text = r.recognize_google(audio)
        return {"text": text}
    except:
        return {"error": "Speech recognition failed"}
