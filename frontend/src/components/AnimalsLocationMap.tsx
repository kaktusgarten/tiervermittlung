import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { icon, LatLngExpression } from "leaflet";
import L from "leaflet";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context";

// npm install react@rc react-dom@rc leaflet
// npm install react-leaflet@next
// Typen
// npm install -D @types/leaflet

interface OwnerPosition {
  lat: number;
  lng: number;
}

interface AnimalsLocationMapProps {
  search: string;
  //  url: string;
}

interface AnimalForMap {
  lat: number;
  lng: number;
  category: string;
}

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};

const AnimalsLocationMap = ({ search }: AnimalsLocationMapProps) => {
  // Prüfen ob sich Seite geändert hat
  const location = useLocation();

  const [animalspos, setAnimalsForMap] = useState<AnimalForMap>([]);
  const [ownerPos, setOwnerPosForMap] = useState<OwnerPosition | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const { user, signedIn } = useAuth();

  //  const params = new URLSearchParams(search);

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const navigate = useNavigate();

  const fetchMe = useCallback(async () => {
    try {
      if (!signedIn) {
        setUserData(null);
      } else {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/auth/me`,
          { credentials: "include" }
        );
        const data = await res.json();
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe, location]);

  // Alle Tiere laden
  const fetchAnimalsForMap = useCallback(async () => {
    try {
      const query = params.toString();
      const url = query
        ? `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animalsmap?${query}`
        : `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animalsmap`;

      const res = await fetch(url);
      const data = await res.json();
      setAnimalsForMap(data);
    } catch (error) {
      console.log(error);
    }
  }, [params]);

  useEffect(() => {
    fetchAnimalsForMap();
  }, [fetchAnimalsForMap]);

  // Daten zu angemeldetem Benutzer holen
  const fetchOwnerPosForMap = useCallback(async () => {
    if (!userData?.user._id) {
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/ownerformap`,
        { credentials: "include" }
      );
      const data = await res.json();
      setOwnerPosForMap(data[0]);
    } catch (error) {
      console.log("fetchOwnerPosForMap error: ", error);
    }
  }, [userData]);

  useEffect(() => {
    fetchOwnerPosForMap();
  }, [fetchOwnerPosForMap]);

  const position: LatLngExpression | undefined = useMemo(() => {
    if (!ownerPos) {
      return [51.163, 10.447];
    }
    return [ownerPos.lat, ownerPos.lng];
  }, [ownerPos]);

  const dogIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "../img/Icon_Dog.png",
        iconSize: [82, 66], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      }),
    []
  );

  const catIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "../img/Icon_Cat.png",

        iconSize: [82, 66], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      }),
    []
  );

  // === Marker versetzen, wenn sie gleiche Koordinaten haben ===

  // Tiere nach Koordinaten gruppieren
  const offsetMarkers = useMemo(() => {
    const grouped = animalspos.reduce((acc, animal) => {
      const key = `${animal.lat}_${animal.lng}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(animal);
      return acc;
    }, {} as Record<string, AnimalForMap[]>);

    return Object.values(grouped).flatMap((group) => {
      if (group.length === 1) return group;

      const offsetRadius = 0.0001;

      return group.map((animal, index) => {
        const angle = (index / group.length) * 2 * Math.PI;
        return {
          ...animal,
          lat: animal.lat + Math.cos(angle) * offsetRadius,
          lng: animal.lng + Math.sin(angle) * offsetRadius,
        };
      });
    });
  }, [animalspos]);

  if (!position) {
    return null;
  }

  return (
    <div className="h-120 mb-6">
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
        }}
        center={position}
        zoom={0}
        minZoom={5}
        scrollWheelZoom={true}
      >
        <ComponentResize />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <Marker position={position}>
          <Popup>Du bist hier</Popup>
        </Marker> */}

        {offsetMarkers.map((animal) => (
          <Marker
            position={[animal.lat, animal.lng]}
            eventHandlers={{
              click: () => navigate(`/details/${animal._id}`),
            }}
          >
            <Popup>{animal.category}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default AnimalsLocationMap;
