import React from 'react'
import ArtistService from '../services/ArtistService'
import { Button } from 'reactstrap'
import { withRouter } from "react-router-dom";

class RelatedArtists extends React.Component {

    state = {
        artistDropdown: [],
        artistData: [],
        artistName: "",
        artistId: "",
        isEdit: false,
        related: "",
        relatedButtons: ""
    }

    componentDidMount(props) {
        ArtistService.selectAllBasicDetails(this.getArtistsSuccess, this.getArtistsError)
    }

    getArtistsSuccess = (response) => {
        let artistData = response
        artistData.sort((itema, itemb) => {
            const nameA = itema.artist.toLowerCase().replace(/^the\s+/, '');
            const nameB = itemb.artist.toLowerCase().replace(/^the\s+/, '');
            return nameA.localeCompare(nameB)
        })

        const mapArtists = (artist) => { return <option value={artist.artistId} key={artist.artistId}>{artist.artist}</option> }
        const artistDropdown = artistData.map(mapArtists)
        this.setState({
            artistData: artistData,
            artistDropdown: artistDropdown,
        })
    }


    getArtistsError(err) {
        console.log('Get all artists failed: ', err)
    }

    handleChange = (e) => {
        let id = (e.target.value)
        ArtistService.selectById(id, this.getByIdSuccess, this.getByIdError)

    }

    handleDeleteRelated = (e) => {
        let id = e.target.value
        let currentRelated = this.state.related
        for (var i = 0; i < currentRelated.length; i++) {
            if (currentRelated[i].artistId === Number(id)) { currentRelated.splice(i, 1) }
        }

        const relatedButtons = currentRelated.map(this.mapRelated)

        this.setState((prevState) => {
            return {
                ...prevState,
                related: currentRelated,
                relatedButtons: relatedButtons
            }
        }
        )
    }

    handleAddRelated = (e) => {
        let id = e.target.value
        let currentRelated = this.state.related
        let artistData = this.state.artistData

        for (var i = 0; i < artistData.length; i++) {
            if (this.state.artistId === Number(id)) { return null }
            if (artistData[i].artistId === Number(id)) { currentRelated.push(artistData[i]) }
        }

        const relatedButtons = currentRelated.map(this.mapRelated)

        this.setState((prevState) => {
            return {
                ...prevState,
                related: currentRelated,
                relatedButtons: relatedButtons
            }
        }
        )
    }

    getByIdSuccess = (response) => {
        let artistInfo = this.state.artistData
        let related = response.related.split(",").map(Number)
        let artistName = response.artist
        let artistId = response.artistId
        let relatedArray = []
        for (let i = 0; i < related.length; i++) {
            for (let j = 0; j < artistInfo.length; j++)
                if (artistInfo[j].artistId === related[i]) { relatedArray.push(artistInfo[j]) }
        }

        relatedArray.sort((itema, itemb) => {
            const nameA = itema.artist.toLowerCase().replace(/^the\s+/, '');
            const nameB = itemb.artist.toLowerCase().replace(/^the\s+/, '');
            return nameA.localeCompare(nameB)
        })

        let relatedSet = new Set(relatedArray)
        let filteredRelated = ([...relatedSet])

        const relatedButtons = filteredRelated.map(this.mapRelated)

        this.setState((prevState) => {
            return {
                ...prevState,
                artistName: artistName,
                artistId: artistId,
                isEdit: true,
                related: filteredRelated,
                relatedButtons: relatedButtons
            }
        }
        )

    }
    mapRelated = (item) => {
        return <div className="col-8 mt-3" key={item.artistId}><Button className="mr-2" onClick={this.handleDeleteRelated} value={item.artistId} color="danger">X</Button>{item.artist}</div>
    }

    handleSubmit = () => {
        let id = this.state.artistId
        let related = this.state.related
        const mapRelated = (item) => { return item.artistId }
        const data = { artistId: id, related: related.map(mapRelated) }
        console.log(id, data)
        ArtistService.updatedRelatedArtists(data, this.updateRelatedArtistsSuccess, this.updateRelatedArtistsError)
    }

    updateRelatedArtists = (data) => {
        data.releases_id = this.state.albumInfo.releases_id
        ArtistService.updatedRelatedArtists(data, this.updateRelatedArtistsSuccess, this.updateRelatedArtistsError)
    }
    updateRelatedArtistsSuccess = (resp) => {
        console.log("Relatesd artist update successful", resp)
        this.props.history.push("/artists")
    }
    updateRelatedArtistsError = (err) => {
        console.log("THERE WAS AN ERROR IN YOUR UPDATE: ", err)
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {(this.state.isEdit === false)
                        ? <div align="left"><select id="artistToEdit" onChange={this.handleChange}><option>select artist...</option>{this.state.artistDropdown}</select></div>
                        : <div align="left">
                            <div className="fake-mackie-two">{this.state.artistName}</div>

                            <div className="black-nav-admin mt-3" align="left">{this.state.relatedButtons}</div>
                            <div className="mt-4 ml-2" align="left"><select id="artistToAdd" onChange={this.handleAddRelated}><option>add another artist... </option>{this.state.artistDropdown}</select></div>

                            <div className="mt-3">
                                <button type="submit" onClick={this.handleSubmit} className="btns">
                                    Submit
                                </button></div></div>}</div>
            </React.Fragment>
        )
    }
}

export default withRouter(RelatedArtists)