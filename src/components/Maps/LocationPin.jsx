import { Icon } from '@iconify/react'
import "./LocationPin.css";


export default function LocationPin ({ text, id }) {
    return (
        <div className="pin">
        <a href={`#${id}`}><Icon icon="fa-solid:map-marker-alt" width="30" className="pin-icon" /></a>
        <p className="pin-text">{text}</p>
        </div>
    )
}