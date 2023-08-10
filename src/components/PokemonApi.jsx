import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "react-bootstrap/Table";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js/auto";
import FilteredPokemon from "./FilteredPokemon";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedPokemons,
  selectedPokemons,
  setPokemons,
} from "../redux/actions/pokemonActions";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export const PokemonContext = createContext();

const PokemonApi = () => {
  const [showModal, setShowModal] = useState(true);
  const [showPrevSearch, setPrevSearch] = useState(false);
  const [pokemonName, setpokemonName] = useState("");
  const [searchSuggest, setSearchSuggest] = useState();
  const [choosedPokemon, setChoosedPokemon] = useState(false);
  const [pokemon, setPokemon] = useState({
    id: "",
    name: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
    specialattack: "",
    specialDefense: "",
    speed: "",
  });
  const initialFetchPokemon = useRef(pokemon);
  const dispatch = useDispatch();

  //converting object into arrays
  const propertyValues = Object.keys(pokemon);

  var data1 = {
    labels: [
      propertyValues[3],
      propertyValues[4],
      propertyValues[5],
      propertyValues[7],
      propertyValues[8],
      propertyValues[9],
    ],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "stats",
        data: [0, 20, 30, 40, 50],
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgb(100, 149, 237)",
          "rgb(100, 149, 237)",
          "rgb(100, 149, 237)",
        ],
        borderWidth: 2,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
      y: [
        {
          beginAtZero: true,
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 20,
            max: 100,
          },
        },
      ],
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  const pokymonState = useSelector((state) => state.allpokemons.pokemon);

  const renderListPokemon = pokymonState.map((data, id) => {
    return (
      <div
        className="displayPokemons d-flex justify-content-center align-items-center flex-column mt-5"
        key={data.id}
      >
        <h1 className="text-capitalize d-flex justify-content-start align-items-center">
          {data.name}
        </h1>
        <div className="position-relative">
          <button
            className="deleteButton position-absolute"
            type="submit"
            onClick={() => {
              dispatch(deletedPokemons(data.id));
            }}
          >
            X
          </button>
          <Table
            bordered
            style={{ boxShadow: "0 7px 29px 0 hsla(240,5%,41%,.2)" }}
            className="w-50"
          >
            <tbody>
              <tr>
                <td rowSpan={7} colSpan={5} className="p-4">
                  <img
                    src={data.image}
                    style={{ width: "330px" }}
                    className="pokeImage"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span className="fw-bold text-capitalize">Species:</span>
                  <span className="fw-light text-capitalize">
                    {data.species}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="fw-bold text-capitalize">Type:</span>
                  <span className="fw-light text-capitalize">{data.type}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="fw-bold text-capitalize">hp:</span>
                  <span className="fw-light text-capitalize">{data.hp}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="fw-bold text-capitalize">attack:</span>
                  <span className="fw-light text-capitalize">
                    {data.attack}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="fw-bold text-capitalize">defense:</span>
                  <span className="fw-light text-capitalize">
                    {data.defense}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <Bar
                    data={data1}
                    height={200}
                    options={options}
                    style={{ color: "blue" }}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  });

  //storing data in setPokemon and working on localStorage
  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        console.log(res);
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          species: res.data.species.name,
          image: res.data.sprites.other.dream_world.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          type: res.data.types[0].type.name,
          specialattack: res.data.stats[3].base_stat,
          specialDefense: res.data.stats[4].base_stat,
          speed: res.data.stats[5].base_stat,
        });

        var new_data = document.getElementById("typeText1").value;
        if (localStorage.getItem("pokemonName") == null) {
          localStorage.setItem("pokemonName", "[]");
        }
        console.log(new_data);
        var localsetData = JSON.parse(localStorage.getItem("pokemonName"));

        const DuplicatedIndex = localsetData.includes(new_data);

        let lenLocalsetData = localsetData.length - 1;
        if (DuplicatedIndex) {
          console.log("duplicate");
        } else if (lenLocalsetData > 3) {
          localsetData.pop();
          localsetData.slice(0, 2);
          localsetData.unshift(new_data);

          window.localStorage.setItem(
            "pokemonName",
            JSON.stringify(localsetData)
          );
        } else {
          localsetData.push(new_data);
          window.localStorage.setItem(
            "pokemonName",
            JSON.stringify(localsetData)
          );
        }
        setChoosedPokemon(true);
        setpokemonName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (pokemon !== initialFetchPokemon.current) {
      dispatch(setPokemons(pokemon));
    }
  }, [pokemon]);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setSearchSuggest(result.results);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }, []);

  // working of localstorage
  const getNameLocalStorage = () => {
    window.localStorage.getItem("pokemonName");
  };
  const localStorageData = window.localStorage.getItem("pokemonName");
  const allLocalStorageData = JSON.parse(localStorageData);

  //working on toastify
  const notify = async () => {
    try {
      const data = await (
        await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      ).json();
      const hasPokemonData = data.name;
      const message = hasPokemonData
        ? `found`
        : document.getElementById("typeText1").value == ""
        ? toast.error("Enter Pokemon Name")
        : toast.error("No Match Found");
      // toast.success(message);
    } catch (err) {
      console.log(`err: ${err.message}`);
    }
  };

  //suggestions values
  const handleChange = (value) => {
    console.log(value);
    getNameLocalStorage();
    setpokemonName(value);
    setPrevSearch(true);
  };

  // storing values to send using usingn useContext provider
  let ContextValue = {
    showPrevSearch,
    allLocalStorageData,
    pokemonName,
    searchSuggest,
    setPrevSearch,
    searchPokemon,
  };

  //working for dispatch
  // setting data in redux store

  //to close data and clear input
  const handleClose = () => {
    setpokemonName("");
    setShowModal(false);
    setPrevSearch(false);
  };

  const closeFilter = () => {
    if (document.getElementById("typeText1").value == "") {
      setPrevSearch(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="formContainer d-flex justify-content-center flex-column">
        <div className="position-relative ">
          <div className="divInputButton  p-2 title ">
            <div className="w-100 d-flex align-items-center justify-content-center gap-2 ">
              <form
                className="w-50  d-flex justify-content-center gap-2"
                id="formData"
                onSubmit={(e) => {
                  e.preventDefault();
                  searchPokemon();
                  notify();
                }}
              >
                <input
                  id="typeText1"
                  type="text"
                  value={pokemonName}
                  className="inputSearch inputFeild form-control form-control-lg"
                  autoComplete="off"
                  onChange={(e) => {
                    handleChange(e.target.value);
                    closeFilter();
                  }}
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary p-2 rounded-2 border-0"
                />
                <button
                  type="button"
                  className="btn btn-outline-danger "
                  onClick={handleClose}
                >
                  <i class="fa fa-refresh" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </div>

          {/* search component */}
          <PokemonContext.Provider value={ContextValue}>
            <FilteredPokemon />
          </PokemonContext.Provider>
        </div>
      </div>

      <>{renderListPokemon}</>
    </>
  );
};

export default PokemonApi;
