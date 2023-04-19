console.log("console of content script is working");



// Background color
// chrome.tts.speak('Hello, world! How can i make this work effectively without the troubles i keep facing. I am currently hungry and i need this to work please');


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
  
        thePauseButton.style.display = 'none'
        theResumeButton.style.display = 'none'
        thePlayButton.style.display = 'block'
        
      }
      

    }
  });

  for (let i = 0; i < darkBgElements.length; i++) {
    const visibleElements = darkBgElements[i].getElementsByClassName('visible');
    const sentenceElements = darkBgElements[i].getElementsByClassName('break-words');
    for (let j = 0; j < visibleElements.length; j++) {
      // check if the element already has a "Play" button
      if (!visibleElements[j].querySelector('.speech-button')) {
        
        // Create speech buttons
        const playButton = document.createElement('button');
        const pauseButton = document.createElement('button');
        const resumeButton = document.createElement('button');
        
        // Assign classnames
        playButton.className = `speech-button play-button ${darkButtonsClasses}`;
        pauseButton.className = `speech-button pause-button ${darkButtonsClasses}`;
        resumeButton.className = 'speech-button resume-button';
        
        // Inner text
        playButton.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75"><path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z" style="stroke:#111;stroke-width:5;stroke-linejoin:round;" /><path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;stroke:#111;stroke-width:5;stroke-linecap:round"/></svg>';
        pauseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" stroke="#000" stroke-width="2" fill="none"/><rect x="14" y="4" width="4" height="16" stroke="#000" stroke-width="2" fill="none"/></svg>';
        // playButton.innerText = 'Play';
        // pauseButton.innerText = 'Pause';
        resumeButton.innerText = 'Resume';
        
        // declare displays
        pauseButton.style.display = 'none'
        resumeButton.style.display = 'none'
        chrome.runtime.onMessage.addListener((message) => {
          if (message.trigger === "finished") {
            pauseButton.style.display = 'none'
            resumeButton.style.display = 'none'
            playButton.style.display = 'block'
          }

          // if (message.trigger === "reading") {
          //   console.log(message.characterIndex);

            
          // }
          
        });
        
        
        // event listeners
        playButton.addEventListener('click', () => {
          const text = darkBgElements[i].innerText.trim();

          chrome.runtime.sendMessage({ type: 'play', text: text, id: i });
          
          playButton.style.display = 'none'
          pauseButton.style.display = 'block'
        });
        
        pauseButton.addEventListener('click', () => {
          if (playButton.style.display == 'none') {
            pauseButton.style.display = 'none'
            resumeButton.style.display = 'block'
            chrome.runtime.sendMessage({ type: 'pause' });
            
          }
        })
        resumeButton.addEventListener('click', () => {
          if (playButton.style.display == 'none') {
            resumeButton.style.display = 'none'
            pauseButton.style.display = 'block'
            chrome.runtime.sendMessage({ type: 'resume' });
            
          }
        })
        
        
        // Add buttons to page
        visibleElements[j].appendChild(playButton);
        visibleElements[j].appendChild(pauseButton);
        visibleElements[j].appendChild(resumeButton);
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

// start observing the page for changes
observer.observe(document.body, {
  childList: true, // observe changes to the child nodes of the body element
  subtree: true, // observe changes to the entire page
});

// add "Play" button to visible elements on initial page load
addPlayButtonToVisibleElements();
