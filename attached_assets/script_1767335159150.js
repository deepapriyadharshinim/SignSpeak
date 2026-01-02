const textInput = document.getElementById("textInput");
const playBtn = document.getElementById("playBtn");
const signImage = document.getElementById("signImage");
const caption = document.getElementById("caption");
const speedSlider = document.getElementById("speed");
const speakBtn = document.getElementById("speakBtn");

const signs = {
  "A": "signlanguage/a.png",
  "B": "signlanguage/b.png",
  "C": "signlanguage/c.png",
  "D": "signlanguage/d.png",
  "E": "signlanguage/e.png",
  "F": "signlanguage/f.png",
  "G": "signlanguage/g.png",
  "H": "signlanguage/h.png",
  "I": "signlanguage/i.png",
  "J": "signlanguage/j.png",
  "K": "signlanguage/k.png",
  "L": "signlanguage/l.png",
  "M": "signlanguage/m.png",
  "N": "signlanguage/n.png",
  "O": "signlanguage/o.png",
  "P": "signlanguage/p.png",
  "Q": "signlanguage/q.png",
  "R": "signlanguage/r.png",
  "S": "signlanguage/s.png",
  "T": "signlanguage/t.png",
  "U": "signlanguage/u.png",
  "V": "signlanguage/v.png",
  "W": "signlanguage/w.png",
  "X": "signlanguage/x.png",
  "Y": "signlanguage/y.png",
  "Z": "signlanguage/z.png",
  " ": "signlanguage/space.png"
};

playBtn.onclick = async () => {
  const text = textInput.value.toUpperCase();
  const delay = speedSlider.value * 1000;

  for (const ch of text) {
    if (signs[ch]) {
      signImage.src = signs[ch];
      caption.innerText = `Sign for '${ch}'`;
      await new Promise(r => setTimeout(r, delay));
    }
  }
};

speakBtn.onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    textInput.value = event.results[0][0].transcript;
  };

  recognition.start();
};
