import React from 'react';

const Searchbar = ({ title, state, setState }) => {
    return (
        <div className='Page__section--small searchbar col fw'>
            <h1>Search for {title} in 美团...</h1>

            <input type='text' placeholder='e.g. lorem ipsm...' value={state} onChange={e => setState(e.target.value)}/>
        </div>
    )
}

export default Searchbar;