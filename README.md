# An app for planning Where2 go : )

-------

### Todo:
- Setup auth (probably with NextAuth and third party identity providers)
- Define database schemas
- Add basic routes for setting home location and desired move-to locations
- Let users create notes for a place and be able to see them on the map at the set geography

-----

Current build of master branch hosted at: https://where-to-eta.vercel.app/map

-----
## Log of me figuring out what I'm doing
---
### 7/23/22:
I want to reorganize some of the structure of the app. At first I wanted to build everything with a 
really modular design but I'm discovering that it's pretty important for the whole map page to have 
direct control and context over the state of all things going on in the map page. Just became too much of a pain
trying to pass props through and whatnot. Also, I want to reorient the design around desktop usage.
I can come back to make things more mobile friendly later but you would really rather have a large 
display to work with for a maps app like this. Users should be able to set a home location, select
moving destinations and rate each spots appeal. They should also be able to record notes about each
location that can be accessed both spatially on the map and through a more regular interface within
the app. Users should be able to view all of their locations on the map with color codings to indicate
appeal. Users should be able to edit and delete locations that they've saved. For each location, users should 
be able to store a list of links to apartment listings, neighborhood data, local weather, attractions,
job boards, and other relevant location data.

I also still need to get auth set up and figure out the shape of the data I'll be storing...