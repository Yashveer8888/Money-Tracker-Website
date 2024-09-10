import React from 'react';

function Item(props) {
  const { data, onDelete } = props; // Destructure props including onDelete (for delete action)

  const handleDelete = () => {
    if (onDelete) {
      onDelete(data._id); // Call the delete function passed from parent
    }
  };

  return (
    <div className='d-flex justify-content-around align-items-center'>
      <div>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div>{data.description}</div>
      <div>{data.amount}</div>
    </div>
  );
}

export default Item;
