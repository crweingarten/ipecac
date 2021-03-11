import React from 'react'
import '../ipecac.css'
import ArtistService from '../services/ArtistService'
import Albums from '../albums/Albums'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'

class Artists extends React.Component {

    state = {
        activeArtists: [],
        familyArtists: [],
        mainArtistImage: "",
        artistName: "",
        artistBio: "",
        artistUrls: "",
        artistAlbums: [],
        artistRelated: [],
    }

    componentDidMount() {
        ArtistService.selectAllBasicDetails(this.getArtistsSuccess, this.getArtistsError)
    }

    //----SIDEBAR----//

    getArtistsSuccess = (response) => {
        let artistData = response
        artistData.sort((itema, itemb) => {
            const nameA = itema.artist.toLowerCase().replace(/^the\s+/, '');
            const nameB = itemb.artist.toLowerCase().replace(/^the\s+/, '');
            return nameA.localeCompare(nameB)
        })

        const mapArtists = (item) => (
        <Link 
            key={item.artistId}
            to={`/artists/${item.slug}`} 
            onClick={() => this.onArtistClicked(item.artistId)}
            className="artist-link" 
            replace
            >
            <li>{item.artist}</li>   
           </Link>)

        const mappedActive = artistData.filter(artist => artist.nowActive === "Y").map(mapArtists)
        const mappedFamily = artistData.filter(artist => artist.nowActive === "N").map(mapArtists)
        const artistByUrl = artistData.find(artist => artist.slug === this.props.match.params.slug)

        if (artistByUrl !== undefined)
            {let id = artistByUrl.artistId
                this.onArtistClicked(id)}

        this.setState((prevState) => {
            return {
                ...prevState,
            activeArtists: mappedActive,
            familyArtists: mappedFamily,
            mainArtistImage: <img className="img-fluid d-none d-sm-none d-md-block" src="http://assets.ipecac.com/images/etc/slipmat.jpg" alt="artist" />
        }
    })}

    onArtistClicked = (artistId) => {
        ArtistService.getArtistAndCatalog(artistId, this.getArtistByIdSuccess, this.getArtistByIdError)
    }

      //----MAIN IMAGE---//

    getArtistByIdSuccess = async (response) => {
        window.scrollTo(0, 0)

        let artistInfo = response.artistInfo
        let catalog = response.catalog
        let name = artistInfo.artist.toLowerCase()
        let urls = artistInfo.bandUrl
        let related = response.artistInfo.related.split(",").map(Number)
        let albums = []
        let relatedAlbums = []

        for (let i = 0; i < catalog.length; i++) {
            if (artistInfo.artistId === catalog[i].artistId) { albums.push(catalog[i]) }
            for (let j = 0; j < related.length; j++) { if (catalog[i].artistId === related[j]) { relatedAlbums.push(catalog[i]) }
        }}

        albums.sort((albuma, albumb) => (albuma.releaseDate < albumb.releaseDate) ? 1 : -1)
        relatedAlbums.sort((albuma, albumb) => (albuma.releaseDate < albumb.releaseDate) ? 1 : -1)

        function renderUrls(urls) {
            if (urls === null) { return "" }
            else {
                let urlsArray = urls.split(",")
                const mapUrls = (url) => { return <div key={url}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></div> }
                const mappedUrls = urlsArray.map(mapUrls)
                return mappedUrls
            }
        }

        let mainImage = `http://assets.ipecac.com/images/artists/${artistInfo.artistId}.jpg`

        let cleanBio = DOMPurify.sanitize(artistInfo.bio, {USE_PROFILES: {html: true}})

        this.setState((prevState) => {
            return {
                ...prevState,
                artistName: this.renderArtistName(name),
                artistBio: <div dangerouslySetInnerHTML={{ __html: cleanBio }}></div>,
                artistUrls: renderUrls(urls),
                artistAlbums: albums,
                artistRelated: relatedAlbums,
                mainArtistImage: <img className="img-fluid" src={mainImage} alt="artist" />
            }
        })
    }

    getArtistByIdError(err) {
        console.log('Get Artist Failed: ', err)
    }

    renderArtistName(name) {
        if (name.includes("ē")) { return <span className="artist-display-tetema">{name}</span> }
        if (name.length <= 8) { return <span className="artist-display-text">{name}</span> }
        if (name.length >= 9 && name.length <= 14 && name.includes(" ")) { return <span className="artist-display-text" align="left">{name}</span> }
        if (name.length >= 9 && !name.includes(" ")) { return <span className="artist-sm-display-text" align="left">{name}</span> }
        else { return <span className="artist-md-display-text" align="left">{name}</span> }
    }

    getArtistsError(err) {
        console.log('Get all artists failed: ', err)
    }

    render() {
        let albums = this.state.artistAlbums
        let related = this.state.artistRelated

        return (
            <React.Fragment >
                <div className="row">
                    < div className="col-md-3 d-none d-md-block" >
                        <div className="fake-mackie-two" align="left">now</div><div><ul className="name-black">{this.state.activeArtists}</ul></div>
                        <div className="fake-mackie-two" align="left">family</div><div><ul className="name-black">{this.state.familyArtists}</ul></div></div >
                    <div className="col-md-9">
                        <div className="container">
                            <div className="artist-display">
                               {this.state.mainArtistImage}
                                {this.state.artistName}
                            </div>
                            <div align="left" className="mt-4">{this.state.artistBio}</div>
                            <div align="left">{this.state.artistUrls}</div>
                            <div className="mt-4">{this.state.artistTour}</div>

                            {albums.length ? <div className="fake-mackie">RELEASES</div> : <div />}
                            <div><Albums albums={albums} /></div>

                            {related.length ? <div className="fake-mackie">RELATED</div> : <div />}
                            <div><Albums albums={related} /></div>
                        </div>
                    </div></div >

                <div className="d-md-none">
                    <div className="fake-mackie-two">NOW</div><div><ul className="name-black">{this.state.activeArtists}</ul></div>
                    <div className="fake-mackie-two">FAMILY</div><div><ul className="name-black">{this.state.familyArtists}</ul></div></div>
            </React.Fragment >)
    }
}

export default Artists