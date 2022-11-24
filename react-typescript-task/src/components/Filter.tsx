import React, {useEffect, useState} from "react";
import { VehicleTypeSelect } from './VehicleTypeSelect';
import { VehicleApi } from './../data/vehicles/api';
import { Vehicle, VehicleType } from "../data/vehicles/contracts";
import { VehicleFilter } from '../data/vehicles/contracts';

interface FilterProps {
    setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>
}

export const Filter: React.FC<FilterProps> = ({setVehicles}) => {
    const [vehicleName, changeVehicleName] = useState<string>('');
    const [vehicleType, changeVehicleType] = useState<VehicleType>(-1);

    useEffect(() => {
        const filteredVehicle: VehicleFilter = {
            title: vehicleName,
            type: vehicleType
        }

        const data = VehicleApi.search(filteredVehicle);
        setVehicles(data);
    }, [vehicleName, vehicleType]);

    const toUpperFirstLetter = (str: string) => {
        if (str != '') {
            str = str[0].toLocaleUpperCase() + str.slice(1);
        }
        return str
    }

    return (
        <div>
            <input type="text" value={toUpperFirstLetter(vehicleName)} onChange={(e) => changeVehicleName(e.target.value)} />
            <VehicleTypeSelect value={vehicleType} onChange={(type) => changeVehicleType(type as VehicleType)} />
        </div>
    );
}