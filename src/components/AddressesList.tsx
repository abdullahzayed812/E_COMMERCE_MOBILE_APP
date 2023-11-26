import React, { Dispatch, SetStateAction } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14 } from "../configs/fonts";
import { BORDER_RADIUS, SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { FormInputs } from "./AddressFrom";

interface Props {
  addresses: FormInputs[];
  setSelectedAddress: Dispatch<
    SetStateAction<{ [index: string]: string | number }>
  >;
  selectedAddress: { [index: string]: string | number };
}

export const AddressesList: React.FC<Props> = ({
  addresses,
  setSelectedAddress,
  selectedAddress,
}) => {
  const handlePress = (address: { [index: string]: string }) => {
    setSelectedAddress(address);
  };

  const content = addresses.map(
    ({ id, name, phone, address_1, address_2, city, zip, country }, index) => {
      const borderColor =
        city === selectedAddress.city ? COLORS.mainColor : "transparent";

      return (
        <TouchableOpacity
          key={index}
          style={[styles.address, { borderColor }]}
          onPress={() =>
            handlePress({
              id,
              name,
              phone,
              address_1,
              address_2,
              city,
              zip,
              country,
            })
          }
        >
          <Text style={styles.text}>
            {name}, tel {phone}, {address_1}, {address_2}, {city}-{zip},{" "}
            {country}
          </Text>
        </TouchableOpacity>
      );
    },
  );

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING / 2,
  },
  address: {
    width: "90%",
    alignSelf: "center",
    borderRadius: BORDER_RADIUS,
    marginBottom: SPACING_VERTICAL / 2,
    borderWidth: 1,
    elevation: 10,
    backgroundColor: COLORS.white,
  },
  text: {
    ...TEXT_14,
    fontWeight: "bold",
    padding: SPACING,
  },
});
