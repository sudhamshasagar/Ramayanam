const shlokaContext = document.querySelector('.sk h5');
const shlokaNumber = document.querySelector('.sk h6');
const audioContext = document.querySelector('.audio');
const audioControls = document.querySelector('.audio-tab');
const englishHeading = document.querySelector('.english h5');
const englishContext = document.querySelector('.english p');
const kannadaHeading = document.querySelector('.kannada h5');
const kannadaContext = document.querySelector('.kannada p');
// const hindiHeading = document.querySelector('.hindi h5');
// const hindiContext = document.querySelector('.hindi p');
const addButtons = document.querySelector('.buttons');
const selection = document.querySelector('#select-kaanda');
let nextButton = document.querySelector('.next-button');
let previousButton = document.querySelector('.previous-button');

// Initialize index to 0
let currentShlokaIndex = 0;

const shlokasCollection = {
  "baala-kaanda": [
    {
      "shloka_id": 1,
      "text": "तपस्स्वाध्यायनिरतं तपस्वी वाग्विदां वरम् । नारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम्",
      "audio": "",
      "translations": {
        "english": "Valmiki- a devoted ascetic, asked Narada, who was one of the most renowned sages known for practicing religious austerities, studying the Vedas, and excelling in eloquence.",
        "kannada": "ನಿಷ್ಠಾವಂತ ತಪಸ್ವಿಯಾಗಿದ್ದ ವಾಲ್ಮೀಕಿ, ಧಾರ್ಮಿಕ ತಪಸ್ಸುಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಲು, ವೇದಗಳನ್ನು ಅಧ್ಯಯನ ಮಾಡಲು ಮತ್ತು ವಾಕ್ಚಾತುರ್ಯದಲ್ಲಿ ಶ್ರೇಷ್ಠತೆಗೆ ಹೆಸರುವಾಸಿಯಾದ ಋಷಿಗಳಲ್ಲಿ ಒಬ್ಬರಾದ ನಾರದನನ್ನು ಕೇಳಿದರು.",
        // "hindi": "hi"
      }
    },
    {
        "shloka_id": 2,
        "text": "कोन्वस्मिन्साम्प्रतं लोके गुणवान्कश्च वीर्यवान् । धर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रत",
        "audio": "",
        "translations":{
        "english": "Who in the world today possesses outstanding qualities, strength, morality, thankfulness, honesty, and unwavering commitment to their promises?",
        "kannada": "ಇಂದು ಜಗತ್ತಿನಲ್ಲಿ ಯಾರು ಅತ್ಯುತ್ತಮ ಗುಣಗಳು, ಶಕ್ತಿ, ನೈತಿಕತೆ, ಕೃತಜ್ಞತೆ, ಪ್ರಾಮಾಣಿಕತೆ ಮತ್ತು ಅವರ ಭರವಸೆಗಳಿಗೆ ಅಚಲವಾದ ಬದ್ಧತೆಯನ್ನು ಹೊಂದಿದ್ದಾರೆ?"
    }
    },
    {
        "shloka_id": 3,
        "text": "चारित्रेण च को युक्तस्सर्वभूतेषु को हित: । विद्वान्क: कस्समर्थश्च कश्चैकप्रियदर्शन:" ,
        "translations":{
            "english": "Who is that person who has virtuous behavior, cares for the welfare of all living beings, is knowledgeable about various subjects, can accomplish tasks that others cannot, and is exceptionally attractive?",
            "kannada":"ಸದ್ಗುಣವನ್ನು ಹೊಂದಿರುವ, ಸಕಲ ಜೀವಿಗಳ ಕಲ್ಯಾಣವನ್ನು ಕಾಳಜಿ ವಹಿಸುವ, ವಿವಿಧ ವಿಷಯಗಳ ಬಗ್ಗೆ ಜ್ಞಾನವುಳ್ಳ, ಇತರರು ಮಾಡಲಾಗದ ಕಾರ್ಯಗಳನ್ನು ಸಾಧಿಸಬಲ್ಲ ಮತ್ತು ಅಸಾಧಾರಣವಾಗಿ ಆಕರ್ಷಕವಾಗಿರುವ ವ್ಯಕ್ತಿ ಯಾರು?"
        }
    }
  ],
  "ayodhya-kaanda": [
    // Shlokas for ayodhya-kaanda
  ],
  // More Kaandas
};

function displayShlokas(selectedKaanda) {
  if (selectedKaanda === "") {
    // Display a message to select a Kaanda
    shlokaContext.textContent = "Please Select Any Kaanda To View";
    audioControls.style.display = 'none';
    englishHeading.textContent = "";
    kannadaHeading.textContent = "";
    // hindiHeading.textContent = "";
    englishContext.textContent = "";
    kannadaContext.textContent = "";
    // hindiContext.textContent = "";
    nextButton.style.display = "none";
    return; // Stop further execution
  }

  const shlokas = shlokasCollection[selectedKaanda];

  if (shlokas) {
    const shloka = shlokas[currentShlokaIndex];
    shlokaContext.textContent = shloka.text;
    shlokaNumber.textContent = 'Shloka No: ' + shloka.shloka_id;
    audioControls.style.display = 'block';
    audioContext.src = shloka.audioSrc;
    englishContext.textContent = shloka.translations.english;
    kannadaContext.textContent = shloka.translations.kannada;
    hindiContext.textContent = shloka.translations.hindi;

    // Show or hide "Previous" button based on the current index
    previousButton.style.display = currentShlokaIndex > 0 ? 'block' : 'none';
  } else {
    shlokaContext.textContent = "Error in Fetching the Shlokas";
  }
}

selection.addEventListener('change', function () {
  const selectedKaanda = this.value;
  englishHeading.textContent = "Meaning in English";
  kannadaHeading.textContent = "Meaning in Kannada";
//   hindiHeading.textContent = "Meaning in Hindi";
  nextButton.style.display = 'block';
  const h5Element = document.querySelector('.shloka-heading');
  if (h5Element) {
    h5Element.style.display = 'none';
  }
  displayShlokas(selectedKaanda);
});

// Function to show the next shloka
function showNextShloka() {
  currentShlokaIndex++;
  displayShlokas(selection.value);
}

// Function to show the previous shloka
function showPreviousShloka() {
  currentShlokaIndex--;
  displayShlokas(selection.value);
}

// Event listeners for "Next" and "Previous" buttons
nextButton.addEventListener('click', showNextShloka);
previousButton.addEventListener('click', showPreviousShloka);
