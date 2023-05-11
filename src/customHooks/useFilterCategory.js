import { useEffect, useState } from "react";
import axios from "axios";

function useFilterCategory() {
  const [domainArr, setDomainArr] = useState([]);
  const [genderArr, setGenderArr] = useState([]);

  async function fetchData() {
    const response = await axios.get("/data.json");
    let data = response.data;

    // Domains
    const domains = data.map((card) => card.domain); // push all domains to the array
    const domainSet = new Set(domains); // create unique set of domains
    setDomainArr(Array.from(domainSet)); // create array from set

    // Gender
    const genders = data.map((card) => card.gender); // // push all genders to the array
    const genderSet = new Set(genders); // create unique set of genders
    setGenderArr(Array.from(genderSet)); // create array from set
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { domainArr, genderArr };
}

export default useFilterCategory;
