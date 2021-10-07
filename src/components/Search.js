import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import SearchResult from './SearchResult';

const searchBar = {
    marginLeft: "30em",
    marginTop: "2em",
    display: "flex"
};

const sesarchResultItem = {
    margin: "2%",
    display: "flex",
    flexDirection: "column"
};


const Search = () => {
    const [searchKey, setSearchKey] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async (key) => {
        console.log("varaible test", `${process.env.REACT_APP_API_ENDPOINT}/search`);
        try {
            let params = { key };
            let res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/search`, { params });
            console.log(res.data);
            setData(res.data);
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    };
    console.log(searchKey);
    return (
        <div style={{ width: "100%" }}>
            <form style={searchBar} onSubmit={event => {
                event.preventDefault();
                if (searchKey) {
                    setLoading(true);
                    getData(searchKey);
                }
            }} noValidate autoComplete="off">
                <TextField value={searchKey} onChange={(event) => setSearchKey(event.target.value)} id="outlined-basic" label="Search" variant="outlined" style={{ width: '400px', marginRight: "5px" }} /> <button type="button" onClick={() => {
                    setSearchKey('');
                    setData([]);
                }
                } >Clear</button>
            </form>
            <div style={{ display: "flex", width: "100%", justifyContent: "center", margin: "5px" }}>{loading ? <p >loading...</p> : (<div style={{ display: "flex" }}>
                {data.length ? (
                    <div style={sesarchResultItem}> {data.map((dataElement, idx) => {
                        return (
                            <SearchResult style={{ margin: "2%" }} key={idx} dataElement={dataElement} />
                        );
                    })} </div>
                ) : <div><h3>No Records</h3></div>}
            </div>)}</div>

        </div>
    );
};



export default Search;