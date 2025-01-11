import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import RestaurantInfo from "../RestaurantInfo";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "700px",
};
// 預設位置 => 避免使用者不想給位置
const defaultLocation = { lat: 25.0330, lng: 121.5654 };

const Map = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(defaultLocation);

    // 取得使用者位置
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setUserLocation(userPosition);
    });
  };

  const getRestaurantData = async () => {
    const radius = 5000;
    const apiKey = import.meta.env.VITE_APP_GOOGLE_PLACE_API_KEY;

    try {
      const { data } = await axios.get('/api/places', {
        params: {
          lat: userLocation.lat,
          lng: userLocation.lng,
          radius,
          type: "restaurant",
        },
      });
      setRestaurants(data.results || []);
    } catch (error) {
      console.error("获取餐厅数据失败:", error.message);
    }
  };

  // 點擊標示事件處理
  const handleMarkerClick = (restaurant) => {
    setSelectedRestaurant({ ...restaurant, image: restaurant.photos[0].photo_reference });
  }

  useEffect(() => {
    getUserLocation(); // 獲取使用者位置
  }, []);

  useEffect(() => {
    if (userLocation.lat && userLocation.lng) {
      getRestaurantData(); // 使用者位置變化時下載餐廳數據
    }
  }, [userLocation]);

  return (
    <div className="m-3 rounded-sm overflow-hidden">
      {restaurants.length > 0 && (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={userLocation} zoom={14}>
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.vicinity}
              position={restaurant.geometry.location}
              onClick={() => handleMarkerClick(restaurant)} // 點擊標示時顯示 Modal
            />
          ))}
        </GoogleMap>
      </LoadScript>
      )}
      {/* 顯示餐廳資訊 Modal */}
      {selectedRestaurant && (
        <RestaurantInfo
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant()} // 關閉 Modal
        />
      )}
    </div>
  );
};

export default Map;