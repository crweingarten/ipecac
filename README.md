# Some Components From the Ipecac Recordings Redesign

Since the Ipecac Recordings codebase is private, here are a few examples of the ReactJS components I'm especially proud of.

# SingleAlbum.jsx
This renders each album sitewide, whether the five on the frontpage or the 100+ on the "Releases" page. 
**• React Hooks and Reactstrap:** Provides toggling modal where user can explore release date, catalog number, Bandcamp stream, larger album art and a purchase/streaming link
**• Moment:** Determines whether album has been released. If not, then displays release date.
**• React-Bandcamp:** Third-party application that uses ID number (bcId) pulled from database to display streaming song
**• ipecac.css:** Contains styling for hover effect and object-fit for art that doesn't have 1:1 aspect ratio
