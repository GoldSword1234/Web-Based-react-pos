import React from 'react';

interface Station {
    id: number;
    name: string;
}

interface StationSelectorProps {
    stations: Station[];
    onSelect: (station: Station) => void;
}

const StationSelector: React.FC<StationSelectorProps> = ({ stations, onSelect }) => {
    return (
        <div>
            <h2>Select a Station</h2>
            <select onChange={(e) => onSelect(stations[Number(e.target.value)])}>
                <option value="">-- Select a Station --</option>
                {stations.map((station) => (
                    <option key={station.id} value={station.id}>
                        {station.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StationSelector;