 const checkLocationPermission = async () => {
    if ('geolocation' in navigator) {
      console.log('Available');
      getGeolocation();
    } else {
      console.log('Not Available');
    }
  };

  const getGeolocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setlongitude(position.coords.latitude);
      setlatitude(position.coords.longitude);
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });
  };