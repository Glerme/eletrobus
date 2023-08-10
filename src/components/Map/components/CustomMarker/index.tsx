import { Text } from "native-base";
import { Callout, Marker } from "react-native-maps";

import { IMarker } from "~/interfaces/IMap";

type CustomMarkerProps = { marker: IMarker };

export const CustomMarker = ({ marker }: CustomMarkerProps) => {
  return marker.type === "point" ? (
    <Marker
      coordinate={marker.coordinate}
      // icon={<Star size={14} color="#080808" />}
    >
      <Callout tooltip style={{ backgroundColor: "green", padding: 10 }}>
        <Text>POINT</Text>
      </Callout>
    </Marker>
  ) : (
    <Marker coordinate={marker.coordinate}>
      <Callout tooltip style={{ backgroundColor: "red", padding: 10 }}>
        <Text>bus</Text>
      </Callout>
    </Marker>
  );
};
