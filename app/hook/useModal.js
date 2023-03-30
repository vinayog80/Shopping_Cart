import { useState } from 'react';

export const useModalSource = () => {
    const [isSortModal, setIsSortModal] = useState(false);
    const handleSortModal = () => setIsSortModal(!isSortModal);

    return { isSortModal, setIsSortModal, handleSortModal };
}