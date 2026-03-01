import { useEffect } from "react";
import { useMap } from "react-leaflet"

function RecenterMap({ position }) {
    const map = useMap();

    useEffect(() => {
        map.setView(position)
    }, [position])
    
    return null
}

export default RecenterMap