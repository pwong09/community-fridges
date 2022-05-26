import { Icon } from '@iconify/react'
import "./LocationPin.css";

export default function LocationPin ({ text }) {
    return (
        <div className="pin">
        <Icon icon="fa-solid:map-marker-alt" width="30" className="pin-icon" />
        <p className="pin-text">{text}</p>
        </div>
    )
}