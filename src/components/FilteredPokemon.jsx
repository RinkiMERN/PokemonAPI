import React, { useContext } from "react";
import { PokemonContext } from "./PokemonApi";

const FilteredPokemon = ({ ...props }) => {
  const {
    showPrevSearch,
    allLocalStorageData,
    pokemonName,
    searchSuggest,
    setPrevSearch,
    searchPokemon,
  } = useContext(PokemonContext);

  //to close parent div
  const closeParentDiv = function () {
    var getDiv = document.getElementById("searchbtn");
    getDiv.previousElementSibling.remove();
    getDiv.remove();
  };
  return (
    <div>
      <div
        id="localDataContainer"
        className="localDataContainer d-flex justify-content-start align-items-start  p-1  position-absolute"
      >
        {showPrevSearch && (
          <>
            <div id="prevSearch" className="prevSearch px-2 position-absolute ">
              {allLocalStorageData &&
                allLocalStorageData.map((x, i) => (
                  <li key={i.id} style={{ listStyle: "none" }}>
                    <div
                      className="d-flex justify-content-between align-items-center"
                      id="searchDiv"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="pe-auto">
                        <button type="button" className="btn">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                        </button>
                        <span id="localData">{x}</span>
                      </div>

                      <button
                        type="button"
                        id="searchbtn"
                        className="clearButton border-0"
                        onClick={closeParentDiv}
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
              <ul>
                {searchSuggest &&
                  searchSuggest
                    .filter((val) => {
                      if (pokemonName === "") {
                        return val.name;
                      } else if (
                        val.name
                          .toLowerCase()
                          .includes(pokemonName.toLowerCase())
                      ) {
                        return val.name;
                      }
                    })
                    .map((item) => (
                      <li key={item.id} style={{ listStyle: "none" }}>
                        <div
                          className="d-flex justify-content-between"
                          id="searchDiv1"
                          style={{ cursor: "pointer" }}
                        >
                          <button
                            type="submit"
                            className="pe-auto w-100 d-flex justify-content-start align-items-center border-0 searchButton"
                            onClick={() => {
                              searchPokemon();
                              setPrevSearch(!showPrevSearch);
                            }}
                          >
                            <button type="button" className="btn fa fa-search">
                             
                            </button>
                            

                            <span id="localData" className="fw-bold">
                              {pokemonName
                                .trim("")
                                .split("")
                                .join("")
                                .toLowerCase()}
                            </span>
                            {item.name.substring(
                              pokemonName
                                .trim()
                                .split(" ")
                                .join("-")
                                .toLowerCase().length
                            )}
                            
                          </button>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
            <br></br>
          </>
        )}
      </div>
    </div>
  );
};

export default FilteredPokemon;
