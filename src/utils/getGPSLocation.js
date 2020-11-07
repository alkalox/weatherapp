import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const getGPSLocation = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    Geolocation.getCurrentPosition(position => onSuccess(position))

  } else {
    console.log("Location Permission denied");
  }

  let location = {}

  const onSuccess = (pos) => {
    console.log(pos)
    location.some = pos;
  }

  console.log("location", location)

}