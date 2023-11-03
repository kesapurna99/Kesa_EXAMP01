import React from 'react';
import { useSelector } from 'react-redux';

function DataTable() {
  const data = useSelector((state) => state.data);

  return (
    <table className="table table-bordered table-striped">
      <thead className="thead-primary">
        <tr>
          <th>Employee</th>
          <th>No Barang</th>
          <th>Nama Barang</th>
          <th>Harga</th> 
          <th>Diskon</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.employee}</td>
            <td>{item.noBarang}</td>
            <td>{item.namaBarang}</td>
            <td>{item.harga}</td> 
            <td>{item.diskon}</td>
            <td>{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
