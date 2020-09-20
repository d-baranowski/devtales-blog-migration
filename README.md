# Motivation
 This application should serve as an example of my abilities with React, Typescript and GoLang as well as serverless technologies.

# MVP 
Original idea for the product was much larger, however it is important to start with a minimal viable product that I'll feel is good enough to show to people. To avoid feature creep and ensure I stay focused during the lifetime of this product I need an achievable list of high level requirements. 

- Users can login using Gmail. They'll need to login to play the game.
- Users will be matched with opponents automatically based on preferences (with default preferences provided) 
- Users will play a game of chess if any of them leaves early, the other will be victorious.
- Games will be timed. 
- Game will work on mobile devices.

# Post MVP 

- Leader board 
- In game chat 
- In game betting 
- Reconnect to game on browser refresh

# Principles & Technology choices
- Pure Components I want every state in the front end achievable by dispatching a set of redux actions 
- Fully mocked out backend for fast iteration on the frontend 
- Infrasctructure as code using CloudFormation 
- Serverless 
- Kanban 
- Sockets as first class citizen
- One socket to rule it all 
- Reusable Components
