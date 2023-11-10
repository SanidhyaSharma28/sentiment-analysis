import React from 'react'
import { Link } from 'react-router-dom';
const Newsitem = (props) => {

    const maxTitleLength = 40; // Set your desired character limit

    const truncatedTitle = props.title.length > maxTitleLength
        ? `${props.title.slice(0, maxTitleLength)}...`
        : props.title;
    return (
        <div className='my-3'>
            <div className="card">
                <div style={{ justifyContent: 'flex-end', right: '0', position: 'absolute', display: 'flex' }}>
                    <span className="badge rounded-pill bg-danger" >
                        {props.source}
                    </span>
                </div>
                <img
                    src={!props.imgUrl ? "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" : props.imgUrl}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "200px" }} // Adjust the height as needed
                />

                <div className="card-body" >
                    <h5 className="card-title">{truncatedTitle}</h5>

                    <p className="card-text">{props.description}...</p>
                    <p className="card-text"><small className='="text-muted>'> Date: {new Date(props.date).toGMTString()}</small></p>
                    <Link to={props.newsUrl} target='_blank' className={`btn btn-sm btn-${props.mode === 'dark' ? 'primary' : 'dark'}`}>Read More</Link>
                </div>
            </div>
        </div>
    )

}

export default Newsitem
