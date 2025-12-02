import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { icon, LatLngExpression } from "leaflet";
import L from "leaflet";
import { useLocation } from "react-router";

// npm install react@rc react-dom@rc leaflet
// npm install react-leaflet@next
// Typen
// npm install -D @types/leaflet

interface OwnerPosition {
  lat: number;
  lng: number;
}

interface AnimalsLocationMapProps {
  category: string;
  url: string;
}

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};

const AnimalsLocationMap = ({ category, url }: AnimalsLocationMapProps) => {
  // Prüfen ob sich Seite geändert hat
  const location = useLocation();
  // die Status
  const [animalspos, setAnimalsForMap] = useState([]);
  const [ownerPos, setOwnerPosForMap] = useState<OwnerPosition | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  console.log("category: ", category);
  console.log("url: ", url);

  //  const query = new URLSearchParams(location.search);
  //            const category = query.get("category") ?? "";

  // Daten des angemeldeten Users holen
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/auth/me`,
          { credentials: "include" }
        );
        const data = await res.json();
        setUserData(data); // data.user._id)
      } catch (error) {
        console.log(error);
      }
    };

    fetchMe();
  }, [location]);

  // Alle Tiere laden
  useEffect(() => {
    const fetchAnimalsForMap = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animalsmap`
        );
        const data = await res.json();
        const categoryFiltered = data.filter(
          (Tier: Animal) => Tier.category.toLowerCase() === category
        );
        if (categoryFiltered.length > 0) {
          console.log("if !category(else): ", categoryFiltered);
          setAnimalsForMap(categoryFiltered);
        } else {
          console.log("if !category: ", data);
          setAnimalsForMap(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimalsForMap();
  }, [category]);

  // Daten zu angemeldetem Benutzer holen
  useEffect(() => {
    if (!userData?.user._id) {
      return;
    }

    const fetchOwnerPosForMap = async () => {
      //      console.log("fetchOwnerPosForMap started.");
      try {
        //        const params = new URLSearchParams({ id: userData._id });
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/ownerformap`,
          { credentials: "include" }
        );
        const data = await res.json();
        setOwnerPosForMap(data[0]);
      } catch (error) {
        console.log("fetchOwnerPosForMap error: ", error);
      }
    };

    fetchOwnerPosForMap();
  }, [location, userData]);
  // Owner Position neu laden wenn sich User oder die URL(Kategorie) änderft

  // MarkerProps.position: LatLngExpression
  //  const position: LatLngExpression = [48.81615, 8.74748];
  // const position: LatLngExpression = ownerPos
  //   ? [ownerPos.lat, ownerPos.lng]
  //   : [48.81615, 8.74748];

  const position: LatLngExpression = [ownerPos?.lat, ownerPos?.lng];
  //  const animalpos: LatLngExpression = [48.81345, 8.74758];

  // console.log("animalspos: ", animalspos);

  const dogIcon = L.icon({
    iconUrl: "../img/Icon_Dog.png",

    iconSize: [82, 66], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  const catIcon = L.icon({
    iconUrl: "../img/Icon_Cat.png",

    iconSize: [82, 66], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  //  console.log("Zentrum: ", position);

  return (
    ownerPos && (
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
        }}
        center={position}
        attributionControl={true}
        zoom={0}
        minZoom={0}
        scrollWheelZoom={true}
      >
        <ComponentResize />
        <TileLayer
          // className={'ion-hide'}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        {animalspos.map((animal) => (
          <Marker
            position={[animal?.lat, animal?.lng]}
            icon={animal.category === "Hund" ? dogIcon : catIcon}
          >
            <Popup> Test</Popup>
          </Marker>
        ))}
        {/**
        <Marker position={animalpos} icon={dogIcon}>
          <Popup>
            Position animal 1. <br />
          </Popup>
        </Marker> 
 */}
      </MapContainer>
    )
  );
};
export default AnimalsLocationMap;
