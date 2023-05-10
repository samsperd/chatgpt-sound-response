
// Get the <select> element for voice selection
const voiceSelect = document.getElementById('voiceSelect');
const langSelect = document.getElementById('langSelect');

// Get the <input> element for rate slider
const rateSlider = document.getElementById('rate-slider');

// Retrieve the pitch slider element
const pitchSlider = document.getElementById('pitchSlider');

// Get the <output> element for rate output
const rateOutput = document.getElementById('rate-output');
const pitchOutput = document.getElementById('pitch-output');








    // chrome.storage.local.get(['speechStore'], function(result) {
    //   if (result.speechStore.voice !== null) {
    //     voiceSelect.value = result.speechStore.voice
    //   }
      
    // })



chrome.tts.getVoices((voices) => {
    // Loop through the retrieved voices and create <option> elements
    const filteredVoices = voices.filter(voice => !voice.hasOwnProperty("extensionId"));
      // Group the filtered voice objects based on "lang" key
  const groupedVoices = filteredVoices.reduce((acc, voice) => {
    const lang = voice.lang;
    if (!acc.hasOwnProperty(lang)) {
      acc[lang] = [];
    }
    acc[lang].push(voice);
    return acc;
  }, {});


  for (const lang in groupedVoices) {
    const option = document.createElement('option');
    option.value = lang;
    option.style.textTransform = 'uppercase';


    option.textContent = lang;
    langSelect.appendChild(option);
  }

  // Add event listener to langSelect to populate voiceSelect based on selected language
  langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    const voices = groupedVoices[lang] || [];
    const voiceSelect = document.getElementById('voiceSelect');
    if (lang == "") {
      voiceSelect.disabled = true
      chrome.runtime.sendMessage({ type: "setLang", lang: null });
      
      
    } else {
      voiceSelect.disabled = false
      chrome.runtime.sendMessage({ type: "setLang", lang: lang });

    }
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.voiceName;
      option.textContent = voice.voiceName;
      voiceSelect.appendChild(option);
    });

    // chrome.storage.local.get(['speechStore'], function(result) {
    //   if (result.speechStore.voice !== null) {
    //     voiceSelect.value = result.speechStore.voice
    //   }
      
    // })
  });


  chrome.storage.local.get(['speechStore'], function(result) {
    rateSlider.value = result.speechStore.rate
    pitchSlider.value = result.speechStore.pitch
  
    pitchOutput.textContent = result.speechStore.pitch
    rateOutput.textContent = result.speechStore.rate
  
  
    langSelect.value = result.speechStore.lang
  
    if (result.speechStore.lang === "") {
      voiceSelect.disabled = true
    } else {
      voiceSelect.disabled = false
      const voices = groupedVoices[result.speechStore.lang] || [];
      
      voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.voiceName;
        option.textContent = voice.voiceName;
        voiceSelect.appendChild(option);
      });      
      voiceSelect.value = result.speechStore.voice
    }
    
  })


  
  });


// Add an event listener for voice selection changes
voiceSelect.addEventListener('change', (event) => {
    // Retrieve the selected voice's voiceName property
    const selectedVoiceName = event.target.value;



    // Send a message to background.js with some data
    chrome.runtime.sendMessage({ type: "setVoice", voice: selectedVoiceName });


});


// Add an event listener for rate slider changes
rateSlider.addEventListener('input', (event) => {
  // Retrieve the selected rate value
  const selectedRate = event.target.value;

  // Update the rate output element with the selected rate value
  rateOutput.textContent = selectedRate;
  chrome.runtime.sendMessage({ type: "setRate", rate: selectedRate });
});

  // Add an event listener for rate slider changes
rateSlider.addEventListener('change', (event) => {
    // Retrieve the selected rate value
    const selectedRate = event.target.value;
  
    // Use the selected rate to set the rate of text-to-speech
    // You can use chrome.tts.speak() with the rate parameter set to the selected rate value
    chrome.runtime.sendMessage({ type: "setRate", rate: selectedRate });
});
  


// Add an event listener for pitch slider changes
pitchSlider.addEventListener('change', (event) => {
  // Retrieve the selected pitch value
  const selectedPitch = event.target.value;

  pitchOutput.textContent = selectedPitch

  chrome.runtime.sendMessage({ type: "setPitch", pitch: selectedPitch });
});
