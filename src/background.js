chrome.runtime.onInstalled.addListener(() => {
    console.log('[background] chrome.runtime.onInstalled initialize'); 
  });

  let previousId;

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.type === 'play') {

      
      chrome.tts.speak(
        request.text,
        {
          onEvent: function(event) {
            console.log('Event ' + event.type + ' at position ' + event.charIndex);

            // console.log(event.type);



            if (event.type == 'end') {

              console.log("THis just ended");

              chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { trigger: "finished" });
              });              
            }
            if (event.type == 'interrupted') {
              previousId = request.id

              chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { trigger: "interrupted", previousId });
              });              
                
            }
          }
        },
      );



    } else if(request.type === 'pause') {


      console.log("This was paused");
      chrome.tts.pause();


    } else if(request.type === 'resume') {

      console.log("this prompt is to resume the speech");
      chrome.tts.resume();


    }

  })
  