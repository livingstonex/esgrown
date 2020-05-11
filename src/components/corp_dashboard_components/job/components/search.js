import React, { useEffect, useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const Search = () => {
    return (
        <>
            <InputGroup>
                <InputGroup.Prepend stryle={{ cursor: 'pointer' }}>
                    <Button style={{ background: 'lightgrey', color: 'white', border: 'none' }}>Search</Button>
                </InputGroup.Prepend>
                <FormControl
                    type="text"
                    placeholder="Search..."
                    aria-label="Search Job"
                    aria-describedby="btnGroupAddon"
                />
            </InputGroup>
        </>
    );
}

export default Search;