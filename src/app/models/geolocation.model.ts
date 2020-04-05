export interface IGeoLocation {
    coords: {
        accuracy?: number;
        altitude?: any;
        altitudeAccuracy?: any;
        heading?: any;
        latitude: number;
        longitude: number;
        speed?: any;
        timestamp?: number;
    };
}

export interface IGeoLocationOptions {
    enableHighAccuracy: boolean;
    timeout: number;
    maximumAge: number;
}

export interface IGeolocationError {
    code: number;
}
