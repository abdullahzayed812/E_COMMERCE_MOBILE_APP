import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text } from "react-native";
import { getData, postData } from "../configs/apis";
import { TEXT_16 } from "../configs/fonts";
import { validEmailPattern } from "../constants/RegularExpressions";
import { SPACING_VERTICAL } from "../constants/spacing";
import {
  ADD_ADDRESS_ENDPOINT_URL,
  USER_ADDRESSES_ENDPOINT_URL,
} from "../constants/urls";
import { isInputsFilled, isValidInputValue, updateError } from "../utils";
import { AddressesList } from "./AddressesList";
import { Button } from "./Button";
import { FormContainer } from "./FormContainer";
import { FormInput } from "./FromInput";
import { Loading } from "./Loading";

export interface FormInputs {
  [index: string]: string;
}

interface Props {
  setSelectedAddress: Dispatch<
    SetStateAction<{ [index: string]: string | number }>
  >;
  selectedAddress: { [index: string]: string | number };
}

export const AddressForm: React.FC<Props> = ({
  setSelectedAddress,
  selectedAddress,
}) => {
  const [formInputs, setFormInputs] = React.useState<FormInputs>({
    email: "",
    name: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    zipCode: "",
    state: "",
    deliveryInstructions: "",
  });
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [allUserAddresses, setAllUserAddresses] = React.useState<FormInputs[]>(
    [],
  );
  const [reload, setReload] = React.useState<boolean>(false);

  const {
    email,
    name,
    phone,
    address,
    address2,
    city,
    zipCode,
    state,
    deliveryInstructions,
  } = formInputs;

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getData(USER_ADDRESSES_ENDPOINT_URL, undefined, {
          type: "asc",
          order_by: "id",
        });
        const { data } = response?.data?.data;
        setAllUserAddresses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

  const handleInputChange = (text: string, inputName: string) => {
    setFormInputs({ ...formInputs, [inputName]: text });
  };

  const handleSaveAddressPress = async () => {
    if (!isInputsFilled(formInputs))
      return updateError("Inputs must be filled!", setError);
    if (!isValidInputValue(email, validEmailPattern))
      return updateError("Invalid Email!", setError);
    try {
      setLoading(true);
      const res = await postData(ADD_ADDRESS_ENDPOINT_URL, {
        delivery_instruction: deliveryInstructions,
        address_1: address,
        address_2: address2,
        country: "EG",
        zip: zipCode,
        state: "MT",
        id: "",
        email,
        city,
        name,
        phone,
      });
      setReload(!reload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const canSaveAddress =
    Boolean(name) &&
    Boolean(email) &&
    Boolean(phone) &&
    Boolean(address) &&
    Boolean(address2) &&
    Boolean(city) &&
    Boolean(zipCode) &&
    Boolean(state) &&
    Boolean(deliveryInstructions);

  const opacity = !canSaveAddress ? 0.5 : 1;

  if (loading) return <Loading />;

  return (
    <>
      <AddressesList
        addresses={allUserAddresses}
        setSelectedAddress={setSelectedAddress}
        selectedAddress={selectedAddress}
      />
      <FormContainer containerStyle={styles.container}>
        <Text style={[TEXT_16, { color: "red", textAlign: "center" }]}>
          {error}
        </Text>
        <FormInput
          placeholder="Your Email"
          label="Email"
          value={email}
          onChangeText={(text) => handleInputChange(text, "email")}
        />
        <FormInput
          placeholder="Your Name"
          label="Name"
          value={name}
          onChangeText={(text) => handleInputChange(text, "name")}
        />
        <FormInput
          placeholder="Your Phone"
          label="Phone"
          value={phone}
          onChangeText={(text) => handleInputChange(text, "phone")}
        />
        <FormInput
          placeholder="Street address or P.O. Box"
          label="Address"
          value={address}
          onChangeText={(text) => handleInputChange(text, "address")}
        />
        <FormInput
          placeholder="Apt, suite, unit, building, floor, etc."
          value={address2}
          onChangeText={(text) => handleInputChange(text, "address2")}
        />
        <FormInput
          label="City"
          value={city}
          onChangeText={(text) => handleInputChange(text, "city")}
        />
        <FormInput
          label="Zip code"
          value={zipCode}
          onChangeText={(text) => handleInputChange(text, "zipCode")}
        />
        <FormInput
          label="State"
          value={state}
          onChangeText={(text) => handleInputChange(text, "state")}
        />
        <FormInput
          label="Delivery instructions"
          value={deliveryInstructions}
          onChangeText={(text) =>
            handleInputChange(text, "deliveryInstructions")
          }
        />
        <Button
          title="Save this address"
          onPress={handleSaveAddressPress}
          disabled={!canSaveAddress}
          containerStyle={{ ...styles.saveAddressButton, opacity }}
        />
      </FormContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: SPACING_VERTICAL,
  },
  saveAddressButton: {
    marginVertical: SPACING_VERTICAL,
    alignSelf: "center",
  },
});
