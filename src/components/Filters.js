import React from "react";
import useFilterCategory from "../customHooks/useFilterCategory";

function Filters(props) {
  // Filter categories
  const { domainArr, genderArr } = useFilterCategory();

  return (
    <>
      <h3>Filters</h3>
      <select
        name="domain"
        id=""
        onChange={(e) => props.setSelectedDomain(e.target.value)}
      >
        <option value="">Domain</option>
        {domainArr.map((domain, id) => {
          return (
            <option key={id} value={domain}>
              {domain}
            </option>
          );
        })}
      </select>
      <select
        name="gender"
        id=""
        onChange={(e) => props.setSelectedGender(e.target.value)}
      >
        <option value="">Gender</option>
        {genderArr.map((gender, id) => {
          return (
            <option key={id} value={gender}>
              {gender}
            </option>
          );
        })}
      </select>
      <select
        name="availability"
        id=""
        onChange={(e) => props.setSelectedAvailability(e.target.value)}
      >
        <option value="">Availability</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </>
  );
}

export default Filters;
