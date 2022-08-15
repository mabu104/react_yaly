import React from 'react';
import Site from './site'

const Sites = ({ sites }) => {
    return (
        <section>
            <div>
                {sites.map((site) => {
                    //return <div> {site.shoP_NAME}</div>;
                    return <Site key={site.siteID} {...site} />;
                })}
            </div>
        </section>
    );
};

export default Sites;