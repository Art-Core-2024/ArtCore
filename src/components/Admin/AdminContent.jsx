import React from 'react';
import ManageArtworks from './Manage/ManageArtworks';
import ManageAdmins from './Manage/ManageAdmins';
import ManageOrders from './Manage/ManageOrders';
import ViewUsers from './Manage/ViewUsers';

const AdminContent = ({ activePanel }) => {
    // Render content based on the active panel
    const renderContent = () => {
        switch (activePanel) {
            case 'artworks':
                return <ManageArtworks />;
            case 'admins':
                return <ManageAdmins />;
            case 'orders':
                return <ManageOrders />;
            case 'users':
                return <ViewUsers />;
            default:
                return '';
        }
    };

    return (
        <div className='px-3 pt-20 lg:p-10 pb-3 h-full w-full'>
            {renderContent()}
        </div>
    );
};

export default AdminContent;