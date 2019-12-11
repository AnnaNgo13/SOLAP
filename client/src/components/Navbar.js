import React from "react";
import { useState } from "react";
import { FilterConsumer } from "./FilterContextProvider";
import { Box } from "grommet";
import logo from "./che_long.png";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const NavbarContainer = styled(Box)`
  height: 50px;
  width: 100%;
  background-color: #acddde;
`;

const Navbar = () => {
  const [year, setYear] = useState("[Year]");
  const [area, setArea] = useState("[Geographic Unit]");
  return (
    <NavbarContainer pad="small">
      <Grid container>
        <Grid item xs={6}>
          <div>
            <img
              src={logo}
              alt="Logo"
              style={{ height: "30px", verticalAlign: "top" }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          Mapping: {year} for {area}
        </Grid>
      </Grid>
      <FilterConsumer>
        {({
          filterFields,
          filterValues,
          handleInputChange,
          handleColorChange,
          clearFilter
        }) =>
          Object.entries(filterValues).map(([name, obj]) => {
            if (obj !== null && name === "Geographic Unit") {
              setArea(obj.value);
            } else if (obj !== null && name === "Time Period") {
              setYear(obj.value);
            }
          })
        }
      </FilterConsumer>
    </NavbarContainer>
  );
};

export default Navbar;
