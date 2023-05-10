const darkButtonsClasses = "p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"



// function to add "Play" button to elements with class "visible"
function addPlayButtonToVisibleElements() {
  const darkBgElements = document.getElementsByClassName('dark:bg-[#444654]');


  chrome.runtime.onMessage.addListener((message) => {
    
    if (message.trigger === "interrupted") {
      const darkBgElements = document.getElementsByClassName('dark:bg-[#444654]');
      const previouslyPlayedElements = darkBgElements[message.previousId].getElementsByClassName('visible')

      for (let index = 0; index < previouslyPlayedElements.length; index++) {
        const thePlayButton = previouslyPlayedElements[index].querySelector('.play-button')
        const thePauseButton = previouslyPlayedElements[index].querySelector('.pause-button')
        const theResumeButton = previouslyPlayedElements[index].querySelector('.resume-button')
        const theStopButton = previouslyPlayedElements[index].querySelector('.stop-button')
  
        thePauseButton.style.display = 'none'
        theResumeButton.style.display = 'none'
        theStopButton.style.display = 'none'
        thePlayButton.style.display = 'block'
        
      }
      

    }
  });

  for (let i = 0; i < darkBgElements.length; i++) {
    const visibleElements = darkBgElements[i].getElementsByClassName('visible');

    const breakWords = darkBgElements[i].querySelector('.whitespace-pre-wrap.break-words')

    for (let j = 0; j < visibleElements.length; j++) {
      // check if the element already has a "Play" button
      if (!visibleElements[j].querySelector('.speech-button')) {
        
        // Create speech buttons
        const playButton = document.createElement('button');
        const pauseButton = document.createElement('button');
        const resumeButton = document.createElement('button');
        const stopButton = document.createElement('button');
        
        // Assign classnames
        playButton.className = `speech-button play-button ${darkButtonsClasses}`;
        pauseButton.className = `speech-button pause-button ${darkButtonsClasses}`;
        resumeButton.className = `speech-button resume-button ${darkButtonsClasses}`;
        stopButton.className = `speech-button stop-button ${darkButtonsClasses}`;
        
        // Inner text
        playButton.innerHTML = '<svg class="h-4 w-4" height="1em" width="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.74982 18.6508C2.33982 18.6508 1.99982 18.3108 1.99982 17.9008V12.2008C1.94982 9.49078 2.95982 6.93078 4.83982 5.01078C6.71982 3.10078 9.23982 2.05078 11.9498 2.05078C17.4898 2.05078 21.9998 6.56078 21.9998 12.1008V17.8008C21.9998 18.2108 21.6598 18.5508 21.2498 18.5508C20.8398 18.5508 20.4998 18.2108 20.4998 17.8008V12.1008C20.4998 7.39078 16.6698 3.55078 11.9498 3.55078C9.63982 3.55078 7.49982 4.44078 5.90982 6.06078C4.30982 7.69078 3.45982 9.86078 3.49982 12.1808V17.8908C3.49982 18.3108 3.16982 18.6508 2.74982 18.6508Z" fill="#949fa5"/><path d="M5.94 12.4492H5.81C3.71 12.4492 2 14.1592 2 16.2592V18.1392C2 20.2392 3.71 21.9492 5.81 21.9492H5.94C8.04 21.9492 9.75 20.2392 9.75 18.1392V16.2592C9.75 14.1592 8.04 12.4492 5.94 12.4492Z" fill="#949fa5"/><path d="M18.19 12.4492H18.06C15.96 12.4492 14.25 14.1592 14.25 16.2592V18.1392C14.25 20.2392 15.96 21.9492 18.06 21.9492H18.19C20.29 21.9492 22 20.2392 22 18.1392V16.2592C22 14.1592 20.29 12.4492 18.19 12.4492Z" fill="#949fa5"/></svg>';
        pauseButton.innerHTML = '<svg class="h-4 w-4" height="1em" width="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.1" d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" fill="#949fa5"/><path d="M14 9L14 15" stroke="#949fa5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9L10 15" stroke="#949fa5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#949fa5" stroke-width="2"/></svg>';
        resumeButton.innerHTML = '<svg class="h-4 w-4" height="1em" width="1em" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.04995 2.74995C3.04995 2.44619 2.80371 2.19995 2.49995 2.19995C2.19619 2.19995 1.94995 2.44619 1.94995 2.74995V12.25C1.94995 12.5537 2.19619 12.8 2.49995 12.8C2.80371 12.8 3.04995 12.5537 3.04995 12.25V2.74995ZM5.73333 2.30776C5.57835 2.22596 5.39185 2.23127 5.24177 2.32176C5.0917 2.41225 4.99995 2.57471 4.99995 2.74995V12.25C4.99995 12.4252 5.0917 12.5877 5.24177 12.6781C5.39185 12.7686 5.57835 12.7739 5.73333 12.6921L14.7333 7.94214C14.8973 7.85559 15 7.68539 15 7.49995C15 7.31452 14.8973 7.14431 14.7333 7.05776L5.73333 2.30776ZM5.99995 11.4207V3.5792L13.4287 7.49995L5.99995 11.4207Z" fill="#949fa5"/></svg>';
        stopButton.innerHTML = '<svg fill="#949fa5" class="h-4 w-4" height="1em" width="1em" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M8 8h16v16H8z"/></svg>';
        
        // declare displays
        pauseButton.style.display = 'none'
        resumeButton.style.display = 'none'
        stopButton.style.display = 'none'


        chrome.runtime.onMessage.addListener((message) => {
          if (message.trigger === "finished") {
            pauseButton.style.display = 'none'
            resumeButton.style.display = 'none'
            stopButton.style.display = 'none'
            playButton.style.display = 'block'
          }

          
        });
        
        
        // event listeners
        playButton.addEventListener('click', () => {
          const text = breakWords.innerText.trim();


          chrome.runtime.sendMessage({ type: 'play', text: text, id: i });
          
          playButton.style.display = 'none'
          pauseButton.style.display = 'block'
        });
        
        pauseButton.addEventListener('click', () => {
          if (playButton.style.display == 'none') {
            chrome.runtime.sendMessage({ type: 'pause' });
            pauseButton.style.display = 'none'
            resumeButton.style.display = 'block'
            
          }
        })
        resumeButton.addEventListener('click', () => {
          if (playButton.style.display == 'none') {
            chrome.runtime.sendMessage({ type: 'resume' });
            resumeButton.style.display = 'none'
            stopButton.style.display = 'block'
            
          }
        })
        
        stopButton.addEventListener('click', () => {
          if (playButton.style.display == 'none') {
            chrome.runtime.sendMessage({ type: 'stop' });
            stopButton.style.display = 'none'
            playButton.style.display = 'block'
          }
        })
        
        
        // Add buttons to page
        visibleElements[j].appendChild(playButton);
        visibleElements[j].appendChild(pauseButton);
        visibleElements[j].appendChild(resumeButton);
        visibleElements[j].appendChild(stopButton);
      }
    }
  }
}

// create a MutationObserver to watch for changes to the page
const observer = new MutationObserver((mutations) => {
  // for each mutation
  for (let i = 0; i < mutations.length; i++) {
    const mutation = mutations[i];
    // if the mutation added nodes
    if (mutation.addedNodes.length > 0) {
      // add "Play" button to visible elements
      addPlayButtonToVisibleElements();

    }
  }
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (tab.url.startsWith("https://chat.openai.com/")) {


// start observing the page for changes
observer.observe(document.body, {
  childList: true, // observe changes to the child nodes of the body element
  subtree: true, // observe changes to the entire page
});

// add "Play" button to visible elements on initial page load
addPlayButtonToVisibleElements();

//   }

// })
