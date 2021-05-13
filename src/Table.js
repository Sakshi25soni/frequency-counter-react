import React, { useState } from "react";
//importing react and useState(for data saving after fetching text) from react.
import "./App.css";
//extra design
import axios from "axios";
//to fetch the content as promise return
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//to show alerts, used react-taostify

//Table Component(i.e. functional component)
const Table = () => {
  //initializing variables globally
  var x = 0;
  var arr1 = [];
  var arr2 = [];
  var final1 = [];
  var final2 = [];
  var z = 0;

  //using react hooks useState
  const [num, setNum] = useState();
  const [show1, setShow1] = useState([]);
  const [show2, setShow2] = useState([]);

  //onchange input field set the num value given by user
  const trigger = (e) => {
    setNum(e.target.value);
  };

  //onkeypress event by clicking enter(doing the same)
  function keytrack(e) {
    if (e.code === "Enter") {
      setit();
    }
  }

  //setit function where we fetching the content from link and computing every word's frequency
  //and saving them in two corresponding array
  //as one array to save frequency and other with respective element onsider only once.
  //slicing finally as a same frequency occurs many times the two big arrays(arr1,arr2) into (final1,final2).
  const setit = () => {
    axios
      .get("https://raw.githubusercontent.com/invictustech/test/main/README.md")
      .then(function (response) {
        const str = response.data;
        let pattern = /[^\/\s\-\.\,]+/gim;
        var result = str.match(pattern);
        var length = result.length;

        //frequency computing
        for (var i = 0; i < length; i++) {
          let start = result[0];
          var count = 0;
          for (var j = 0; j < length; j++) {
            if (result[j] === start) {
              count++;
            }
          }
          arr1[x] = count;
          arr2[x] = start;
          x++;

          length = result.length;
          result = result.filter((data) => data !== start);
          i = 0;
        }

        let high;
        let copy = arr1;

        //user input working is here(num)
        for (var l = 0; l < num; l++) {
          high = Math.max(...copy);

          for (var k = 0; k < arr1.length; k++) {
            if (arr1[k] === high) {
              final1[z] = arr2[k];
              final2[z] = high;
              z++;
            }
          }

          copy = copy.filter((data) => data !== high);
        }
        
        final1 = final1.slice(0, num);
        final2 = final2.slice(0, num);
        
        setShow1(final1);
        setShow2(final2);

        //total length for every word frequency array gives unique words length
        //a small help to the users
        if (num > arr1.length) {
          console.log(arr1.length);
          toast(`Only ${arr1.length} Unique Words Are Available!`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
//finally returning the component
//using bootstrap cdn to make this project responsive
//using array.map to dynamically repensent rows of words with it's frequency
//with according to user's input of N.
  return (
    <>
      <div className="design mb-3 fonts">
        <h2>Frequency Counter</h2>
      </div>
      <div className="row justify-content-center mb-2 mt-1">
        <div className="col-6">
          <div className="form-group mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Enter a Number"
              value={num}
              onChange={trigger}
              onKeyPress={keytrack}
            />
          </div>
          <div className="design">
            <button onClick={setit} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>

      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Word</th>
            <th scope="col">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {show1.map((value, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{value}</td>
              <td>{show2[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </>
  );
};

export default Table;
