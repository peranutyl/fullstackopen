import React from 'react'
const Filter = ({value, onChange}) => {
    return(
    <div>filter for<input value={value} onChange={onChange}></input></div>
    )
}

export default Filter