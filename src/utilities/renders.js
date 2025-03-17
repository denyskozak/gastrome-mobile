import {CountryList} from "../components/atomic/country-flag/country-flag.list";
import {CountryFlag} from "../components/atomic/country-flag/country-flag.component";
import React from "react";
import {filterIcons} from "../constants/filters";

export const addSpaceBefore = (value) => value ? ` ${value}` : '';
export const addSpaceWithCondition = (value, condition) => condition ? addSpaceBefore(value) : '';


// Filters
const filtersFlatObject = filterIcons.reduce((store, item) => ({...store, ...item}));
export const renderFilterIcon = value => CountryList.includes(value)
    ? <> <CountryFlag name={value} size={14}/></>
    : <> {filtersFlatObject[value]}</>;