import React, { useState } from 'react'
import '../ipecac.css'
import { Modal, ModalBody } from 'reactstrap'
import moment from 'moment'
import BandcampPlayer from 'react-bandcamp'
import { Link, withRouter } from "react-router-dom";

function SingleAlbum(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)

    let date = moment(props.releaseDate)
    let dateDisplay = moment(props.releaseDate).format("MMMM D, YYYY")
    let dateOut = moment(props.releaseDate).format("MMMM Do")
    let now = moment()
    let coverThumb = `http://assets.ipecac.com/images/releases/${props.cat}t.jpg`
    let coverFull = `http://assets.ipecac.com/images/releases/${props.cat}.jpg`

    return (
        <React.Fragment>
                <div className="card border-0 my-3">
                    <img onClick={toggle} src={coverThumb} alt="album art" className="d-block mx-auto mx-sm-0 pointer album-cover" />
                    <div className="d-block mx-auto mx-sm-0 name pointer" >
                        <Link 
                        key={props.artistId}
                        to={`/artists/${props.slug}`} 
                        >{props.artist}</Link></div>
                        <div className="d-block mx-auto mx-sm-0 album">{props.title}</div>

                        {(date >= now) ? <div className="coming-soon d-block mx-auto mx-sm-0">{dateOut}</div> : null}
                    </div>

            <Modal isOpen={modal} toggle={toggle} size="xl" autoFocus={true}>
                <ModalBody>
                    <div className="row">
                        <div className="ml-4"><img src={coverFull} alt="album art" width="300px" /></div>

                        <div className="ml-4">
                            <div className="name-modal"><Link 
                            key={props.artistId}
                            to={`/artists/${props.slug}`} 
                            >{props.artist}</Link></div>
                            <div className="album-modal">{props.title}</div>

                          {!props.cat.includes("RR") ?
                            <div className="info-modal">Catalog No.: IPC-{props.cat}</div>
                            : <div className="info-modal">Catalog No.: {props.cat}</div>
                            }
                           
                            <div className="info-modal">Release Date: {dateDisplay}</div>

                            {props.bcId ? 
                            <div><div className="name-modal mt-3">LISTEN:</div>
                            <div><BandcampPlayer album={props.bcId} size="small" height="50px"/></div></div>
                                : null
                            }
                            
                            {props.url ? 
                            <div className="name-modal mt-2"><a href={props.url} rel="noopener noreferrer" target="_blank">Purchase/Stream</a></div>
                              : null                         
                            }
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment >
    )
}
export default withRouter(SingleAlbum)