## VIDEO-PLAYER
https://video-player-blush.vercel.app/

## Prerequisite
- NodeJS  > 18.0.0v

## Running The Project
1.	Clone the repository
2.	cd video-player
3.	npm install

## Features
### Video Player
-   Play/Pause toggle.
-   Seek functionality.
-   Timer displaying current playback time and duration.
-   Autoplay.
-   Speed selector for playback speed adjustment.
- Full-screen mode
- Volume controls
- Refreshing the page, the video will continue from where the user left off.
- Once the video ends, the player picks up the next video from the playlist.

### Keyboard Shortcuts
- Spacebar to Play/Pause video
- Right Arrow to seek +5 seconds
- Left Arrow to seek -5 seconds 

### Playlist
- Shows total count
- Shows which video is playing
- Sorting
- Searching (used custom debouncer hook for performance)

### Tech Used
- NextJS 14
- Tailwind CSS

### Structure
- app
- components
	- Playlist
		- ListItem
		- Search
	- VideoPlayer
	- useDebounce (hook)
- features
	- videoProvider (context)
-  Utils
	- data (consists of video list, filter function)
	
### Performance
![Performance](https://video-player-blush.vercel.app/performance.png)

PS: I build this in one day only.
For large list, virtual scroll and infinite scroll is used. But because of the time constraint I was only to finish this much