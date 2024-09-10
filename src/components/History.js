import React, { useContext, useEffect } from 'react';
import contexttran from '../context/Addtran';
import Item from './Item';

function History(props) {
    const { getTran, history, deletetran } = useContext(contexttran);

    useEffect(() => {
        if (getTran) {
            getTran();
        }
    }, [getTran]);

    const handleDelete = (id) => {
        if (deletetran) {
            deletetran(id);
        }
    };

    return (
        <div>
            {history && history.length === 0
                ? 'No History to display'
                : history.map((data) => (
                    <Item key={data._id} data={data} onDelete={handleDelete} />
                ))
            }
        </div>
    );
}

export default History;
