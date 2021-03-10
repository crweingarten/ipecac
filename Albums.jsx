import React from 'react'
import SingleAlbum from './SingleAlbum'

function Albums(props) {

    let albums = props.albums

    const mapAlbums = (album) => (<SingleAlbum
        key={album.cat}
        artist={album.artists.artist}
        title={album.title}
        cat={album.cat}
        releaseDate={album.releaseDate}
        url={album.buyUrl}
        bcId={album.bcId}
        slug={album.artists.slug}
    />)


    const mappedAlbums = albums.map(mapAlbums)

    return (
        <div className="mx-3">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">{mappedAlbums}</div></div>)
}

export default Albums
