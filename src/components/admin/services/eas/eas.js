import React from 'react';
import EASlog from '../components/content_log';
import EASnewContent from '../components/new_content';



const EAS = () => {
    return (
        <>
        <div className="container">
            <div className="row">
                <EASlog />
                <EASnewContent />
            </div>
        </div>
        </>
    );
}
export default EAS;