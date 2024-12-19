import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, Autocomplete } from "@react-google-maps/api";
import './styl.css';
const mapStyles = [
    {
        "elementType": "geometry",
        "stylers": [
            { "color": "#1d2c4d" }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#8ec3b9" }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            { "color": "#1a3646" }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#4b6878" }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#64779e" }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#4b6878" }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#334e87" }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            { "color": "#023e58" }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            { "color": "#283d6a" }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#6f9ba5" }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "color": "#1d2c4d" }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#023e58" }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#3C7680" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            { "color": "#304a7d" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#98a5be" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "color": "#1d2c4d" }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            { "color": "#2c6675" }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#255763" }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#b0d5ce" }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "color": "#023e58" }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#98a5be" }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "color": "#1d2c4d" }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#283d6a" }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            { "color": "#3a4762" }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            { "color": "#0e1626" }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#4e6d70" }
        ]
    }
];
const mapContainerStyle = {
    height: "100vh",
    width: "100%"
};

const center = {
    lat: -25.877626,
    lng: 29.236497,
};

const libraries = ["places"];

const Oop = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [directions, setDirections] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionCourse, setSelectedOptionCourse] = useState('');
    const autocompleteRef = useRef(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }, []);

    useEffect(() => {

        if (selectedOption === 'ICT' && ['Computer Science 1st', 'Computer Science 2nd', 'Computer Science 3rd'].includes(selectedOptionCourse)) {
            setDestination({
                lat: -25.877694,
                lng: 29.235076
            });
        }
        else if(selectedOption === 'Engineering & Built Environment' && ['HCert Electrical', 'NDip Electrical', 'Beng Electrical'].includes(selectedOptionCourse)){
            setDestination({
                lat: -25.876980,
                lng: 29.236448
            });
        }
        else if(selectedOption === 'Management Science' && ['NDip Enterpreneurship 1st','NDip Enterpreneurship 2nd','NDip Enterpreneurship 3rd','Dip Admin 1st', 'Dip Admin 2nd', 'Dip Admin 3rd'].includes(selectedOptionCourse)){
            setDestination({
                lat: -25.878757, 
                lng: 29.235638
            });
        }

    }, [selectedOption, selectedOptionCourse]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleChangeCourse = (event) => {
        setSelectedOptionCourse(event.target.value);
    };

    const handlePlaceChanged = () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            setDestination({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
        }
    };

    const onLoad = useCallback((autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    }, []);

    const onDirectionsCallback = useCallback((result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
        } else {
            console.error(`Error fetching directions: ${result}`);
        }
    }, []);

    useEffect(() => {
        if (currentLocation && destination) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng),
                    destination: new window.google.maps.LatLng(destination.lat, destination.lng),
                    travelMode: window.google.maps.TravelMode.DRIVING
                },
                onDirectionsCallback
            );
        }
    }, [currentLocation, destination, onDirectionsCallback]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyBc9E7rU3j1m5PdB0Xxf5mBXNWzR6pOI94" libraries={libraries}>
            <div id="map-container">
                <center>
                    <div className="overlay">
                        <h1 className="textOops">
                            Oops
                        </h1>
                        <div className="contact-buttons">
                            <Autocomplete
                                onLoad={onLoad}
                                onPlaceChanged={handlePlaceChanged}
                            >
                                <input
                                    className="contact-button"
                                    placeholder="Search Location"
                                />
                            </Autocomplete>
                        </div>
                        <div className="faculty">
                        <p style={{fontSize:'30px',color:'#A020F0'}}>Faculty</p>
                            <select className="contact-button" value={selectedOption} onChange={handleChange}>
                                <option value=''>Select Faculty</option>
                                <option value='ICT'>ICT</option>
                                <option value='Engineering & Built Environment'>Engineering & Built Environment</option>
                                <option value='Management Science'>Management Science</option>
                            </select>
                        </div>
                        {selectedOption === 'ICT' ? (
              <div className="course">
                <p style={{fontSize:'30px',color:'#A020F0'}}>Course</p>
                <select className="contact-button" value={selectedOptionCourse} onChange={handleChangeCourse}>
                  <option value=''>Select Course</option>
                  <option value='Computer Science 1st'>Computer Science 1st year</option>
                  <option value='Computer Science 2nd'>Computer Science 2nd year</option>
                  <option value='Computer Science 3rd'>Computer Science 3rd year</option>
                </select>
              </div>
            ) : selectedOption === 'Engineering & Built Environment' ? (
              <div className="course">
                <p style={{fontSize:'30px',color:'#A020F0'}}>Course</p>
                <select className="contact-button" value={selectedOptionCourse} onChange={handleChangeCourse}>
                  <option value=''>Select Course</option>
                  <option value='HCert Electrical'>HCert Electrical</option>
                  <option value='NDip Electrical'>NDip Electrical</option>
                  <option value='Beng Electrical'>Beng Electrical</option>
                </select>
              </div>
            ) : selectedOption === 'Management Science' ? (
              <div className="course">
                <p style={{fontSize:'30px',color:'#A020F0'}}>Course</p>
                <select className="contact-button" value={selectedOptionCourse} onChange={handleChangeCourse}>
                  <option value=''>Select Course</option>
                  <option value='Dip Admin 1st'>Dip Admin 1st</option>
                  <option value='Dip Admin 2nd'>Dip Admin 2nd</option>
                  <option value='Dip Admin 3rd'>Dip Admin 3rd</option>
                  <option value='NDip Enterpreneurship 1st'>NDip Enterpreneurship 1st</option>
                  <option value='NDip Enterpreneurship 2nd'>NDip Enterpreneurship 2nd</option>
                  <option value='NDip Enterpreneurship 3rd'>NDip Enterpreneurship 3rd</option>
                </select>
              </div>
            ) : (
              <div></div>
            )}
  
                    </div>
                </center>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={18}
                    
                    options={{styles:mapStyles, fullscreenControl: false }}
                >
                    {currentLocation && (
                        <Marker
                            title={"user"}
                            position={currentLocation}
                        />
                    )}
                    <Marker title={"Building 21"} position={{ lat: -25.876451, lng: 29.235634 }} />
                    <Marker title={"Building 18"} position={{ lat: -25.876654, lng: 29.235526 }} />
                    <Marker title={"Building 21"} position={{ lat: -25.876915, lng: 29.235671 }} />
                    <Marker title={"Building 18"} position={{ lat: -25.876659, lng: 29.234641 }} />
                    <Marker title={"Building 2"} position={{ lat: -25.878251, lng: 29.234954 }} />
                    <Marker title={"Building 14"} position={{ lat: -25.877694, lng: 29.235076 }} />
                    <Marker title={"Building 3"} position={{ lat: -25.878892, lng: 29.234999 }} />
                    <Marker title={"Building 33"} position={{ lat: -25.877894, lng: 29.235085 }} />
                    <Marker title={"Building 123"} position={{ lat: -25.878667, lng: 29.235064 }} />
                    <Marker title={"Building 78"} position={{ lat: -25.878351, lng: 29.235357 }} />
                    <Marker title={"Building 95"} position={{ lat: -25.878850, lng: 29.235648 }} />
                    <Marker title={"Building 31"} position={{ lat: -25.877514, lng: 29.235774 }} />
                    <Marker title={"Cafeteria"} position={{ lat: -25.877939, lng: 29.232979 }} />
                    <Marker title={"WorkShop"} position={{ lat: -25.876486, lng: 29.236750 }} />
                    {directions && (
                        <DirectionsRenderer
                            directions={directions}
                        />
                    )}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default Oop;
