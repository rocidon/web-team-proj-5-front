import React, { useEffect } from 'react';

const MapApi = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=adowujqfbe&submodules=geocoder';
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    const { naver } = window;
    const mapElement = document.getElementById('map');
    const location = new naver.maps.LatLng(37.2772, 127.1341);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  };

  return <div id="map" style={{ minHeight: '400px' }} />;
};

export default MapApi;