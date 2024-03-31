import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";


import DataTable from "../UI/DataTable";

import Paginator from "../UI/paginator";




function Services() {

  
 

 
  // To remove token from session storage;

  return (
    <div >

      <DataTable
        renderPaginator={() => <>
          <Paginator
          
          /></>} />

      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">


          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
