import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import SearchResult from './SearchResult';

const searchBar = {
    marginLeft: "185%",
    marginTop: "10%"
};

const sesarchResultItem = {
    margin: "2%",
    display: "grid",
    gap: " 1rem",
    gridAutoFlow: "column",
    gridTemplateColumns: "repeat(auto-fit, minmax(min-content, 1fr))"
}


const Search = () => {
    const [searchKey, setSearchKey] = useState('');
    const [data, setData] = useState([]);

    const getData = async (key) => {
        let res = await axios.get('https://rcfqabqwb3.execute-api.us-east-2.amazonaws.com/search?key=sahil', {
            headers: {
                key
            }
        });
        console.log(res.data);
        setData(res.data);
    }

    useEffect(() => {
        if (searchKey) {
            getData(searchKey)
        }
    }, [searchKey])
    console.log(searchKey);
    return (
        <div style={{ width: 400 }}>
            <form style={searchBar} noValidate autoComplete="off">
                <TextField onChange={event => setSearchKey(event.target.value.trim())} id="outlined-basic" label="Search" variant="outlined" style={{ width: '400px' }} />
            </form>
            <div>
                {data.length ? (
                    <div style={sesarchResultItem}> {data.map((dataElement, idx) => {
                        return (
                            //   <div key={idx} ><pre>{JSON.stringify(dataElement,null,2)}</pre></div>
                            <SearchResult key={idx} dataElement={dataElement} />
                        )
                    })} </div>
                ) : <div>no results</div>}
            </div>
        </div>
    );
}



// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// { title: 'The Shawshank Redemption', year: 1994 }

export default Search;