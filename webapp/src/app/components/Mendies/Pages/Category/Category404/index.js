import React from 'react';
import Template from 'components/Mendies/Template';

export default ({ className, title }) => (
    <Template title={title} className={className}>
        <main className={'main-content px-20'} role='main'>
            <h1 className={'mb-10 mt-md-20 mt-lg-20 center left-md'}>
                404 <span className={'px-10'}>/</span> Page not found
            </h1>
        </main>
    </Template>
);
