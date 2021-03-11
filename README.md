# Some Components From the Ipecac Recordings Redesign

Since the Ipecac Recordings codebase is private, here are a few examples of the ReactJS components I'm especially proud of.

# SingleAlbum.jsx
This renders each album sitewide, whether the five on the frontpage or the 100+ on the "Releases" page. <br/>

**• React Hooks and Reactstrap:** Provides toggling modal where user can explore release date, catalog number, Bandcamp stream, larger album art and a purchase/streaming link<br/>
**• Moment:** Determines whether album has been released. If not, then displays release date.<br/>
**• React-Bandcamp:** Third-party application that uses ID number (bcId) pulled from database to display streaming song<br/>
**• ipecac.css:** Contains styling for hover effect and object-fit for art that doesn't have 1:1 aspect ratio<br/>

# Artists.jsx

This turns JSON object of information retrieved from the database into the dynamic artist page

**• Line 25: Sidebar:** This renders the sidebar, alphabetizing the artists (sans "the") and filters them into the NOW or FAMILY sections, based on what the webmaster has dictated by using the admin.<br/>
**• Line 67: Main Image:** After an artist is clicked, the database returns a JSON object with all of the artist's pertinent info.<br/> 
**• Line 80:** Sorting mechanism to find artist's albums, related artists' album, then return them in the RELEASES or RELATED sections in reverse chronological order.<br/>
**• Line 100:** Using DOMPurify to make sure html is secure.<br/>
**• Line 119:** The artist's name is rendered on top of the picture, letting the text bleed into the left and bottom margins. This design ("fake-mackie" in ipecac.css) was inspired by Mackie Osborne's take on the Ipecac logo, that's appeared on various Melvins releases since 2001. Beyond the .css elements, this sorting mechanism helps determine name size to make it look good for both large band names and small band names. <br/>

# RelatedArtists.jsx

A page from the admin that makes various API calls to add or delete related artists, all while providing visuals on the Virtual DOM that immediately match the changes.
