chrome.runtime.onInstalled.addListener(() => {
    console.log('[background] chrome.runtime.onInstalled initialize');
    chrome.tts.stop()

    saveToStorage()

    
  });

  const speechStore = {
    lang: "",
    voice: "",
    rate: 1,
    pitch: 1
  };
  
  let previousId;
  let isPaused = false
  let isRemaining = false
  let wordChar;
  let remainingText = ''

  function saveToStorage() {
    chrome.storage.local.set({ speechStore }, function() {
      console.log("Data stored");
    });
  }


  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.startsWith("https://chat.openai.com/")) {
      chrome.action.setIcon({ path: "icon-128.png", tabId });


      chrome.action.setPopup({ popup: "popup.html", tabId })
      
      
    }

  });
  

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.type === 'play') {

      
      chrome.tts.speak(
        request.text,
        {
          onEvent: function(event) {

            if (event.type == 'pause') {

              remainingText = request.text.substring(event.charIndex);
            }



            if (event.type == 'end') {

              console.log("THis just ended");
              if (isPaused) {
                isRemaining = true
                return;
              }


              chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { trigger: "finished" });
                isRemaining = false
                isPaused = false
                remainingText = ''
              });              
            }
            if (event.type == 'interrupted') {
              previousId = request.id
              isPaused = false
              isRemaining = false

              chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { trigger: "interrupted", previousId });
              });              
                
            }
          },
          lang: speechStore.lang,
          voiceName: speechStore.voice,
          rate: speechStore.rate,
          pitch: speechStore.pitch
        },
      );



    } else if(request.type === 'pause') {

      chrome.tts.pause();
      isPaused = true


    } else if(request.type === 'resume') {

      chrome.tts.resume();
      isPaused = false

      if (isRemaining) {
        chrome.tts.speak(remainingText, { voiceName: speechStore.voice })
        isRemaining = false
      }

    } else if(request.type === 'stop') {
      chrome.tts.stop()
      isRemaining = false
      isPaused = false
      remainingText = ''

    } else if(request.type === 'setVoice') {
      speechStore.voice = request.voice

      saveToStorage()

    } else if(request.type === 'setRate') {
      speechStore.rate = parseFloat(request.rate)

      saveToStorage()
    } else if(request.type === 'setPitch') {
      speechStore.pitch = parseFloat(request.pitch)

      saveToStorage()
    } else if(request.type === 'setLang') {
      speechStore.lang = request.lang

      saveToStorage()
    }

  })
  