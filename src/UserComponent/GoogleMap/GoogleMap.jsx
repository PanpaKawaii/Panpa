import React, { useState, useEffect, useRef } from "react";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
import './GoogleMap.css';

{/* //AIzaSyDWoavL23BIAHGtFVLOpThoCqs5SRKr-98 */ }
{/* //AIzaSyBnNcXTo2Tjcqtqbfv0K5GhZlzc12Dc-wU */ }
export default function GoogleMap() {
    const mapRef = useRef(null);

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 21.0031, lng: 105.8412 }, // Vị trí trung tâm ban đầu
            zoom: 10,
        });

        // Thêm sự kiện nhấp chuột vào bản đồ
        map.addListener('click', (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
            // Lưu vào Signify, gọi api
        });
    }, []);

    return (
        <div>
            <div
                ref={mapRef}
                style={{ width: '1000px', height: '600px' }}
            >
            </div>
        </div>
    );
}





// const containerStyle = {
//     width: "500px",
//     height: "350px",
// };
// const center = {
//     lat: 21.0031, // Vị trí ban đầu (Hà Nội)
//     lng: 105.8412,
// };
// const API_KEY = "AIzaSyDWoavL23BIAHGtFVLOpThoCqs5SRKr-98"; // Thay bằng API key của bạn

// export default function MapWithClick() {
//     const [location, setLocation] = useState(null);

//     // Hàm xử lý khi click vào bản đồ
//     const handleMapClick = async (event) => {
//         const lat = event.latLng.lat();
//         const lng = event.latLng.lng();

//         // Gọi API để lấy thông tin địa chỉ
//         const country = await getCountryFromLatLng(lat, lng);

//         // Cập nhật state
//         setLocation({ lat, lng, country });
//     };

//     // Hàm gọi API Google Geocoding để lấy tên quốc gia
//     const getCountryFromLatLng = async (lat, lng) => {
//         try {
//             const response = await fetch(
//                 `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
//             );
//             const data = await response.json();

//             if (data.results.length > 0) {
//                 const addressComponents = data.results[0].address_components;
//                 const countryComponent = addressComponents.find((component) =>
//                     component.types.includes("country")
//                 );

//                 return countryComponent ? countryComponent.long_name : "Unknown";
//             }
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//         return "Unknown";
//     };

//     return (
//         <LoadScript googleMapsApiKey={API_KEY}>
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={center}
//                 zoom={5}
//                 onClick={handleMapClick} // Gọi khi người dùng click vào bản đồ
//             ></GoogleMap>

//             {location && (
//                 <div>
//                     <h3>Thông tin vị trí:</h3>
//                     <p>🌍 Quốc gia: {location.country}</p>
//                     <p>📍 Vĩ độ: {location.lat}</p>
//                     <p>📍 Kinh độ: {location.lng}</p>
//                 </div>
//             )}
//         </LoadScript>
//     );
// }