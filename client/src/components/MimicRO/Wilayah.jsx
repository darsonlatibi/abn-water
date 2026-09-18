import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getWilayah,
  getKab,
  getKec,
  getKel,
} from "../../features/wilayahSlide.js";

import DropdownSvg from "./utilsSvg/DropdownSvg.jsx";

export default function Wilayah({ x = 0, y = 0 }) {
  const dispatch = useDispatch();

  const provinces = useSelector((state) => state.wilayah.provinces);
  const regencies = useSelector((state) => state.wilayah.regencies);
  const districts = useSelector((state) => state.wilayah.districts);
  const villages = useSelector((state) => state.wilayah.villages);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  useEffect(() => {
    dispatch(getWilayah());
  }, [dispatch]);

  return (
    <g transform={`translate(${x},${y})`}>
      {/* PROVINSI */}
      <DropdownSvg
        x={0}
        y={0}
        width={250}
        title="PROVINSI"
        items={provinces}
        value={selectedProvince}
        onChange={(item) => {
          setSelectedProvince(item.id);

          setSelectedRegency("");
          setSelectedDistrict("");
          setSelectedVillage("");

          dispatch(
            getKab({
              id: item.id,
            }),
          );
        }}
      />

      {/* KABUPATEN */}
      <DropdownSvg
        x={0}
        y={60}
        width={250}
        title="KABUPATEN"
        items={regencies}
        value={selectedRegency}
        onChange={(item) => {
          setSelectedRegency(item.id);

          setSelectedDistrict("");
          setSelectedVillage("");

          dispatch(
            getKec({
              id: item.id,
            }),
          );
        }}
      />

      {/* KECAMATAN */}
      <DropdownSvg
        x={0}
        y={120}
        width={250}
        title="KECAMATAN"
        items={districts}
        value={selectedDistrict}
        onChange={(item) => {
          setSelectedDistrict(item.id);

          setSelectedVillage("");

          dispatch(
            getKel({
              id: item.id,
            }),
          );
        }}
      />

      {/* KELURAHAN */}
      <DropdownSvg
        x={0}
        y={180}
        width={250}
        title="KELURAHAN"
        items={villages}
        value={selectedVillage}
        onChange={(item) => {
          setSelectedVillage(item.id);
        }}
      />
    </g>
  );
}
