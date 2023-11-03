import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../actions/dataActions';
import axios from 'axios';

function Form() {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState('');
  const [noBarang, setNoBarang] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [harga, setHarga] = useState(''); 
  const [diskon, setDiskon] = useState('');
  const [total, setTotal] = useState('');
  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    // Mengambil data Employee dari API
    axios.get('https://financed.4netps.co.id/ujian/employee')
      .then((response) => {
        setEmployeeOptions(response.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data Employee: ' + error);
      });
  }, []);

  // Menggunakan useEffect untuk menghitung kolom "Total" secara otomatis
  useEffect(() => {
    if (harga !== '' && diskon !== '') {
      const hargaFloat = parseFloat(harga);
      const diskonFloat = parseFloat(diskon);
      const totalValue = hargaFloat - (diskonFloat / 100) * hargaFloat;
      setTotal(totalValue.toFixed(2));
    }
  }, [harga, diskon]);

  const handleSave = () => {
    dispatch(addData({ employee, noBarang, namaBarang, harga, diskon, total }));
  };

  return (
    <div className="form-container">
      <div className="form-row">
        <div className="form-col">
          <label htmlFor="employee" style={{marginRight: "35px"}}>Employee:</label>
          <select id="employee" onChange={(e) => setEmployee(e.target.value)} value={employee}>
            <option value="">Pilih Employee</option>
            {employeeOptions.map((option) => (
              <option key={option.ID} value={option.NAME}>
                {option.NAME}
              </option>
            ))}
          </select>
        </div>
        <br/>
        <div className="form-col mb">
          <label htmlFor="noBarang" >No Barang:</label>
          <input type="text" id="noBarang" value={noBarang} readOnly />
        </div>
        <br/>
        <div className="form-col">
          <label htmlFor="namaBarang" >Nama Barang:</label>
          <input type="text" id="namaBarang" value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)} />
        </div>
        <br/>
        <div className="form-col">
          <label htmlFor="harga">Harga:</label>
          <input type="number" id="harga" value={harga} onChange={(e) => setHarga(e.target.value)} />
          <label htmlFor="diskon">Diskon (%):</label>
          <input type="number" id="diskon" value={diskon} onChange={(e) => setDiskon(e.target.value)} />
        </div>
        <br/>
        <div className="form-col">
          <label htmlFor="total">Total:</label>
          <input type="text" id="total" value={total} readOnly />
        </div>
      </div>
      <br/>
      <button onClick={handleSave} className ="btn btn-primary">Save</button>
    </div>
  );
}

export default Form;
